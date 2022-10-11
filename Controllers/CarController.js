const db = require('../Models/index');
const {Car, User} = db;

const createCar = async(req, res) => {
    let body = req.body;
    let {brand, model, year, color, UserId} = body;
    Car.create({
        brand: brand, 
        model: model, 
        year: year, 
        color: color, 
        UserId: UserId
    })
    .then(car => {
        res.status(201).send(car);
    }).catch(err => res.status(400).send(err));
}

const getCars = async(req, res, next) =>{
    Car.findAll()
        .then(cars => res.status(200).send(cars))
        .catch(err => next(err));
}

const getCar = async(req, res, next) =>{
    const id = req.params.id;
    Car.findOne({where: {id}, include: User})
        .then(car => res.status(200).send(car))
        .catch(err => next(err));
}

const editCar = async(req, res, next) =>{
   
    let body = req.body;
    let {id, brand, model, year, color, UserId} = body;
    
    Car.update({brand: brand, model: model, year: year, color: color, UserId: UserId}, {
        where: {
            id: id
        }
    })
    .then(car => res.status(200).send(`The car has been edited successfully`))
    .catch(err => next(err));
}

const deleteCar = (req, res, next) => {
    const usernamecurrent = req.params.username;
    User.destroy({
        where: {
            username: usernamecurrent
        }
    })
    .then(user => res.status(201).send(`The car of user has been delete successfully`))
    .catch(err => next(err));
}

module.exports = {
    createCar,
    getCars,
    getCar,
    editCar,
    deleteCar
}