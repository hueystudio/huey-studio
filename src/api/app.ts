import { request } from '@/api/client'

export type SamplePost = {
  id: number
  title: string
  body: string
  userId: number
}

/** Demo endpoint — replace with your backend route when ready. */
export function getSamplePost() {
  return request<SamplePost>('/posts/1')
}
