const express = require('express');
const router = express.Router();
const UsersController = require('./Controllers/UserController');
const CarController = require('./Controllers/CarController');
const errorHandler = require('./Middlewares/errorHandler');
const {checkAdmin, checkLoggedIn, checkLoggedUser} = require('./Middlewares/checkUser')
const bodyParser = require('body-parser'); // necesario para postman

router.use(bodyParser.json());

router.get('/users', /* checkAdmin,*/ UsersController.getUsers);
router.get('/login', UsersController.login);
router.get('/users/:id', checkAdmin, UsersController.getUser);
router.post('/user', UsersController.createUser); // seria como el register, sign up
router.put('/editme', checkLoggedUser, UsersController.editMe);
router.get('/profile', checkLoggedUser, UsersController.viewMyProfile);
router.put('/user/:username', checkAdmin, UsersController.editUser);
router.delete('/delete/:username', checkAdmin, UsersController.deleteUser);

router.get('/cars', checkLoggedIn, CarController.getCars);
router.get('/cars/:id', checkLoggedIn, CarController.getCar);
router.post('/car', checkLoggedIn, CarController.createCar);
router.put('/car', checkAdmin, CarController.editCar);

router.use(errorHandler.notFound);

module.exports = router;