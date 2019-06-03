const { Router } = require('express');
const { Applicant, Application } = require('../../../models');

const router = new Router();

function hasApplication(applicant_id) {
  const app = Application.get();
  for (let i = 0; i < app.length; i++) {
    if (app[i].applicant_id == applicant_id) return true;
  }
  return false;
}

function hasApplicationNoValidated(applicant_id) {
  const app = Application.get();
  for (let i = 0; i < app.length; i++) {
    if (app[i].applicant_id == applicant_id && !app[i].status) return true;
  }
  return false;
}

function hasApplicationIn(applicant_id, start, end) {
  const app = Application.get();
  for (let i = 0; i < app.length; i++) {
    if (app[i].applicant_id == applicant_id && app[i].date >= start && app[i].date <= end) return true;
  }
  return false;
}

function applicantHasWord(applicant_id, wordSearch) {
	const word = wordSearch.toLowerCase();
	const app = Applicant.getById(applicant_id);
	return  app.firstname.toLowerCase().includes(word) || app.lastname.toLowerCase().includes(word) || app.pathways.toLowerCase().includes(word);
}

function attachApplications(applicant) {
  const app = applicant;
  app.applications = Application.get().filter(e => e.applicant_id == app.id);
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

router.get('/elements/:nb/:num', (req, res) => {
	if(/[0-9]+/.test(req.params.num) && /[0-9]+/.test(req.params.nb))
	{
		let applicants = Applicant.get().filter(e => hasApplication(e.id));
		if (req.query.alpha !== undefined) {
		applicants.sort((e1, e2) => e1.lastname.localeCompare(e2.lastname));
		}
		if (req.query.unchecked !== undefined) {
		applicants = applicants.filter(e => hasApplicationNoValidated(e.id));
		}
		if (req.query.start !== undefined && req.query.end !== undefined) {
		applicants = applicants.filter(e => hasApplicationIn(e.id, parseInt(req.query.start), parseInt(req.query.end)));
		}
		if (req.query.word !== undefined) {
		applicants = applicants.filter(e => applicantHasWord(e.id, req.query.word));
		}
		const start = req.params.nb * (req.params.num - 1);
		const end = req.params.nb * req.params.num;
		res.status(200).json(applicants.slice(start, end).map(e => calculStatus(attachApplications(e))));
	}
	else
	{
		res.status(400).json("Bad request")
	}
});

router.get('/elements/number', (req, res) => {
  let applicants = Applicant.get().filter(e => hasApplication(e.id));
  if (req.query.alpha !== undefined) {
    applicants.sort((e1, e2) => e1.lastname.localeCompare(e2.lastname));
  }
  if (req.query.unchecked !== undefined) {
    applicants = applicants.filter(e => hasApplicationNoValidated(e.id));
  }
  if (req.query.start !== undefined && req.query.end !== undefined) {
    applicants = applicants.filter(e => hasApplicationIn(e.id, parseInt(req.query.start), parseInt(req.query.end)));
  }
  if (req.query.word !== undefined) {
    applicants = applicants.filter(e => applicantHasWord(e.id, req.query.word));
  }
  res.status(200).json({ number: applicants.length });
});

module.exports = router;
