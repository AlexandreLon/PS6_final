const { Router } = require('express');
const { Appointment, RealTimeAppointment, Applicant } = require('../../models');

let dayHasBegun = null;

function createRealTimeAppointments(listOfAppointment) {
  let i = 1;
  if (dayHasBegun == null || (dayHasBegun.getDate() !== new Date().getDate()
    || dayHasBegun.getMonth() !== new Date().getMonth()
    || dayHasBegun.getFullYear() !== new Date().getFullYear())) {
    dayHasBegun = new Date();

    RealTimeAppointment.get().forEach(e => RealTimeAppointment.delete(e.id));

    listOfAppointment.forEach((app) => {
      RealTimeAppointment.create({
        id: i,
        real_timestamp: app.starting_date,
        appointment_id: app.id,
      });
      i += 1;
    });
  }
  return RealTimeAppointment.get();
}

function getAppointmentsOfDay() {
  const CURRENT_TIME = new Date();
  const DAY = CURRENT_TIME.getDate();
  const MONTH = CURRENT_TIME.getMonth();
  const YEAR = CURRENT_TIME.getFullYear();
  const END_OF_DAY = new Date(YEAR, MONTH, DAY, 23, 59, 59);
  const appointmentsOfDay = Appointment.get().filter(
    e => ((e.starting_date > CURRENT_TIME.getTime() / 1000 - CURRENT_TIME.getTimezoneOffset() * 60)
      && (e.starting_date < (END_OF_DAY.getTime() / 1000))),
  );
  return appointmentsOfDay;
}

function popNextAppointmentOfDay() {
  const appointmentsOfDay = getAppointmentsOfDay().sort((e1, e2) => e1.starting_date - e2.starting_date);
  let realTimeAppointmentsOfDay = createRealTimeAppointments(appointmentsOfDay);
  realTimeAppointmentsOfDay = realTimeAppointmentsOfDay.sort((e1, e2) => e1.real_timestamp - e2.real_timestamp);
  if (realTimeAppointmentsOfDay.length > 0) {
    const popped = realTimeAppointmentsOfDay[0];
    RealTimeAppointment.delete(popped.id);
    return popped;
  }
  return null;
}

function attachApplicant(realTimeAppointment) {
  if (realTimeAppointment == null) return null;
  const appointment = Appointment.getById(realTimeAppointment.appointment_id);
  const applicant = Applicant.getById(appointment.applicant_id);
  realTimeAppointment.applicant_id = applicant.id;
  console.log(appointment);
  console.log(applicant);
  console.log(applicant.id);
  console.log(realTimeAppointment);
  return realTimeAppointment;
}

function createNewQueue(){
  // queueList = Queue.get();

}

const router = new Router();

router.get('/', (req, res) => {
  try {
    const appointmentsOfDay = getAppointmentsOfDay();
    res.status(200).json(createRealTimeAppointments(appointmentsOfDay));
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});

router.get('/pop', (req, res) => res.status(200).json(attachApplicant(popNextAppointmentOfDay())));

router.delete('/:id', (req, res) => res.status(200).json(RealTimeAppointment.delete(req.params.id)));

router.put('/:id', (req, res) => res.status(200).json(RealTimeAppointment.update(req.params.id, req.body)));

module.exports = router;