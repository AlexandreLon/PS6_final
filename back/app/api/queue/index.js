const {Router} = require('express');
const {
  Appointment, RealTimeAppointment, Applicant, Queue,
} = require('../../models');

let dayHasBegun = null;
let CURRENT_QUEUE = 0;

function createRealTimeAppointments(listOfAppointment, queueId) {
  let i = 1;
  if (dayHasBegun == null || (dayHasBegun.getDate() !== new Date().getDate()
	|| dayHasBegun.getMonth() !== new Date().getMonth()
	|| dayHasBegun.getFullYear() !== new Date().getFullYear())) {
	dayHasBegun = new Date();

	RealTimeAppointment.get().forEach(e => RealTimeAppointment.delete(e.id));

	listOfAppointment.forEach((app) => {
	  RealTimeAppointment.create({
		id: i,
		real_timestamp: Math.floor(Date.now()/1000) + 15*(i+1)*60,
		appointment_id: app.id,
	  });
	  i += 1;
	});
	Queue.get().forEach(q => Queue.delete(q.id));
	Queue.create({
		id: 0,
		real_time_appointments: RealTimeAppointment.get().map(e => e.id)
	})
	return Queue.getById(0)
  }
  return Queue.getById(queueId)
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

function popNextAppointmentOfDay(queueNumber) {
  const appointmentsOfDay = getAppointmentsOfDay().sort(
	(e1, e2) => e1.starting_date - e2.starting_date,
  );
  let realTimeAppointmentsOfDay = createRealTimeAppointments(appointmentsOfDay, queueNumber).real_time_appointments;
  realTimeAppointmentsOfDay = realTimeAppointmentsOfDay.sort(
	(e1, e2) => e1.real_timestamp - e2.real_timestamp,
  );
  if (realTimeAppointmentsOfDay.length > 0) {
	const poppedid = realTimeAppointmentsOfDay[0]
	const realTimeAppointments = Queue.getById(queueNumber).real_time_appointments.filter(e => e != poppedid);
	let i = 0;
	realTimeAppointments.forEach(id => {
		const r = RealTimeAppointment.getById(id);
		r.real_timestamp = Math.floor(Date.now()/1000) + 15*(i+1)*60,
		RealTimeAppointment.update(r.id, r);
		i++;
	})
	Queue.update(queueNumber, {real_time_appointments: realTimeAppointments});
	const popped = RealTimeAppointment.getById(poppedid)
	RealTimeAppointment.delete(poppedid);
	return popped;
  }
  return null;
}

function attachApplicant(realTimeAppointment) {
  if (realTimeAppointment == null) return null;
  console.log(realTimeAppointment)
  const appointment = Appointment.getById(realTimeAppointment.appointment_id);
  const applicant = Applicant.getById(appointment.applicant_id);
  realTimeAppointment.applicant = applicant;
  console.log(appointment);
  console.log(applicant);
  console.log(applicant.id);
  console.log(realTimeAppointment);
  return realTimeAppointment;
}

function split(length)
{
	console.log(length)
	var queues = Queue.get();
	const appointments = [];
	queues.forEach(q => {
		q.real_time_appointments.forEach(app => {
			appointments.push(app)
		})
	})
	queues.forEach(q => Queue.delete(q.id));
	for(let i=0; i<length; i++)
	{
		Queue.create({
			id: i,
			real_time_appointments: []
		})
	}
	queues = Queue.getAddress();
	appointments.forEach((e, i) => {
		const r = RealTimeAppointment.getById(e);
		r.real_timestamp = Math.floor(Date.now()/1000) + (15*(i+1))*60;
		RealTimeAppointment.update(r.id, r)
		queues[i%length].real_time_appointments.push(r.id);
	})
	queues.forEach(q => {
		Queue.update(q.id, q);
	})
	return queues;
}

function createNewQueue() {
  const QUEUES = Queue.get();
  let newQueue = [];
  const newQueues = [];
  for (let i = 0; i < QUEUES.length; i += 1) {
	newQueue += QUEUES[i];
  }
  newQueue.sort((e1, e2) => e1.real_timestamp - e2.real_timestamp);
  for (let i = 0; i < QUEUES.length + 1; i += 1) {
	Queue.create({
	  real_time_appointments: [],
	});
	newQueues[i].real_time_appointments = [];
  }
  for (let i = 0; i < newQueue.length; i += 1) {
	newQueues[i % newQueues.length].real_time_appointments.push(newQueue[i]);
  }
  return newQueues;
}

const router = new Router();

//What is that ?
// router.get('/', (req, res) => {
//   try {
// 	const appointmentsOfDay = getAppointmentsOfDay();
// 	res.status(200).json(createRealTimeAppointments(appointmentsOfDay));
//   } catch (err) {
// 	if (err.name === 'ValidationError') {
// 	  res.status(400).json(err.extra);
// 	} else {
// 	  res.status(500).json(err);
// 	}
//   }
// });

router.get('/next', (req, res) => {
	CURRENT_QUEUE = (CURRENT_QUEUE+1)%Queue.get().length;
	res.status(200).json(CURRENT_QUEUE);
});

router.get('/prev', (req, res) => {
	CURRENT_QUEUE = (CURRENT_QUEUE-1) < 0 ? Queue.get().length-1 : CURRENT_QUEUE-1
	res.status(200).json(CURRENT_QUEUE);
});

router.get('/pop', (req, res) => res.status(200).json(attachApplicant(popNextAppointmentOfDay(CURRENT_QUEUE))));

router.get('/', (req, res) => res.status(200).json(Queue.get()));

router.get('/:id', (req, res) => res.status(200).json(Queue.getById(req.params.id).real_time_appointments.map(r => attachApplicant(RealTimeAppointment.getById(r)))));

router.delete('/:id', (req, res) => {
	RealTimeAppointment.delete(req.params.id)
	res.status(200).json(Queue.get())
});

// router.put('/:id', (req, res) => res.status(200).json(RealTimeAppointment.update(req.params.id, req.body)));

router.post('/', (req, res) => {
	if (dayHasBegun == null || (dayHasBegun.getDate() !== new Date().getDate()
		|| dayHasBegun.getMonth() !== new Date().getMonth()
		|| dayHasBegun.getFullYear() !== new Date().getFullYear())) {
		dayHasBegun = new Date();

		RealTimeAppointment.get().forEach(e => RealTimeAppointment.delete(e.id));

		const listOfAppointment = getAppointmentsOfDay().sort(
			(e1, e2) => e1.starting_date - e2.starting_date,
		  );
			let i =0;
		listOfAppointment.forEach((app) => {
		RealTimeAppointment.create({
			id: i,
			real_timestamp: Math.floor(Date.now()/1000) + 15*(i+1)*60,
			appointment_id: app.id,
		});
		i += 1;
		});
		Queue.get().forEach(q => Queue.delete(q.id));
		Queue.create({
			id: 0,
			real_time_appointments: RealTimeAppointment.get().map(e => e.id)
		})
	}
	const length = Queue.get().length + 1;
	let queues = split(length);
	res.status(200).json(Queue.get())
})

router.delete('/', (req, res) => {
	if(Queue.get().length - 1 > 0)
	{
		const length = Queue.get().length - 1;
		let queues = split(length);
		res.status(200).json(queues[length-1]);
	}
	else
	{
		res.status(400).json("No queues");
	}
})

module.exports = router;
