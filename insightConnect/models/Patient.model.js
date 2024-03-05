const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// CREATE A SCHEMA
const patientSchema = new Schema({
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
          required: true
        },
        consultation_info: {
          type: String,
          required: true
        },
        treatments_recommendations: {
          type: String,
          required: true
        },
      },
    },
  },
});

// CREATE A MODEL
const Patient = mongoose.model("Patient", patientSchema);

// EXPORT THE MODEL
module.exports = Patient;
