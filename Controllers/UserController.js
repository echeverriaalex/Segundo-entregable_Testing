const db = require('../Models/index');
const {User, Car} = db;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const login = (req, res, next) =>{
    const body = req.body;
    let {email, password} = body;
    User.findOne({where: {email}})
        .then(user => {
            if(!user){
                console.log("The email or password is incorrect, please try again");
                res.status(400).send("The email or password is incorrect, please try again")
            }
            else if(user){

                console.log(`Compare sync: ` + bcrypt.compareSync(password, user.password));

                if(!bcrypt.compareSync(password, user.password)){
                    console.log("Algo es incorreecto");
                    console.log(`La pass body ${password}`);
                    console.log(`La pass bd ${user.password}`);
                }
                else{
                    console.log("Los datos son carrectos, iniciaste sesion exitosamente");
                    console.log(`La pass body ${password}`);
                    console.log(`La pass bd ${user.password}`);
                    
                    const token = jwt.sign({
                                    user: user,
                                }, process.env.SEED_AUTENTICATION, {
                                    expiresIn: process.env.TOKEN_EXPIRATION
                                })
                    console.log(`Token: ${token}`);

                    user = {
                        "user": user,
                        "token": token
                    }                    
                }
                //console.log(user.email);
                res.status(200).send(user)
            } 
        })
        .catch(err => {
            next(err)
        });
}

const createUser = async(req, res) => {
    let body = req.body;
    let {firstname, lastname, username, email, password, role} = body;

    User.create({
        firstname: firstname,
        lastname: lastname,
        username: username,
        email: email,
        password: bcrypt.hashSync(password, 10),
        role: role || "user" 
    })
    .then(user => {
        res.status(201).send(user);
    }).catch(err => res.status(400).send(err));
}

const getUsers = (req, res, next) =>{
    User.findAll({include: Car})
        .then(users => res.status(200).send(users))
        .catch(err => next(err));
}

const getUser = (req, res, next) =>{
    const id = req.params.id;
    User.findOne({where: {id}, include: Car})
        .then(user => res.status(200).send(user))
        .catch(err => next(err));
}

const editUser = (req, res, next) => {

    let usernamecurrent = req.params.username;
    let body = req.body;
    let {firstname, lastname, username, email, password} = body;

    User.update({
        firstname: firstname,
        lastname: lastname,
        username: username,
        email: email, 
        password: bcrypt.hashSync(password, 10)
    }, {
        where: {
            username: usernamecurrent
        }
    })
    .then(user => res.status(201).send(user))
    .catch(err => next(err));
}

const editMe = (req, res, next) => {

    console.log(`My ID is : ${req.user.id}`);

    let body = req.body;
    let {firstname, lastname, username, email, password} = body;

    User.update({
        firstname: firstname,
        lastname: lastname,
        username: username,
        email: email, 
        password: bcrypt.hashSync(password, 10)
    }, {
        where: {
            id: req.user.id
        }
    })
    .then(user => res.status(201).send(user))
    .catch(err => next(err));
}
const viewMyProfile = (req, res, next) =>{
    const id = req.user.id
    User.findOne({where: {id}, include: Car})
        .then(user => res.status(200).send(user))
        .catch(err => next(err));
}

const deleteUser = (req, res, next) => {
    const usernamecurrent = req.params.username;
    User.destroy({
        where: {
            username: usernamecurrent
        }
    })
    .then(user => res.status(201).send(`The user named ${usernamecurrent} has been delete successfully`))
    .catch(err => next(err));
}

module.exports = {
    createUser,
    login,
    getUser,
    getUsers,
    editUser,
    viewMyProfile,
    editMe,
    deleteUser
}