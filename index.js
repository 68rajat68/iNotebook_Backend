const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')
connectToMongo();

const app = express()
const port = process.env.port || 5000 

app.use(cors())

app.use(express.json())

//Available Routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

const timetableRoutes = require('./routes/timetable');
app.use('/api/timetable', timetableRoutes);

app.get('/', (req, res) => {
  res.send('Hello Rajat!')
})

app.listen(port, () => {
  console.log(`iNoteBook Backend listening on port ${port}`)
})