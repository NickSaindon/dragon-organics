import mongoose from 'mongoose';

const vendorAccountSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: String, required: true },
    percentage: { type: Number, required: true },
    isPaid: { type: Boolean, required: true, default: false },
    paidAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

const VendorAccount = mongoose.models.VendorAccount || mongoose.model('ManufacturerShipments', vendorAccountSchema);

export default VendorAccount;