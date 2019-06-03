const { Router } = require('express');
const { Availabilities, Hour, Appointment } = require('../../models');

const router = new Router();

/**
 *
 * @param availability
 */
function attachHour(availability) {
  const av = {};
  const days = Object.keys(availability);
  days.forEach((e) => {
    if (availability[e] instanceof Array) {
      av[e] = [];
      availability[e].forEach((hourId) => {
        av[e].push(Hour.getById(hourId));
      });
    }
  });
  return av;
}

/**
 *
 * @param hour
 * @returns {number}
 */
function hourToId(hour) {
  let id = -1;
  Hour.get().forEach((h) => {
    if (h.hour == hour.hour && h.minute == hour.minute) {
      id = h.id;
    }
  });
  return id;
}

/**
 *
 * @param hours
 * @returns {*}
 */
function hoursToIds(hours) {
  return hours.map(hourToId).filter(e => e >= 0);
}

/**
 *
 * @param b
 */
function matchBody(b) {
  const body = {};
  Object.keys(Availabilities.get()[0]).forEach((day) => {
    if (day == 'id') return;
    body[day] = hoursToIds(b[day]);
  });
  return body;
}

/**
 *
 * @param timestamp
 * @returns {*}
 */
function getAvailabilitiesOfDay(timestamp) {
  // Get the date id
  let dayId = new Date(timestamp * 1000).getDay();
  if (dayId === 0 || dayId === 6) {
    return [];
  }
  dayId -= 1;
  // Get availabilities of the current date
  const allAvailabilities = Availabilities.get()[0];
  const dayAvailabilities = allAvailabilities[Object.keys(allAvailabilities)[dayId]];

  // Create a table : [id,id,id...] corresponding to the appointments of the current day
  const appointmentsOfDayInHours = Appointment.get().filter(
    appointment => appointment.starting_date > timestamp && appointment.starting_date < (parseInt(timestamp) + 3600 * 24),

  ).map((a) => {
    const date = new Date(a.starting_date * 1000);
    const hour = date.getHours() + date.getTimezoneOffset() / 60;
    const minute = new Date(a.starting_date * 1000).getMinutes();
    return hourToId({ hour, minute });
  });


  // remove appointments already busy
  return dayAvailabilities.filter((a) => {
    for (let i = 0; i < appointmentsOfDayInHours.length; i++) {
      if (a == appointmentsOfDayInHours[i]) {
        console.log(appointmentsOfDayInHours[i]);
        return false;
      }
    }
    return true;
  }).map(a => Hour.getById(a));
}

router.get('/', (req, res) => res.status(200).json(Availabilities.get().map(e => attachHour(e))));
router.get('/:timestamp', (req, res) => {
	if(/[0-9]+/.test(req.params.timestamp))
		res.status(200).json(getAvailabilitiesOfDay(req.params.timestamp))
	else
		res.status(400).json("Bad request")
});
router.put('/', (req, res) => 
{
	try {
		res.status(200).json(Availabilities.update(Availabilities.get()[0].id, matchBody(req.body)))
	}
	catch(err) {
		if (err.name === 'ValidationError') {
			res.status(400).json(err.extra);
		} else {
			res.status(500).json(err);
		}
	}
});
router.post('/', (req, res) => {
  try {
    const availabilities = Availabilities.create(req.body);
    res.status(201).json(availabilities);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});

module.exports = router;

// 1 ou 2 scénarios via démo
// Si une partie du scénar est tricky niveau code, on montre le code
// Qu'est ce qui est ajoutable et ajoute de la valeur
