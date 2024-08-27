const mongoose = require('mongoose');
const { Schema } = mongoose;

const TimetableSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    rows: [{
        time_slot: String,
        work_to_do: String,
        status: [Boolean]
    }],
    columnHeaders: [String],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('timetable', TimetableSchema);
