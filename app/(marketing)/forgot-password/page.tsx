import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-background-light">
      <div className="w-full max-w-[440px] bg-white p-8 sm:p-10 rounded-2xl border border-gray-200 shadow-lg">
        <h1 className="text-2xl font-medium text-gray-900 mb-2">
          Reset your password
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          Enter your email address and we&apos;ll send you a link to reset your
          password.
        </p>
        <form className="space-y-5" action="#" method="post">
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1.5"
              htmlFor="email"
            >
              Email address
            </label>
            <input
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-primary block sm:text-sm transition-all"
              id="email"
              name="email"
              placeholder="name@company.com"
              required
              type="email"
            />
          </div>
          <button
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-primary hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all"
            type="submit"
          >
            Send reset link
          </button>
        </form>
        <p className="mt-8 text-center text-sm text-gray-500">
          <Link
            href="/login"
            className="font-semibold text-primary hover:underline"
          >
            Back to sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
