const express = require('express')
const mongoose = require('mongoose')
const articleModel = require('./model/articleModel')
const articleRouter = require('./routes/articles')
var bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');


const userModel = require('./model/userModel')
const userRouter = require('./routes/users')
const methodOverride = require('method-override')
const app = express()

mongoose.connect('mongodb+srv://i_am_user:user@cluster0-lbubz.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
})
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.set('view engine', 'ejs')
// app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.use(cookieParser(),(req,res,next)=>{
  next();
})

app.get('/', async (req, res) => {
  const articles = await articleModel.find().sort({ createdAt: 'desc' })
  res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)
app.use('/users', userRouter)

var port = process.nextTick.PORT || 5000;
app.listen(port)