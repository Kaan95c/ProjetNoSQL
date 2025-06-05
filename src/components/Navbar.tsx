'use client';
import Link from 'next/link';
import { ShoppingCart, Search, User } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-gray-800">
              ShoeStore
            </Link>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              Accueil
            </Link>
            <Link href="/catalog" className="text-gray-600 hover:text-gray-900">
              Catalogue
            </Link>
            <Link href="/categories" className="text-gray-600 hover:text-gray-900">
              Catégories
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900">
              À propos
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-gray-900">
              <Search size={20} />
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900">
              <User size={20} />
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900 relative">
              <ShoppingCart size={20} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                0
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 