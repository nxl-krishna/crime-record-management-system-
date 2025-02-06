import Link from "next/link";

export default function Home() {
  return (
    <>
   
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Crime Record Management</h1>
        <div className="space-x-4">
          <Link href="/signup">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              Signup
            </button>
          </Link>
          <Link href="/login">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
              Login
            </button>
          </Link>
        </div>
      </div>
    </main></>
  );
}
