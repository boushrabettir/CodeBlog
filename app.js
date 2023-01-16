const express = require('express');
const morgamMiddleWare = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./model/blog');
const { render } = require('ejs');
const { result } = require('lodash');
const moment = require('moment');
const multerImg = require('multer');

const app = express(); //invoking function to create an instance of an express app
const mongoDB = 'mongodb+srv://BoushraBlog:boushrabettir@blogexpress.np7shhg.mongodb.net/blogs?retryWrites=true&w=majority';
async function ConnectionMongo() { 
    try {
      await mongoose.connect(mongoDB);
      app.listen(3000); //infers local host
      console.log('connected to mongo');
    } catch (error) {
      console.error(error);
    }
  }
ConnectionMongo(); 
//connecting to mongodb database
//register veiw engine
app.set('view engine', 'ejs');

// listening requests

//middleware and static files
app.use(express.static('public')); // access css file
app.use(express.urlencoded({ extended: true })); // all the url encoded data and passes into obejct for request post
app.use(morgamMiddleWare('tiny'));


app.get('/', (req, res) => {

 res.redirect('/blogs'); //redirecting to create a seperate homepage later
});

app.get('/about', (req, res) => {
   res.render('about', { title: 'about'});
});

app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 }) // decedomg order, new > old
    .then((results) => {
        res.render('index', {title: 'All Blogs', blogs: results, moment: moment});
    })
    .catch((error) => {
        console.log(error);
    });
});

app.post('/blogs', (req, res) => {
   const blog_new = new Blog(req.body);
   blog_new.save()
   .then((results) => {
      res.redirect('/blogs');
   })
   .catch((error) => {
    console.log(error);
   })
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create'});
});


app.get('/blogs/:id', async (req, res) => {
  const id = await Blog.findById(req.params.id);
  res.render('detail', {blog : id, title: 'Blog Details'})
 
 });

 //404
app.use((req, res) => { 
    //for every single request if all the requests have not been matched (MUST go at bottom)
    //express doesnt know if its an error unless we put the status manually
    res.status(404).render('404', { title: '404'});
});
