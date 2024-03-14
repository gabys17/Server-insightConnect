const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// CREATE A SCHEMA
const patientSchema = new Schema({
  full_name: { type: String, required: true },
  date_of_birth: { type: String, required: true, default: Date.now },
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
          type: Date
        },
        consultation_info: {
          type: String
        },
        treatments_recommendations: {
          type: String
        },
      },
    },
  },
});

// CREATE A MODEL
const Patient = mongoose.model("Patient", patientSchema);

// EXPORT THE MODEL
module.exports = Patient;