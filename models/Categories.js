import  mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        slug: { type: String, required: true, unique: true  },
        categoryImage: { type: String, required: true },
        categoryText: { type: String, required: true }
    }, 
    {
        timestamps: true
    }
);

const Categories = mongoose.models.Categories || mongoose.model('Categories', categorySchema);

export default Categories;