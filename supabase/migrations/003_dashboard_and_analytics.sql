-- Dashboard and Analytics Schema for AI Training Platform

-- Learning phases enum
CREATE TYPE learning_phase AS ENUM ('fundamentals', 'ethics', 'implementation', 'advanced');

-- Course progress tracking
CREATE TABLE course_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  phase learning_phase NOT NULL,
  progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  started_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP WITH TIME ZONE,
  last_accessed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  time_spent_minutes INTEGER DEFAULT 0,
  UNIQUE(user_id, course_id)
);

-- Team analytics
CREATE TABLE team_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  active_learners INTEGER DEFAULT 0,
  avg_completion_time_weeks DECIMAL(4,2),
  certificates_earned INTEGER DEFAULT 0,
  phase_completion JSONB DEFAULT '{}',
  department_distribution JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(team_id, date)
);

-- User achievements
CREATE TABLE user_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_type VARCHAR(50) NOT NULL, -- 'certificate', 'milestone', 'streak', etc.
  achievement_data JSONB NOT NULL,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_user_achievements_user_id (user_id),
  INDEX idx_user_achievements_type (achievement_type)
);

-- Activity feed
CREATE TABLE activity_feed (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  team_id UUID,
  activity_type VARCHAR(50) NOT NULL, -- 'course_completed', 'comment', 'team_joined', etc.
  title TEXT NOT NULL,
  description TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_activity_feed_user_id (user_id),
  INDEX idx_activity_feed_team_id (team_id),
  INDEX idx_activity_feed_created_at (created_at DESC)
);

-- Upcoming deadlines
CREATE TABLE deadlines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  team_id UUID,
  title TEXT NOT NULL,
  description TEXT,
  deadline_type VARCHAR(50) NOT NULL, -- 'assessment', 'workshop', 'deliverable', 'review'
  priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  due_date TIMESTAMP WITH TIME ZONE NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_deadlines_user_id (user_id),
  INDEX idx_deadlines_due_date (due_date)
);

-- Create indexes for performance
CREATE INDEX idx_course_progress_user_id ON course_progress(user_id);
CREATE INDEX idx_course_progress_course_id ON course_progress(course_id);
CREATE INDEX idx_course_progress_phase ON course_progress(phase);

-- RLS Policies
ALTER TABLE course_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_feed ENABLE ROW LEVEL SECURITY;
ALTER TABLE deadlines ENABLE ROW LEVEL SECURITY;

-- Users can read their own progress
CREATE POLICY "Users can read own progress" ON course_progress
  FOR SELECT USING (auth.uid() = user_id);

-- Users can update their own progress
CREATE POLICY "Users can update own progress" ON course_progress
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can read their team's analytics
CREATE POLICY "Users can read team analytics" ON team_analytics
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.metadata->>'team_id' = team_analytics.team_id::text
    )
  );

-- Users can read their own achievements
CREATE POLICY "Users can read own achievements" ON user_achievements
  FOR SELECT USING (auth.uid() = user_id);

-- Users can read activity feed
CREATE POLICY "Users can read activity feed" ON activity_feed
  FOR SELECT USING (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM user_profiles up1, user_profiles up2
      WHERE up1.id = auth.uid()
      AND up2.id = activity_feed.user_id
      AND up1.metadata->>'team_id' = up2.metadata->>'team_id'
    )
  );

-- Users can read their own deadlines
CREATE POLICY "Users can read own deadlines" ON deadlines
  FOR SELECT USING (auth.uid() = user_id);

-- Dashboard query function
CREATE OR REPLACE FUNCTION get_dashboard_overview(p_user_id UUID)
RETURNS TABLE (
  overall_progress INTEGER,
  progress_change INTEGER,
  active_team_members INTEGER,
  team_member_change INTEGER,
  avg_completion_weeks DECIMAL(4,2),
  completion_change DECIMAL(4,2),
  certificates_earned INTEGER,
  certificates_change INTEGER,
  phase_progress JSONB,
  top_performers JSONB,
  recent_activities JSONB,
  upcoming_deadlines JSONB
) AS $$
BEGIN
  RETURN QUERY
  WITH user_stats AS (
    SELECT 
      COALESCE(AVG(progress_percentage)::INTEGER, 0) as overall_progress,
      COUNT(DISTINCT CASE WHEN completed_at IS NOT NULL THEN course_id END) as certificates_earned
    FROM course_progress
    WHERE user_id = p_user_id
  ),
  team_stats AS (
    SELECT 
      COUNT(DISTINCT up.id) as active_members
    FROM user_profiles up
    WHERE up.metadata->>'team_id' = (
      SELECT metadata->>'team_id' 
      FROM user_profiles 
      WHERE id = p_user_id
    )
    AND EXISTS (
      SELECT 1 FROM course_progress cp 
      WHERE cp.user_id = up.id 
      AND cp.last_accessed_at > CURRENT_DATE - INTERVAL '30 days'
    )
  ),
  phase_stats AS (
    SELECT 
      jsonb_build_object(
        'fundamentals', MAX(CASE WHEN phase = 'fundamentals' THEN progress_percentage ELSE 0 END),
        'ethics', MAX(CASE WHEN phase = 'ethics' THEN progress_percentage ELSE 0 END),
        'implementation', MAX(CASE WHEN phase = 'implementation' THEN progress_percentage ELSE 0 END)
      ) as phase_progress
    FROM course_progress
    WHERE user_id = p_user_id
  ),
  top_performers_data AS (
    SELECT 
      jsonb_agg(
        jsonb_build_object(
          'id', up.id,
          'name', up.full_name,
          'avatar_url', up.avatar_url,
          'role', up.metadata->>'title',
          'progress', AVG(cp.progress_percentage)::INTEGER,
          'modules_completed', COUNT(DISTINCT CASE WHEN cp.completed_at IS NOT NULL THEN cp.course_id END)
        ) ORDER BY AVG(cp.progress_percentage) DESC
      ) as top_performers
    FROM user_profiles up
    JOIN course_progress cp ON cp.user_id = up.id
    WHERE up.metadata->>'team_id' = (
      SELECT metadata->>'team_id' 
      FROM user_profiles 
      WHERE id = p_user_id
    )
    GROUP BY up.id, up.full_name, up.avatar_url, up.metadata
    LIMIT 3
  ),
  recent_activities_data AS (
    SELECT 
      jsonb_agg(
        jsonb_build_object(
          'id', af.id,
          'type', af.activity_type,
          'title', af.title,
          'description', af.description,
          'metadata', af.metadata,
          'created_at', af.created_at
        ) ORDER BY af.created_at DESC
      ) as recent_activities
    FROM activity_feed af
    WHERE af.user_id = p_user_id 
    OR af.team_id::text = (
      SELECT metadata->>'team_id' 
      FROM user_profiles 
      WHERE id = p_user_id
    )
    LIMIT 5
  ),
  upcoming_deadlines_data AS (
    SELECT 
      jsonb_agg(
        jsonb_build_object(
          'id', d.id,
          'title', d.title,
          'description', d.description,
          'type', d.deadline_type,
          'priority', d.priority,
          'due_date', d.due_date
        ) ORDER BY d.due_date ASC
      ) as upcoming_deadlines
    FROM deadlines d
    WHERE d.user_id = p_user_id
    AND d.completed = false
    AND d.due_date > CURRENT_TIMESTAMP
    LIMIT 4
  )
  SELECT 
    us.overall_progress,
    12 as progress_change, -- Mock data for now
    ts.active_members,
    3 as team_member_change, -- Mock data for now
    5.2 as avg_completion_weeks, -- Mock data for now
    -0.8 as completion_change, -- Mock data for now
    us.certificates_earned,
    6 as certificates_change, -- Mock data for now
    ps.phase_progress,
    tp.top_performers,
    ra.recent_activities,
    ud.upcoming_deadlines
  FROM user_stats us
  CROSS JOIN team_stats ts
  CROSS JOIN phase_stats ps
  CROSS JOIN top_performers_data tp
  CROSS JOIN recent_activities_data ra
  CROSS JOIN upcoming_deadlines_data ud;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Sample data for testing
-- INSERT INTO course_progress (user_id, course_id, phase, progress_percentage, time_spent_minutes)
-- VALUES 
--   ('user-id-1', 'course-id-1', 'fundamentals', 100, 2700),
--   ('user-id-1', 'course-id-2', 'ethics', 85, 3600),
--   ('user-id-1', 'course-id-3', 'implementation', 35, 1800);

-- INSERT INTO activity_feed (user_id, activity_type, title, description)
-- VALUES 
--   ('user-id-1', 'course_completed', 'Completed ML Fundamentals', 'Earned certificate with 95% score'),
--   ('user-id-1', 'comment', 'Sarah commented on your prompt', 'Customer service automation template'),
--   ('user-id-1', 'team_joined', 'New team member joined', 'Erik Lindqvist joined your organization');

-- INSERT INTO deadlines (user_id, title, description, deadline_type, priority, due_date)
-- VALUES 
--   ('user-id-1', 'Ethics Assessment', 'Complete ethical framework evaluation', 'assessment', 'high', CURRENT_TIMESTAMP + INTERVAL '1 day'),
--   ('user-id-1', 'Team Workshop', 'AI Implementation Planning session', 'workshop', 'medium', CURRENT_TIMESTAMP + INTERVAL '15 days');