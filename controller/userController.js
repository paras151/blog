var express = require("express");
const userModel = require("../model/userModel")
const _ = require('lodash');

// const getAllUsers = (req,res)=>{
//     userModel.find({}).then((d)=>{
//             res.send(d)
// });
    
// }

// userRouter.get('/', async (req, res) => {
//     var users = await userModel.find();
//     res.send(users);
//   });

const createUserPage = async (req,res)=>{
    res.render('users/new', { user: new userModel() })
}

const createLoginPage = async (req,res)=>{
    res.render('users/login')
}


const getUser = async (req,res)=>{
    // var user = await userModel.findById(req.params.id)
    // console.log(user)
    res.render('users/show', { user: req.user })
    // res.send(req.user);
}

const createUser = (req,res)=>{

    var body = _.pick(req.body, ['name','username','age','email', 'password']);
    // console.log(req.body)
    var user = new userModel(body);
  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {

    res.cookie('jwt', token, { httpOnly: 'true' });

    res.header('x-auth', token).send(user)
  }).catch((e) => {
      console.log(e)
    res.status(400).send(e);
  })
}

const login = (req,res)=>{
    var body = _.pick(req.body, ['email', 'password']);

  userModel.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {

        res.cookie('jwt', token, { httpOnly: 'true' });
        
        res.redirect("/users/me")
      res.header('x-auth', token).send(user);
    });
  }).catch((e) => {
    res.status(400).send();
  });
}

// const updateUser = async (req,res)=>{
//     var id = req.params.id || req.headers.user["_id"];
//     // console.log("ID: "+id);
//     var result = await userModel.findByIdAndUpdate(id,req.body,{new:true})
//     res.send(result)
// }

const deleteUser = (req,res)=>{
    console.log(req.token)
    req.user.removeToken(req.token).then(() => {
        // res.status(200).send(req.user);
        res.redirect("/")
      }, () => {
        res.status(400).send();
      });
}
// const checkReqBody = (req,res,next)=>{
//     if(req.body.name == undefined || req.body.username == undefined){
//         return res.status(401).json({
//             "status":"bad request"
//         })
//     }
//     next();
// }
// const checkId = (req,res,next,id)=>{
//     var obj = users.find(obj => {
//         return obj.id == id;
//     });
//     if(!obj){
//         return res.status(404).json({
//             "status": "Data not found"
//         })
//     }
//     next();
// }

module.exports = {createUserPage,createLoginPage, getUser,createUser, login , deleteUser }