const express = require('express');
const Timetable = require('../models/Timetable');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();

// ROUTE 1: Save or update timetable data: POST "/api/timetable/save". Login required.
router.post('/save', fetchuser, async (req, res) => {
    try {
        const { rows, columnHeaders } = req.body;
        const userId = req.user.id;

        // Check if the user already has a timetable saved
        let timetable = await Timetable.findOne({ user: userId });

        if (timetable) {
            // Update existing timetable
            timetable.rows = rows;
            timetable.columnHeaders = columnHeaders;
            await timetable.save();
            return res.json({ success: true, timetable });
        } else {
            // Create a new timetable
            timetable = new Timetable({
                user: userId,
                rows,
                columnHeaders
            });
            await timetable.save();
            return res.json({ success: true, timetable });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE 2: Fetch timetable data: GET "/api/timetable/fetch". Login required.
router.get('/fetch', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const timetable = await Timetable.findOne({ user: userId });

        if (!timetable) {
            return res.status(404).json({ success: false, error: "Timetable not found" });
        }

        res.json({ success: true, timetable });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
