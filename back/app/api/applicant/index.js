
const { Router } = require('express');
const {
  Applicant, Application, Grade, Attachment, Wish,
} = require('../../models');
const SortAndFilter = require('./sortandfilter');

const router = new Router();

function getNumberOfApplications(applicantId) {
  const applications = Application.get().filter(e => e.applicant_id === applicantId);
  return applications.length;
}

function attachApplications(applicant) {
  const app = applicant;
  app.applications = Application.get().filter(e => e.applicant_id == app.id);


  app.applications.forEach((application) => {
    const attachments = [];
    const wishes = [];

    // Add all attachments
    application.attachments.forEach(attachment => attachments.push(Attachment.getById(attachment)));
    // Add all wishes
    application.wishes.forEach(wish => wishes.push(Wish.getById(wish)));

    // Update the application
    application.attachments = attachments;
    application.wishes = wishes;
  });
  return app;
}
function attachGrades(applicant) {
  const app = applicant;
  const tempGrades = [];
  app.grades_since_bac.forEach((grade) => {
    tempGrades.push(Grade.getById(grade));
  });
  app.grades_since_bac = tempGrades;

  return app;
}

function calculStatus(applicant) {
  const app = applicant;
  app.status = true;
  const applications = Application.get().filter(e => e.applicant_id == app.id);
  applications.forEach((e) => {
    if (!e.status) {
      app.status = false;
    }
  });
  return app;
}

function hasApplication(applicant_id) {
  const app = Application.get();
  for (let i = 0; i < app.length; i++) {
    if (app[i].applicant_id == applicant_id) return true;
  }
  return false;
}

router.get('/numberapp/:id', (req, res) => res.status(200).json(getNumberOfApplications(req.params.id)));
router.get('/page/:nb/:num', (req, res) => {
	if(/[0-9]+/.test(req.params.num) && /[0-9]+/.test(req.params.nb))
	{
		const allApplicants = Applicant.get().filter(e => hasApplication(e.id));
		const start = req.params.nb * (req.params.num - 1);
		const end = req.params.nb * req.params.num;
		res.status(200).json(allApplicants.slice(start, end).map(e => calculStatus(attachApplications(e))));
	}
	else
	{
		res.status(400).json("Bad request")
	}
});
router.get('/hasapplications/:id', (req, res) => res.status(200).json(hasApplication(req.params.id)));
router.get('/number', (req, res) => res.status(200).json({ number: Applicant.get().filter(e => hasApplication(e.id)).length }));
router.get('/', (req, res) => res.status(200).json(Applicant.get().map(e => calculStatus(e))));
router.get('/:id', (req, res) => res.status(200).json(calculStatus(attachGrades(attachApplications(Applicant.getById(req.params.id))))));
router.delete('/:id', (req, res) => res.status(200).json(Applicant.delete(req.params.id)));
router.put('/:id', (req, res) => {
	try {
		res.status(200).json(Applicant.update(req.params.id, req.body))
	} catch (err) {
		if (err.name === 'ValidationError') {
		res.status(400).json(err.extra);
		} else {
		res.status(500).json(err);
		}
	}
});
router.get('/', (req, res) => res.status(200).json(Applicant.get()));
router.post('/', (req, res) => {
  try {
    const student = Applicant.create(req.body);
    res.status(201).json(student);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});

// Sort and filter
router.use('/sf', SortAndFilter);

module.exports = router;
