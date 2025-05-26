import Image from "next/image";

export default function ChangePasswordPage() {
    return (
                <form className="bg-white shadow-md rounded-xl p-6 w-full flex flex-col gap-4">
                    <h2 className="text-2xl font-semibold text-center text-gray-800">Change Password</h2>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="new-password" className="text-sm font-medium text-gray-700">
                            New Password
                        </label>
                        <input
                            id="new-password"
                            type="password"
                            placeholder="Enter new password"
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="confirm-password" className="text-sm font-medium text-gray-700">
                            Confirm New Password
                        </label>
                        <input
                            id="confirm-password"
                            type="password"
                            placeholder="Re-enter new password"
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Update Password
                    </button>
                </form>
    );
}
