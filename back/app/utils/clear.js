const {
	Application,
	Applicant,
	Appointment,
	Availabilities,
	Hour,
	Wish,
	Grade,
	Attachment,
  } = require('../models');

console.log('======== Starting clearing =========');
console.log('Removing all existing elements');
console.log('Removing Applications');

Application.get().forEach(e => Application.delete(e.id));

console.log('Removing Appointments');

Appointment.get().forEach(e => Appointment.delete(e.id));

console.log('Removing Applicants');

Applicant.get().forEach(e => Applicant.delete(e.id));

console.log('Removing availablities');
Availabilities.get().forEach((e) => {
  Availabilities.delete(e.id);
});

console.log('Removing availablity hours');
Hour.get().forEach(e => Hour.delete(e.id));

console.log('Removing wishes');
Wish.get().forEach(e => Wish.delete(e.id));

console.log('Removing grades');
Grade.get().forEach(e => Grade.delete(e.id));

console.log('Removing attachments');
Attachment.get().forEach(e => Attachment.delete(e.id));

console.log('Deletion success');