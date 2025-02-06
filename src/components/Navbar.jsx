import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex justify-between items-center container mx-auto">
        <div className="text-white text-2xl">
          <Link href="/">Brand</Link>
        </div>
        <div className="space-x-4">
          <Link href="/login">
            <a className="text-white py-2 px-4 rounded-md hover:bg-gray-700 transition">Login</a>
          </Link>
          <Link href="/signin">
            <a className="text-white py-2 px-4 rounded-md hover:bg-gray-700 transition">Sign In</a>
          </Link>
        </div>
      </div>
    </nav>
  );
}
