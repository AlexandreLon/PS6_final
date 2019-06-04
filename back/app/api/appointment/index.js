const { Router } = require('express');
const { Appointment, Applicant } = require('../../models');

function attachApplicant(appointment) {
  const app = appointment;
  app.applicant = Applicant.getById(appointment.applicant_id);
  return app;
}

function getFirstMondayOfCurrentYear() {
  const year = new Date().getFullYear();
  let date = new Date(year, 0, 1);
  for (let i = 0; date.getDay() !== 1 && i < 14; i++, date = new Date(year, 0, i + 1)) {
  }
  return Math.trunc(date.getTime() / 1000) - date.getTimezoneOffset() * 60;
}


function getTwoWeeksListOfAwaitingAppointments() {
  const STARTING_DAY = getFirstMondayOfCurrentYear();
  console.log(STARTING_DAY);
  const WEEK_DURATION = 604800;

  const list = Appointment.get();

  const NUMBER_OF_AWAITING_LIST = [];

  let timeIndex = STARTING_DAY;

  for (let i = 0; i < 52; i++) {
    const subList = list.filter(
      a => a.starting_date > timeIndex
        && a.starting_date < (timeIndex + WEEK_DURATION)
        && !a.status,
    );
    if (subList.length > 0) {
      console.log(`liste courante: ${subList[0].status}`);
    }
    NUMBER_OF_AWAITING_LIST.push(subList.length);
    timeIndex += WEEK_DURATION;
  }
  return NUMBER_OF_AWAITING_LIST;
}


const router = new Router();
router.get('/next/:nb', (req, res) => {
  if (/[0-9]+/.test(req.params.nb)) {
    let list = Appointment.get().filter(a => a.starting_date + new Date().getTimezoneOffset() * 60 > Date.now() / 1000 && a.status);
    list.sort((a, b) => a.starting_date - b.starting_date);
    list = list.splice(0, req.params.nb);
    res.status(200).json(list.map(appointment => attachApplicant(appointment)));
  } else {
    res.status(400).json('Bad request');
  }
});
router.get('/numberAfterToday', (req, res) => res.status(200).json(Appointment.get().filter(e => e.starting_date > new Date().getTime() / 1000 && !e.status).length));
router.get('/week/:timestamp', (req, res) => {
  if (/[0-9]+/.test(req.params.timestamp)) {
    const WEEK_DURATION = 604800;
    const list = Appointment.get().filter(
      a => a.starting_date > parseInt(req.params.timestamp)
        && (a.starting_date < (parseInt(req.params.timestamp) + WEEK_DURATION * 2)),
    );
    res.status(200).json(list.map(appointment => attachApplicant(appointment)));
  } else {
    res.status(400).json('Bad request');
  }
});
router.get('/arrayAwaiting', (req, res) => res.status(200).json(getTwoWeeksListOfAwaitingAppointments()));
router.get('/', (req, res) => res.status(200).json(Appointment.get().map(appointment => attachApplicant(appointment))));
router.get('/:id', (req, res) => res.status(200).json(attachApplicant(Appointment.getById(req.params.id))));
router.delete('/:id', (req, res) => res.status(200).json(Appointment.delete(req.params.id)));
router.put('/:id', (req, res) => res.status(200).json(Appointment.update(req.params.id, req.body)));
router.post('/', (req, res) => {
  try {
    const appointment = Appointment.create(req.body);
    res.status(201).json(attachApplicant(appointment));
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});

module.exports = router;
