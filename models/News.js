import  mongoose from 'mongoose';

const newsSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        headerImage: {  type: String, required: true },
        tags: { type: Array, required: true},
        description: { type: String, required: true },
        author: { type: String, required: true },
        article: { type: String, required: true },
        published: { type: Boolean, required: true, default: false },
        slug: { type: String, required: true, unique: true  },
    }, 
    {
        timestamps: true
    }
);

const News = mongoose.models.News || mongoose.model('News', newsSchema);

export default News;