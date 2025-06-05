import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  const featuredProducts = [
    {
      id: 1,
      name: "Nike Air Max 270",
      price: 159.99,
      image: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/skwgyqrbfzhu6uyeh0gg/air-max-270-shoes-KkLcGR.png",
      category: "Running"
    },
    {
      id: 2,
      name: "Adidas Ultraboost 22",
      price: 189.99,
      image: "https://assets.adidas.com/images/w_600,f_auto,q_auto/2c1a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0/ultraboost-22-shoes.jpg",
      category: "Running"
    },
    {
      id: 3,
      name: "Nike Dunk Low",
      price: 109.99,
      image: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/4f37fca8-6bce-43e7-ad07-f57ae3c13142/dunk-low-shoes-86f1ZW.png",
      category: "Lifestyle"
    },
    {
      id: 4,
      name: "Adidas Forum Low",
      price: 99.99,
      image: "https://assets.adidas.com/images/w_600,f_auto,q_auto/2c1a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0/forum-low-shoes.jpg",
      category: "Lifestyle"
    }
  ];

  return (
    <>
      <main className="min-h-screen">
        <Navbar />
        
        {/* Hero Section */}
        <section className="relative h-[600px] flex items-center justify-center bg-[url('https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_1824,c_limit/4f37fca8-6bce-43e7-ad07-f57ae3c13142/nike-just-do-it.jpg')] bg-cover bg-center">
          <div className="absolute inset-0 bg-black/50 z-10" />
          <div className="relative z-20 text-center text-white px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Découvrez Notre Collection
            </h1>
            <p className="text-xl mb-8">
              Les meilleures chaussures pour votre style
            </p>
            <Link 
              href="/catalog"
              className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Voir le catalogue
            </Link>
          </div>
        </section>

        {/* Featured Products */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Produits en Vedette
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group">
                <div className="relative h-64 mb-4 overflow-hidden rounded-lg">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-2">{product.category}</p>
                <p className="text-xl font-bold">{product.price} €</p>
                <button className="w-full mt-4 bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors">
                  Ajouter au panier
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Categories Section */}
        <section className="bg-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Nos Catégories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {['Running', 'Lifestyle', 'Sport'].map((category) => (
                <div key={category} className="bg-white p-8 rounded-lg shadow-md text-center">
                  <h3 className="text-xl font-semibold mb-4">{category}</h3>
                  <Link 
                    href={`/categories/${category.toLowerCase()}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Découvrir →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
