    
const loginCtrl = require('./controllers/login/login.controller');


module.exports = function (app) {
    app.use('/login', loginCtrl);
};
