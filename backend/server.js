const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/shoestore", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.error("MongoDB connection error:", err);
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Shoe model
const shoeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  sizes: [{
    size: { type: Number, required: true },
    stock: { type: Number, required: true }
  }],
  colors: [{
    name: { type: String, required: true },
    code: { type: String, required: true }
  }],
  features: [{ type: String }]
}, { timestamps: true });

const Shoe = mongoose.model("Shoe", shoeSchema);

// Routes

// 1. Get all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Shoe.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Erreur lors de la récupération des produits" });
  }
});

// 2. Add new product
app.post("/api/products", async (req, res) => {
  try {
    console.log("Received product data:", req.body);
    
    // Validate required fields
    const requiredFields = ['name', 'brand', 'price', 'description', 'category', 'image', 'sizes', 'colors'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({ 
        error: "Champs manquants", 
        missingFields 
      });
    }

    // Create new shoe instance
    const newShoe = new Shoe({
      name: req.body.name,
      brand: req.body.brand,
      price: parseFloat(req.body.price),
      description: req.body.description,
      category: req.body.category,
      image: req.body.image,
      sizes: req.body.sizes.map(size => ({
        size: parseInt(size.size),
        stock: parseInt(size.stock)
      })),
      colors: req.body.colors,
      features: req.body.features || []
    });

    // Save to database
    const savedShoe = await newShoe.save();
    console.log("Product saved successfully:", savedShoe);
    
    res.status(201).json(savedShoe);
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ 
      error: "Erreur lors de l'ajout du produit",
      details: error.message 
    });
  }
});

// 3. Get products by category
app.get("/api/products/category/:category", async (req, res) => {
  try {
    const products = await Shoe.find({ category: req.params.category });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération des produits par catégorie" });
  }
});

// 4. Get products by brand
app.get("/api/products/brand/:brand", async (req, res) => {
  try {
    const products = await Shoe.find({ brand: req.params.brand });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération des produits par marque" });
  }
});

// 5. Get products by price range
app.get("/api/products/price", async (req, res) => {
  try {
    const min = parseFloat(req.query.min);
    const max = parseFloat(req.query.max);
    const products = await Shoe.find({ price: { $gte: min, $lte: max } });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération des produits par prix" });
  }
});

// 6. Get products in stock
app.get("/api/products/in-stock", async (req, res) => {
  try {
    const products = await Shoe.find({ "sizes.stock": { $gt: 0 } });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération des produits en stock" });
  }
});

// 7. Get products by size
app.get("/api/products/size/:size", async (req, res) => {
  try {
    const size = parseInt(req.params.size);
    const products = await Shoe.find({ sizes: { $elemMatch: { size: size, stock: { $gt: 0 } } } });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération des produits par taille" });
  }
});

// 8. Search by keyword in description
app.get("/api/products/search", async (req, res) => {
  try {
    const keyword = req.query.q;
    const products = await Shoe.find({ description: new RegExp(keyword, "i") });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la recherche de produits" });
  }
});

// 9. Get stats: count per category
app.get("/api/stats/category-count", async (req, res) => {
  try {
    const result = await Shoe.aggregate([
      { $group: { _id: "$category", total: { $sum: 1 } } }
    ]);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération des statistiques" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
}); 