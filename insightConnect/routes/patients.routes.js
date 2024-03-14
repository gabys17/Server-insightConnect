const router = require('express').Router();
const Patient = require('../models/Patient.model');

/* Create our GET all route */
router.get("/", async (req, res)=>{
    try{
        const allPatients = await Patient.find()
        res.status(200).json(allPatients);
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: "Error while creating the Patients list"});
    }
}); 

/* Get by id */
router.get("/:id", async (req, res) => {
    try {
        // destructure the id via route params
    const {id} = req.params;
        // find the user via Id.
    const patient = await Patient.findById(id);
    res.status(200).json(patient);
    }
    catch (error){
        res.status(500).json({message: "Error while creating the Patient"});
    }
})


/* Create */
router.post("/", async (req, res) => {
    const {full_name, date_of_birth, age, insurance_number, national_id_number, allergies, pathology_history, medication_adherence, consultation, treatments_recommendations, possible_diagnose, past_consultations} = req.body;

    try{
    const newPatient = await Patient.create({full_name, date_of_birth, age, insurance_number, national_id_number, allergies, pathology_history, medication_adherence, consultation, treatments_recommendations, possible_diagnose, past_consultations});

    res.status(200).json(newPatient);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({message: "Error while creating a new Patient"});
    }
})

/* Update */
router.put("/:id", async (req, res) => {
    try {
      /* Destructure the id via router params */
      const { id } = req.params;
      const {
        full_name, date_of_birth, age, insurance_number, national_id_number, allergies, pathology_history, medication_adherence, consultation, treatments_recommendations, possible_diagnose, past_consultations} = req.body

        if(!full_name|| !date_of_birth || !insurance_number || !national_id_number){
            return res.status(400).json({message: "Please fill all mandatory fields!"})
          }
      /* Find the user via the id and send it back to the client */
      const updatePatient = await Patient.findByIdAndUpdate(id, {
        full_name, date_of_birth, age, insurance_number, national_id_number, allergies, pathology_history, medication_adherence, consultation, treatments_recommendations, possible_diagnose, past_consultations
      }, { new: true });
      res.status(200).json(updatePatient);
    } catch (error) {
        res.status(500).json({message: "Error while creating the Patient"});
    }
  })


  /* Delete */
router.delete("/:id", async (req, res) => {
    try {
      /* Destructure the id via route params */
      const { id } = req.params;
      /* Find the user via the id and send it back to the client */
      await Patient.findByIdAndDelete(id);
      res.status(200).json("Patient was deleted");
    } catch (error) {
        res.status(500).json({message: "Error while deleting the Patient"});
    }
  })

module.exports = router;