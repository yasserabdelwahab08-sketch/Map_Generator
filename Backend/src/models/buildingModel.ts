import mongoose, { Schema, Model } from "mongoose";




const bookingSchema = new Schema(
  {
    MapCreator: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    showtime: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    selectedSeats: {
      type: [String],
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    bookingStatus: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled"],
      default: "Pending",
    },
  },
  { strict: false },
);

const bookingModel = mongoose.model("Bookings", bookingSchema);

export default bookingModel;
