const express = require('express');

const router = express.Router();


router.get('/profile', (req, res, next) => {
  console.log(req)
  res.json({
    message : 'secure route',
    user : req.user,
    token : req.query.secret_token
  })
});

module.exports = router;