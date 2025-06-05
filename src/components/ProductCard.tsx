'use client';
import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  brand?: string;
}

export default function ProductCard({ id, name, price, image, category, brand }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-64">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        {brand && (
          <span className="text-sm text-gray-500 mb-1 block">{brand}</span>
        )}
        <h3 className="text-lg font-semibold mb-2">{name}</h3>
        <p className="text-gray-600 mb-2">{category}</p>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">{price.toFixed(2)}€</span>
          <div className="space-x-2">
            <Link
              href={`/catalog/${id}`}
              className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Voir
            </Link>
            <button
              className="bg-gray-100 text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              onClick={() => {
                // TODO: Implémenter l'ajout au panier
                console.log('Ajouter au panier:', id);
              }}
            >
              Panier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 