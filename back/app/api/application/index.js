const { Router } = require('express');
const { Application, Applicant } = require('../../models');

function attachApplicant(application) {
  const app = application;
  app.applicant = Applicant.getById(application.applicant_id);
  return app;
}

const router = new Router();
router.get('/last/:nb', (req, res) => {
  if (/[0-9]+/.test(req.params.nb)) {
    const allApplications = Application.get();
    allApplications.sort((a, b) => b.date - a.date);
    allApplications.splice(req.params.nb, allApplications.length - req.params.nb);
    res.status(200).json(allApplications.map(application => attachApplicant(application)));
  } else {
    res.status(400).json('Bad request');
  }
});
router.get('/', (req, res) => res.status(200).json(Application.get().map(application => attachApplicant(application))));
router.get('/:id', (req, res) => res.status(200).json(Application.getById(req.params.id).map(application => attachApplicant(application))));
router.delete('/:id', (req, res) => res.status(200).json(Application.delete(req.params.id)));
router.put('/:id', (req, res) => {
  try {
    res.status(200).json(Application.update(req.params.id, req.body));
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});
router.put('/validate/:id', (req, res) => {
  const app = Application.getById(req.params.id);
  app.status = true;
  try {
    res.status(200).json(Application.update(req.params.id, app));
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});

router.put('/annotate/:id', (req, res) => {
  try {
    const app = Application.getById(req.params.id);
    app.annotation = req.body.text;

    res.status(200).json(Application.update(req.params.id, app));
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});
router.post('/', (req, res) => {
  try {
    const student = Application.create(req.body);
    res.status(201).json(student);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});

module.exports = router;
