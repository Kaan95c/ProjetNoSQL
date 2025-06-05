'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AddShoe() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    price: '',
    description: '',
    category: 'Lifestyle',
    image: '',
    sizes: [{ size: 40, stock: 0 }],
    colors: [{ name: 'Noir', code: '#000000' }],
    features: [''],
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      // Validation des données
      if (!formData.name || !formData.brand || !formData.price || !formData.description || !formData.image) {
        throw new Error('Veuillez remplir tous les champs obligatoires');
      }

      if (formData.sizes.some(size => size.stock < 0)) {
        throw new Error('Le stock ne peut pas être négatif');
      }

      if (formData.colors.some(color => !color.name)) {
        throw new Error('Toutes les couleurs doivent avoir un nom');
      }

      const response = await fetch('http://localhost:3001/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de l\'ajout de la chaussure');
      }

      router.push('/catalog');
      router.refresh();
    } catch (error) {
      console.error('Erreur:', error);
      setError(error instanceof Error ? error.message : 'Une erreur est survenue lors de l\'ajout de la chaussure');
    } finally {
      setIsSubmitting(false);
    }
  };

  const addSize = () => {
    setFormData({
      ...formData,
      sizes: [...formData.sizes, { size: 40, stock: 0 }],
    });
  };

  const addColor = () => {
    setFormData({
      ...formData,
      colors: [...formData.colors, { name: '', code: '#000000' }],
    });
  };

  const addFeature = () => {
    setFormData({
      ...formData,
      features: [...formData.features, ''],
    });
  };

  const handleSizeChange = (index: number, field: 'size' | 'stock', value: string) => {
    const newSizes = [...formData.sizes];
    newSizes[index] = {
      ...newSizes[index],
      [field]: field === 'size' ? parseInt(value) || 40 : parseInt(value) || 0,
    };
    setFormData({ ...formData, sizes: newSizes });
  };

  return (
    <>
      <main className="min-h-screen bg-gray-50">
        <Navbar />
        
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Ajouter une nouvelle chaussure</h1>
          
          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Marque *
                </label>
                <input
                  type="text"
                  required
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prix (€) *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Catégorie *
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Running">Running</option>
                  <option value="Lifestyle">Lifestyle</option>
                  <option value="Sport">Sport</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL de l'image *
              </label>
              <input
                type="url"
                required
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="https://static.nike.com/a/images/..."
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Tailles et stock *
                </label>
                <button
                  type="button"
                  onClick={addSize}
                  className="text-blue-600 hover:text-blue-800"
                >
                  + Ajouter une taille
                </button>
              </div>
              <div className="space-y-4">
                {formData.sizes.map((size, index) => (
                  <div key={index} className="flex gap-4">
                    <input
                      type="number"
                      required
                      min="35"
                      max="50"
                      value={size.size}
                      onChange={(e) => handleSizeChange(index, 'size', e.target.value)}
                      className="w-24 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Taille"
                    />
                    <input
                      type="number"
                      required
                      min="0"
                      value={size.stock}
                      onChange={(e) => handleSizeChange(index, 'stock', e.target.value)}
                      className="w-24 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Stock"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Couleurs *
                </label>
                <button
                  type="button"
                  onClick={addColor}
                  className="text-blue-600 hover:text-blue-800"
                >
                  + Ajouter une couleur
                </button>
              </div>
              <div className="space-y-4">
                {formData.colors.map((color, index) => (
                  <div key={index} className="flex gap-4">
                    <input
                      type="text"
                      required
                      value={color.name}
                      onChange={(e) => {
                        const newColors = [...formData.colors];
                        newColors[index].name = e.target.value;
                        setFormData({ ...formData, colors: newColors });
                      }}
                      className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Nom de la couleur"
                    />
                    <input
                      type="color"
                      required
                      value={color.code}
                      onChange={(e) => {
                        const newColors = [...formData.colors];
                        newColors[index].code = e.target.value;
                        setFormData({ ...formData, colors: newColors });
                      }}
                      className="w-12 h-10 border rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Caractéristiques
                </label>
                <button
                  type="button"
                  onClick={addFeature}
                  className="text-blue-600 hover:text-blue-800"
                >
                  + Ajouter une caractéristique
                </button>
              </div>
              <div className="space-y-4">
                {formData.features.map((feature, index) => (
                  <input
                    key={index}
                    type="text"
                    required
                    value={feature}
                    onChange={(e) => {
                      const newFeatures = [...formData.features];
                      newFeatures[index] = e.target.value;
                      setFormData({ ...formData, features: newFeatures });
                    }}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Caractéristique"
                  />
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-black text-white px-8 py-3 rounded-lg transition-colors ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'
                }`}
              >
                {isSubmitting ? 'Ajout en cours...' : 'Ajouter la chaussure'}
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
} 