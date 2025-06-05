import mongoose from 'mongoose';

const ShoeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Le nom est requis'],
    trim: true,
  },
  brand: {
    type: String,
    required: [true, 'La marque est requise'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Le prix est requis'],
    min: [0, 'Le prix ne peut pas être négatif'],
  },
  description: {
    type: String,
    required: [true, 'La description est requise'],
    trim: true,
  },
  category: {
    type: String,
    required: [true, 'La catégorie est requise'],
    enum: ['Running', 'Lifestyle', 'Sport'],
  },
  image: {
    type: String,
    required: [true, "L'image est requise"],
  },
  sizes: [{
    size: Number,
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
  }],
  colors: [{
    name: String,
    code: String,
  }],
  features: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Shoe || mongoose.model('Shoe', ShoeSchema); 