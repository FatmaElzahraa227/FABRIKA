const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
  {
    vehicle_vin: { type: String, required: true, unique: true },
    vehicle_make: { type: String, required: true },
    vehicle_model: { type: String, required: true },
    model_year: { type: String, required: false },
    displacement: { type: String },
    color: { type: String },
    mileage_years_x: [Number],
    mileage_miles_y: [Number],
    extra_features: { type: String, required: false },
    owner_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      // required: true,
    },
    insured_by: { type: mongoose.Schema.Types.ObjectId, ref: "insurance" },
    is_stolen: { type: Boolean, default: false },
    is_salvaged: { type: Boolean, default: false },
    is_insured: { type: Boolean, default: false },
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: "event" }],
    pic: { type: String },
    has_mileage: { type: Boolean },
    has_accidents: { type: Boolean },
    has_sales_history: { type: Boolean },
    has_service_history: { type: Boolean },
    has_theft_history: { type: Boolean },
    has_financial_history: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

const vehicleModel = mongoose.model("vehicle", vehicleSchema);

module.exports = vehicleModel;
