import Image from "next/image";
import Link from "next/link";

export default function ForgotPasswordPage() {
    return (
                <form className="bg-white shadow-md rounded-xl p-6 w-full flex flex-col gap-4">
                    <h2 className="text-2xl font-semibold text-center text-gray-800">Elfelejtett jelszó</h2>
                    <p className="text-sm text-center text-gray-600">
                        Enter your email address and we’ll send you a link to reset your password.
                    </p>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Send Reset Link
                    </button>

                    <div className="flex justify-between text-sm text-blue-600 mt-2">
                        <Link className="hover:underline hover:underline-offset-4" href="/public/login">Vissza a főoldalra</Link>
                    </div>
                </form>
    );
}
