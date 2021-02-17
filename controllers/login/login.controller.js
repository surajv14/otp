const express = require('express');
const router = express.Router();
const loginService = require('./login.service');

router.post('/login', sendOTP);
router.post('/login/confirm', userLogin);

module.exports = router;


function sendOTP(req, res, next) {
    try {
        loginService.sendOTP(req.body)
            .then(data => res.status(data.status).json(data.response))
            .catch(err => next(err));
    } catch (e) {
        console.log('INFO:::: Error ', e)
    }

}

function userLogin(req, res, next) {
    try {
        loginService.userLogin(req.body)
            .then(data => res.status(data.status).json(data.response))
            .catch(err => next(err));
    } catch (e) {
        console.log('INFO:::: Error ', e)
    }

}



