const {Router} = require('express');
const {Appointment, RealTimeAppointment} = require('../../models');

function attachRealTimeAppointment(listOfAppointment) {
  var i = 1;
  listOfAppointment.forEach(app => {
    RealTimeAppointment.create({
      id: i,
      real_timestamp: app.starting_date,
      appointment_id: app.id,
    })
    i++;
  });
  return RealTimeAppointment.get();
}

function getAppointmentsOfDay() {
  const CURRENT_TIME = new Date();
  const CURRENT_TIME_LOG = CURRENT_TIME.getTime();
  const DAY = CURRENT_TIME.getDate();
  const MONTH = CURRENT_TIME.getMonth();
  const YEAR = CURRENT_TIME.getFullYear();
  const END_OF_DAY = new Date(YEAR, MONTH, DAY, 23, 59, 59);
  const END_OF_DAY_LOG = END_OF_DAY.getTime();
  const realTimeAppointmentsOfDay = Appointment.get().filter(e => ((e.starting_date > (CURRENT_TIME.getTime() / 1000)) && (e.starting_date < (END_OF_DAY.getTime() / 1000))));
  return realTimeAppointmentsOfDay;

}

const router = new Router();

//router.get('/', (req, res) => res.status(200).json(RealTimeAppointment.get().map(realTimeAppointment => attachRealTimeAppointment(realTimeAppointment))));
router.get('/:id', (req, res) => res.status(200).json(attachRealTimeAppointment(RealTimeAppointment.getById(req.params.id))));
router.delete('/:id', (req, res) => res.status(200).json(RealTimeAppointment.delete(req.params.id)));
router.put('/:id', (req, res) => res.status(200).json(RealTimeAppointment.update(req.params.id, req.body)));
router.get('/', (req, res) => {
  try {
    const appointmentOfTheDay = getAppointmentsOfDay();
    res.status(200).json(attachRealTimeAppointment(appointmentOfTheDay));
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});

module.exports = router;
