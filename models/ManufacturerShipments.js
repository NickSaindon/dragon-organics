import mongoose from 'mongoose';
import moment from 'moment-timezone';

const dateThailand = moment.tz(Date.now(), "Asia/Bangkok");
const dateEST = moment.tz(Date.now(), "America/New_York");

const manufacturerShipmentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    shipmentItems: [
      {
        productType: { type: String, required: true },
        productDescription: { type: String, required: false },
        productWeight: { type: String, required: true },
        boxSize: { type: String, required: true },
        packagesPerBox: { type: Number, required: true },
        numberOfProductBoxes: { type: Number, required: true },
        totalBoxWeight: { type: Number, required: true },
      },
    ],
    totalNumberOfBoxes: { type: Number, required: true },
    totalShipmentWeight: { type: Number, required: true },
    isShipped: { type: Boolean, required: true, default: false },
    isRecieved: { type: Boolean, required: true, default: false },
    shippedAt: { type: Date, default: dateThailand},
    recievedAt: { type: Date, default: dateEST }
  },
  {
    timestamps: true,
  }
);

const ManufacturerShipments = mongoose.models.ManufacturerShipments || mongoose.model('ManufacturerShipments', manufacturerShipmentSchema);

export default ManufacturerShipments;