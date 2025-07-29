-- Create certificates table
CREATE TABLE IF NOT EXISTS certificates (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  certificate_number TEXT UNIQUE NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id TEXT NOT NULL,
  template_id TEXT NOT NULL,
  issued_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ, -- Optional expiration date
  grade NUMERIC(5, 2), -- Grade percentage
  skills TEXT[],
  verification_hash TEXT NOT NULL,
  blockchain_tx_hash TEXT, -- For future blockchain integration
  metadata JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_certificates_user_id ON certificates(user_id);
CREATE INDEX idx_certificates_course_id ON certificates(course_id);
CREATE INDEX idx_certificates_certificate_number ON certificates(certificate_number);
CREATE INDEX idx_certificates_verification_hash ON certificates(verification_hash);

-- Create certificate_views table for tracking
CREATE TABLE IF NOT EXISTS certificate_views (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  certificate_id UUID NOT NULL REFERENCES certificates(id) ON DELETE CASCADE,
  viewed_at TIMESTAMPTZ DEFAULT NOW(),
  ip_address INET,
  user_agent TEXT,
  referrer TEXT
);

-- Create certificate_shares table
CREATE TABLE IF NOT EXISTS certificate_shares (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  certificate_id UUID NOT NULL REFERENCES certificates(id) ON DELETE CASCADE,
  platform TEXT NOT NULL, -- 'linkedin', 'twitter', 'facebook', etc.
  shared_at TIMESTAMPTZ DEFAULT NOW(),
  share_url TEXT
);

-- Enable RLS
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificate_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificate_shares ENABLE ROW LEVEL SECURITY;

-- RLS Policies for certificates
CREATE POLICY "Users can view their own certificates" ON certificates
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view public certificates via verification" ON certificates
  FOR SELECT USING (true); -- Allow public verification

CREATE POLICY "Admins can view all certificates" ON certificates
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.role = 'admin'
    )
  );

CREATE POLICY "System can insert certificates" ON certificates
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for certificate_views
CREATE POLICY "Anyone can create certificate views" ON certificate_views
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view certificate analytics" ON certificate_views
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.role = 'admin'
    )
  );

-- RLS Policies for certificate_shares
CREATE POLICY "Users can track their own certificate shares" ON certificate_shares
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM certificates
      WHERE certificates.id = certificate_id
      AND certificates.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view their own certificate shares" ON certificate_shares
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM certificates
      WHERE certificates.id = certificate_id
      AND certificates.user_id = auth.uid()
    )
  );

-- Function to get certificate with related data
CREATE OR REPLACE FUNCTION get_certificate_details(cert_number TEXT)
RETURNS TABLE (
  certificate JSONB,
  user_info JSONB,
  course_info JSONB,
  view_count BIGINT,
  share_count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    to_jsonb(c.*) as certificate,
    to_jsonb(u.*) - 'encrypted_password' as user_info,
    to_jsonb(courses.*) as course_info,
    COUNT(DISTINCT cv.id) as view_count,
    COUNT(DISTINCT cs.id) as share_count
  FROM certificates c
  LEFT JOIN user_profiles u ON c.user_id = u.id
  LEFT JOIN courses ON c.course_id = courses.id::text
  LEFT JOIN certificate_views cv ON c.id = cv.certificate_id
  LEFT JOIN certificate_shares cs ON c.id = cs.certificate_id
  WHERE c.certificate_number = cert_number
  GROUP BY c.id, u.id, courses.id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to track certificate view
CREATE OR REPLACE FUNCTION track_certificate_view(
  cert_id UUID,
  ip INET DEFAULT NULL,
  agent TEXT DEFAULT NULL,
  ref TEXT DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
  INSERT INTO certificate_views (certificate_id, ip_address, user_agent, referrer)
  VALUES (cert_id, ip, agent, ref);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to track certificate share
CREATE OR REPLACE FUNCTION track_certificate_share(
  cert_id UUID,
  platform_name TEXT,
  url TEXT DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
  INSERT INTO certificate_shares (certificate_id, platform, share_url)
  VALUES (cert_id, platform_name, url);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;