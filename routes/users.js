var express = require("express");

const userRouter = express.Router();

const {createUserPage, createLoginPage ,getUser,createUser, login, deleteUser} = require("../controller/userController");
// const {userLogin,userSignup,forgotPassword,resetPassword,userLogout,protectRoute,updatePass} = require("../controllers/authController");
const {authenticate} = require("../controller/authController")

userRouter
    .route('/signup')
    .get(createUserPage)
    .post(createUser)

userRouter
    .route('/login')
    .get(createLoginPage)
    .post(login)

userRouter.post('/me/token', authenticate ,deleteUser);

userRouter.get('/me', authenticate ,getUser);




userRouter.delete('/me/token',deleteUser);

// usersRouter
//   .route("/")
//   .get(getAllUsers)
//   .post(createUser)
// usersRouter
// .route("/login")
// .post(userLogin)

// usersRouter
// .route("/logout")
// .get(userLogout)

// usersRouter
// .route("/signup")
// .post(userSignup)

// usersRouter
// .patch("/update",protectRoute,updateUser);
// usersRouter
// .patch("/updatePassword",protectRoute,updatePass);

// usersRouter.route("/forgotPassword").post(forgotPassword);
// usersRouter.route("/resetPassword/:token").patch(resetPassword);


// usersRouter
// .route("/:id")
// .get(getUser)
// .patch(updateUser)
// .delete(deleteUser)

module.exports = userRouter;