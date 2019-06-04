const { Router } = require('express');
const { RealTimeAppointment } = require('../../models');

const router = new Router();

// router.get('/', (req, res) => res.status(200).json(RealTimeAppointment.get().map(appointment => attachApplicant(appointment))));
router.put('/:id', (req, res) => res.status(200).json(RealTimeAppointment.update(req.params.id, req.body)));

module.exports = router;
