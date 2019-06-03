const { Router } = require('express');
const { Applicant } = require('../../models');

const router = new Router();

router.post('/', (req, res) => {
  const form = req.body;
  if(form.firstname == null || form.lastname == null)
  {
	  res.status(400).json("Bad request");
	  return;
  }
  const applicants = Applicant.get();
  // admin connexion
  if (form.firstname == 'admin' && form.lastname == 'admin') {
    res.status(200).json(applicants[0]);
    return;
  }
  for (let i = 0; i < applicants.length; i++) {
    const applicant = applicants[i];
    if (applicant.firstname == form.firstname && applicant.lastname == form.lastname) {
      res.status(200).json(applicant);
      return
    }
  }
  res.status(403);
  res.send();
});

module.exports = router;
