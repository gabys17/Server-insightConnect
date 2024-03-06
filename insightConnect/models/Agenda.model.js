const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// CREATE A SCHEMA
const agendaSchema = new Schema({
  title: { type: String, required: [true, "Title is required."] },
  description: { type: String },
  owner: { type: Schema.Types.ObjectId, ref: "userSchema", required: [true, "Owner is required."] },
  participants: [{ type: Schema.Types.ObjectId, ref: "patientSchema" }],
  when: {
    type: Object,

    properties: {
      end_time: {
        type: Date
      },
      object: {
        type: String
      },
      start_time: {
        type: Date
      },
      full_day: {
        type: Date
      },
    },
  },
});

// CREATE A MODEL
const Agenda = mongoose.model("Agenda", agendaSchema);

// EXPORT THE MODEL
module.exports = Agenda;
