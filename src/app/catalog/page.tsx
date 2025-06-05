'use client';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';

interface Shoe {
  _id: string;
  name: string;
  brand: string;
  price: number;
  description: string;
  category: string;
  image: string;
  sizes: { size: number; stock: number }[];
  colors: { name: string; code: string }[];
  features: string[];
}

export default function Catalog() {
  const [shoes, setShoes] = useState<Shoe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShoes = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/products');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des chaussures');
        }
        const data = await response.json();
        setShoes(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      } finally {
        setLoading(false);
      }
    };

    fetchShoes();
  }, []);

  return (
    <>
      <main className="min-h-screen bg-gray-50">
        <Navbar />
        
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Catalogue</h1>
            <Link 
              href="/catalog/add"
              className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Ajouter un produit
            </Link>
          </div>
          
          {loading && (
            <div className="text-center py-8">
              <p>Chargement des produits...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-8 text-red-600">
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {shoes.map((shoe) => (
                <ProductCard
                  key={shoe._id}
                  id={shoe._id}
                  name={shoe.name}
                  price={shoe.price}
                  image={shoe.image}
                  category={shoe.category}
                  brand={shoe.brand}
                />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
} 