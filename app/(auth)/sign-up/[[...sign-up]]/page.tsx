import { SignUp } from "@clerk/nextjs";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <>
      <h1 className="text-2xl font-bold text-white mb-2 text-center">Create your account</h1>
      <p className="text-gray-400 text-center mb-8">Join the community and start learning</p>
      
      <SignUp 
        routing="path"
        path="/sign-up"
        signInUrl="/sign-in"
        afterSignUpUrl="/dashboard"
      />
      
      <p className="text-center text-sm text-gray-400 mt-6">
        Already have an account?{" "}
        <Link href="/sign-in" className="text-purple-500 hover:text-purple-400 transition-colors font-medium">
          Sign in
        </Link>
      </p>
    </>
  );
}