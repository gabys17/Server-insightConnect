const mongoose = require("mongoose");
const router = require('express').Router();
const Agenda = require('../models/Agenda.model');

/* Create our GET all route */
router.get("/", async (req, res) => {
    try {
        const allAgenda = await Agenda.find()
        res.status(200).json(allAgenda);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error while creating the Agenda list" });
    }
});

/* Get by id */
router.get("/:id", async (req, res) => {
    try {
        // destructure the id via route params
        const { id } = req.params;
        // find the user via Id.
        const agenda = await Agenda.findById(id);
        res.status(200).json(agenda);
    } catch (error) {
        res.status(500).json({ message: "Error while creating the Agenda" });
    }
})

router.post("/", async (req, res) => {
    const { title, description, participants, end_time, start_time, owner } = req.body;

    // Validate participants and owner
    if (!Array.isArray(participants) || participants.some(id => !mongoose.Types.ObjectId.isValid(id)) || !mongoose.Types.ObjectId.isValid(owner)) {
        return res.status(400).json({ message: "Invalid participants array or owner ID" });
    }

    try {
        const newAgenda = await Agenda.create({ title, description, participants, end_time, start_time, owner });
        res.status(200).json(newAgenda);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error while creating a new Agenda" });
    }
})

/* Update */
router.put("/:id", async (req, res) => {
    try {
        /* Destructure the id via router params */
        const { id } = req.params;
        const { title, description, participants, end_time, start_time } = req.body

        if (!title) {
            return res.status(400).json({ message: "Please fill all mandatory fields!" })
        }
        /* Find the user via the id and send it back to the client */
        const updateAgenda = await Agenda.findByIdAndUpdate(id, {
            title, description, participants, end_time, start_time
        }, { new: true });
        res.status(200).json(updateAgenda);
    } catch (error) {
        res.status(500).json({ message: "Error while creating the Agenda" });
    }
})

/* Delete */
router.delete("/:id", async (req, res) => {
    try {
        /* Destructure the id via route params */
        const { id } = req.params;
        /* Find the user via the id and send it back to the client */
        await Agenda.findByIdAndDelete(id);
        res.status(200).json("Agenda was deleted");
    } catch (error) {
        res.status(500).json({ message: "Error while deleting the Agenda" });
    }
})

module.exports = router;