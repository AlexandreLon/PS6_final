const { Router } = require('express');
const ApplicantRouter = require('./applicant');
const AppointmentRouter = require('./appointment');
const ApplicationRouter = require('./application');
const ConnectionRouter = require('./connection');
const AvailabilitiesRouter = require('./availabilities');
const RealTimeAppointmentRouter = require('./real-time-appointment');
const QueueRouter = require('./queue');

const router = new Router();
router.get('/status', (req, res) => res.status(200).json('ok'));
router.use('/applicants', ApplicantRouter);
router.use('/applications', ApplicationRouter);
router.use('/appointments', AppointmentRouter);
router.use('/connection', ConnectionRouter);
router.use('/availabilities', AvailabilitiesRouter);
router.use('/real-time-appointment', RealTimeAppointmentRouter);
router.use('/queue', QueueRouter);

module.exports = router;
