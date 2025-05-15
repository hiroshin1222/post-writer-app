import UserAuthForm from "@/components/user-auth-form";
import Link from "next/link";

export default function Register() {
  return (
    <div className="container mx-auto px-4 py-8">
        <Link href="/login" className="mb-4 inline-block text-sm text-muted-foreground hover:text-primary">
            Already have an account? Sign in
        </Link>
    <div className="flex flex-col items-center justify-center h-screen px-4">
      <h1 className="text-4xl font-bold mb-2">アカウントの作成</h1>
      <p className="text-gray-500 mb-8">メールアドレスを入力してアカウントを作成してください</p>
      
      <div className="w-full">
        <UserAuthForm />
      </div>

      <div className="mt-8">
        <p>
            続けてクリックすれば私たちの
          <Link href="/privacy" className="text-blue-500 hover:underline">
          プライバシーポリシー
          </Link>
          に同意したことになります。
        </p>
      </div>
    </div>
    </div>
  );
}