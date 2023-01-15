const express = require('express');
const morgamMiddleWare = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./model/blog');
const { render } = require('ejs');
const { result } = require('lodash');


//express invoke app
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

  ConnectionMongo(); // asynchrnous similar to promises
//connecting to mongodb database
//register veiw engine
app.set('view engine', 'ejs');

// listening requests

//middleware and static files(static = css, images)
app.use(express.static('public')); // now we can access files as well, non changeable
app.use(express.urlencoded({ extended: true })); // all the url encoded data and passes into obejct for request post
app.use(morgamMiddleWare('tiny'));



//mongoose and mongo sandbox routs to save and get data

app.get('/', (req, res) => {
 //do seperate home page
 res.redirect('/blogs'); // this is just a holder

});

app.get('/about', (req, res) => {
    //send a response to the browser/user
   //res.send('<p>about page</p>');//automatically does content type header-- and does sets status code 
   res.render('about', { title: 'about'});

});

app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 }) // decedomg order, newewst
    .then((results) => {
        res.render('index', {title: 'All Blogs', blogs: results});
    })
    .catch((error) => {
        console.log(error);
    });
});

app.post('/blogs', (req, res) => {
   const blog = new Blog(req.body);

   blog.save()
   .then((results) => {
      res.redirect('/');
   })
   .catch((error) => {
    console.log(error);
   });
});

app.get('/images/:id', (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((blog) => {
      console.log(blog._id); // this will log the id of the image
      res.contentType(blog.image.contentType);
      res.send(blog.image.type);
    })
    .catch((error) => {
      console.error(error);
      res.status(404).send('Image not found');
    })
});

app.get('/blogs/:id', (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((results) => {
      res.render('detail', {blog : results, title: 'Blog Details'})
    })
    .catch((error) => {
      console.error(error);
    })

});



app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create'});
});
//404

app.use((req, res) => { //for every single request if all the requests have not been matched (MUST go at bottom)
    //res.status(404).sendFile('./Page/404.html', { root: __dirname});
    //express doesnt know if its an error unless we put the status manually
    res.status(404).render('404', { title: '404'});
});
