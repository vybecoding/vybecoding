import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function SignInPage() {
  return (
    <>
      <h1 className="text-2xl font-bold text-white mb-2 text-center">Welcome back</h1>
      <p className="text-gray-400 text-center mb-8">Sign in to your account to continue</p>
      
      <SignIn 
        routing="path"
        path="/sign-in"
        signUpUrl="/sign-up"
        afterSignInUrl="/dashboard"
      />
      
      <p className="text-center text-sm text-gray-400 mt-6">
        Don't have an account?{" "}
        <Link href="/sign-up" className="text-purple-500 hover:text-purple-400 transition-colors font-medium">
          Sign up
        </Link>
      </p>
    </>
  );
}