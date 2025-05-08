import UserAuthForm from "@/components/user-auth-form";
import Link from "next/link";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center h-screen px-4">
      <h1 className="text-4xl font-bold mb-2">Welcome Back</h1>
      <p className="text-gray-500 mb-8">Login to your account to continue</p>
      
      <div className="w-full">
        <UserAuthForm />
      </div>

      <div className="mt-8">
        <p>
          <Link href="/register" className="text-blue-500 hover:underline">
            Don't have an account? Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}