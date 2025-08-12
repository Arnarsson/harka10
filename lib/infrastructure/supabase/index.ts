import { SupabaseCourseRepositoryBrowser } from './course-repository.browser'
import { SupabaseCourseRepositoryServer } from './course-repository.server'

export const getCourseRepository = () => {
  // Prefer server repo when running on the server
  if (typeof window === 'undefined') {
    return new SupabaseCourseRepositoryServer()
  }
  return new SupabaseCourseRepositoryBrowser()
}

