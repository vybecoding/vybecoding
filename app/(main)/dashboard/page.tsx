import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

export default async function DashboardPage() {
  const user = await currentUser();

  return (
    <div className="min-h-screen p-8">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <UserButton />
      </header>
      
      <main>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">
            Welcome, {user?.firstName || "User"}!
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Email: {user?.emailAddresses[0]?.emailAddress}
          </p>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            User ID: {user?.id}
          </p>
        </div>
      </main>
    </div>
  );
}