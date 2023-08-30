import  mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        phone: { type: String, required: false },
        companyName: { type: String, required: false },
        address: { type: String, required: false },
        city:  { type: String, required: false },
        state: { type: String, required: false },
        zipCode: { type: String, required: false },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, required: true, default: false },
        isVendor: { type: Boolean, required: true, default: false },
    }, 
    {
        timestamps: true
    }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;