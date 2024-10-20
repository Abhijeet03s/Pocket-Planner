import { SignInButton } from "./components/SignInButton"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">Welcome to PocketPlanner</h1>
      <SignInButton />
    </div>
  )
}