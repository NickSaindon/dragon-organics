import  mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        slug: { type: String, required: true, unique: true  },
        category: { type: String, required: true },
        imageOne: {  type: String, required: true },
        imageTwo: {  type: String, required: true },
        imageThree: {  type: String, required: true },
        imageFour: {  type: String, required: true },
        color: { type: String, required: false },
        ingredients: { type: String, required: false },
        usage: { type: String, required: false },
        region: { type: String, required: true },
        leafName: { type: String, required: false },
        leafType: { type: String, required: false },
        size: { type: String, required: true },
        price: { type: Number, required: true },
        rating: { type: Number, required: true, default: 0 },
        numReviews: { type: Number, required: true, default: 0 },
        countInStock: { type: Number, required: true, default: 0 },
        description: { type: String, required: true },
        featured: { type: Boolean, required: true, default: false },
        posted: { type: Boolean, required: true, default: false }
    }, 
    {
        timestamps: true
    }
);

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;