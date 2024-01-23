const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
// const Doctor = require('../../models/doctorModel');
// const Patient = require('../../models/patientModel');
const Appointment = require('../../models/appointmentModel');

dotenv.config({ path: './config.env' });
//console.log(process.env);

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'));

// const doctors = JSON.parse(
//   fs.readFileSync(`${__dirname}/doctor.json`, 'utf-8'),
// );
// const patients = JSON.parse(
//   fs.readFileSync(`${__dirname}/patient.json`, 'utf-8'),
// );
const appointments = JSON.parse(
  fs.readFileSync(`${__dirname}/appointment.json`, 'utf-8'),
);

const importData = async () => {
  try {
    //await Tour.create(tours);
    await Appointment.create(appointments, { validateBeforeSave: false });
    //await Review.create(reviews);
    console.log('Data successfully loaded');
    process.exit();
  } catch (err) {
    // console.log(err);
  }
};

const deleteData = async () => {
  try {
    await Appointment.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
