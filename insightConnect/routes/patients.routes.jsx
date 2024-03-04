const router = require('express').Router();
const Cohort = require('../models/Patients.model');

/* Create our GET all route */
router.get("/patients", async (req, res)=>{
    try{
        const allPatients = await Patients.find()
        res.status(200).json(allPatients);
    }
    catch(error){
        res.status(500).json({message: "Error while creating the Cohort"});
    }
}); 

/* Get by id */
router.get("/patients/:id", async (req, res) => {
    try {
        // destructure the id via route params
    const {id} = req.params;
        // find the user via Id.
    const singlePatients = await Patients.findById(id);
    res.status(200).json(singlePatients);
    }
    catch (error){
        res.status(500).json({message: "Error while creating the Patients"});
    }
})


/* Create */
router.post("/patients", async (req, res) => {
    const {full_name, date_of_birth, age, insurance_number, nationa_id_number, allergies, pathology_history, medication_adherence, consultation, treatments_recommendations, possible_diagnose, past_consultations} = req.body;

    try{
    const newPatient = await Patients.create({full_name, date_of_birth, age, insurance_number, nationa_id_number, allergies, pathology_history, medication_adherence, consultation, treatments_recommendations, possible_diagnose, past_consultations});

    res.status(200).json(newPatient);
    }
    catch (error) {
        res.status(500).json({message: "Error while creating the Cohort"});
    }
})

/* Update */
router.put("/patients/:id", async (req, res) => {
    try {
      /* Destructure the id via router params */
      const { id } = req.params;
      const {
        full_name, date_of_birth, age, insurance_number, national_id_number, allergies, pathology_history, medication_adherence, consultation, treatments_recommendations, possible_diagnose, past_consultations} = req.body

        if(!full_name|| !date_of_birth || !insurance_number || !national_id_number){
            return res.status(400).json({message: "Please fill all mandatory fields!"})
          }
      /* Find the user via the id and send it back to the client */
      const updatePatient = await Patients.findByIdAndUpdate(id, {
        full_name, date_of_birth, age, insurance_number, national_id_number, allergies, pathology_history, medication_adherence, consultation, treatments_recommendations, possible_diagnose, past_consultations
      }, { new: true });
      res.status(200).json(updatePatient);
    } catch (error) {
        res.status(500).json({message: "Error while creating the Cohort"});
    }
  })


  /* Delete */
router.delete("/patients/:id", async (req, res) => {
    try {
      /* Destructure the id via route params */
      const { id } = req.params;
      /* Find the user via the id and send it back to the client */
      await Patients.findByIdAndDelete(id);
      res.status(200).json("Patient was deleted");
    } catch (error) {
        res.status(500).json({message: "Error while deleting the Patient"});
    }
  })

module.exports = router;