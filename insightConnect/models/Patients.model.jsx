const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// CREATE A SCHEMA
const patientsSchema = new Schema({
  id: { type: String, required: true, unique: true },
  full_name: { type: String, required: true },
  date_of_birth: { type: Date, required: true, default: Date.now },
  age: { type: Number },
  insurance_number: { type: Number, required: true },
  national_id_number: { type: String, required: true },
  allergies: { type: String },
  pathology_history: { type: String },
  medication_adherence: { type: String },
  consultation: { type: String },
  treatments_recommendations: { type: String },
  possible_diagnose: { type: String },
  past_consultations: {
    type: Array,
    items: {
      type: Object,
      properties: {
        date: {
          type: Date,
        },
        consultation_info: {
          type: String,
        },
        treatments_recommendations: {
          type: String,
        },
      },
      required: [date, consultation_info, treatments_recommendations],
    },
  },
});

// CREATE A MODEL
const Patients = mongoose.model("Patients", patientsSchema);

// EXPORT THE MODEL
module.exports = Patients;
