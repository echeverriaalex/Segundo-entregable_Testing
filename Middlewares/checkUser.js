const jwt = require('jsonwebtoken');

const checkLoggedIn = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    let decoded = jwt.decode(token, {complete: true});
    if(!decoded){
        const e = new Error('You are not Start session. Please, start session');
        next(e);
    }
    else{
        next();
    }
}

const checkAdmin = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    let decoded = jwt.decode(token, {complete: true});
    if(!decoded || decoded.payload.user.role !== "admin"){
        const e = new Error('User not authorized')
        next(e);
    }
    else{
        next();
    }
}

const checkLoggedUser = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    let decoded = jwt.decode(token, {complete: true});
    if(!decoded){
        const e = new Error('You are not Start session. Please, start session')
        next(e);
    }
    else{
        req.user = decoded.payload.user;
        next();
    }
}

module.exports = {
    checkLoggedIn,
    checkAdmin,
    checkLoggedUser
}