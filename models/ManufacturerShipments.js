import mongoose from 'mongoose';

const manufacturerShipmentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    shipmentItems: [
      {
        productType: { type: String, required: true },
        productDescription: { type: String, required: false },
        productWeight: { type: String, required: true },
        boxSize: { type: String, required: true },
        packagesPerBox: { type: String, required: true },
        totalBoxWeight: { type: String, required: true },
      },
    ],
    numberOfBoxes: { type: String, required: true },
    totalShipmentWeight: { type: String, required: true },
    isShipped: { type: Boolean, required: true, default: false },
    isRecieved: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

const ManufacturerShipments = mongoose.models.ManufacturerShipments || mongoose.model('ManufacturerShipments', manufacturerShipmentSchema);

export default ManufacturerShipments;