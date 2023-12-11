import  mongoose from 'mongoose';

const discountSchema = new mongoose.Schema(
    {
        campaignName: { type: String, required: true },
        discountReason: { type: String, required: true },
        discountCode: { type: String, required: true, unique: true },
        discountAmount: { type: Number, required: true },
        numOfDiscounts: { type: Number, required: true },
        expires: { type: Date, required: false },
        isValid: { type: Boolean, required: true, default: false },
    }, 
    {
        timestamps: true
    }
);

const Discounts = mongoose.models.Discounts || mongoose.model('Discounts', discountSchema);

export default Discounts;