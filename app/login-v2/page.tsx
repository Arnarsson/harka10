import { redirect } from 'next/navigation'

export default function LoginV2Redirect() {
  redirect('/sign-in')
}