import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex justify-between items-center container mx-auto">
        <div className="flex items-center space-x-4">
          {/* Logo Image */}
          <Image 
            src="/DRDO.png" 
            alt="DRDO Logo" 
            width={40} 
            height={40}
          />
          <div className="text-white text-2xl">
            <a href="/">Crime And Criminal Record Manager</a>
          </div>
        </div>
        <div className="space-x-4">
        </div>
      </div>
    </nav>
  );
}
