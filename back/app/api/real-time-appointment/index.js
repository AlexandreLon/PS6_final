const {Router} = require('express');
const {Appointment, RealTimeAppointment} = require('../../models');

function attachRealTimeAppointment(realTimeAppointment) {
  const realTimeApp = realTimeAppointment;
  realTimeApp.appointment = Appointment.getById(realTimeAppointment.appointment_id);
  return realTimeApp;
}

function createRealTimeAppointmentsOfDay() {
  const CURRENT_TIME = new Date();
  const DAY = CURRENT_TIME.getDate();
  const MONTH = CURRENT_TIME.getMonth();
  const YEAR = CURRENT_TIME.getFullYear();
  const END_OF_DAY = new Date(YEAR, MONTH, DAY, 23, 59, 59);
  const realTimeAppointmentsOfDay = Appointment.get().filter(e => (e.starting_date > (CURRENT_TIME.getTime() / 1000)) && (e.starting_date < END_OF_DAY));
  return realTimeAppointmentsOfDay;

}

const router = new Router();

router.get('/', (req, res) => res.status(200).json(RealTimeAppointment.get().map(realTimeAppointment => attachRealTimeAppointment(realTimeAppointment))));
router.get('/:id', (req, res) => res.status(200).json(attachRealTimeAppointment(RealTimeAppointment.getById(req.params.id))));
router.delete('/:id', (req, res) => res.status(200).json(RealTimeAppointment.delete(req.params.id)));
router.put('/:id', (req, res) => res.status(200).json(RealTimeAppointment.update(req.params.id, req.body)));
router.post('/', (req, res) => {
  try {
    const realTimeAppointment = RealTimeAppointment.create(createRealTimeAppointmentsOfDay());
    res.status(201).json(attachRealTimeAppointment(realTimeAppointment));
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});

module.exports = router;
