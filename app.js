const express = require('express');
const morgamMiddleWare = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./model/blog');
const ejs = require('ejs');
const lodash = require('lodash');
const moment = require('moment');
const multerImg = require('multer');
const markdownIt = require('markdown-it');
const matterMarkdown = require('gray-matter');
const fs = require('fs');
const path = require('path');


const app = express(); //invoking function to create an instance of an express app
const mongoDB = 'mongodb+srv://BoushraBlog:boushrabettir@blogexpress.np7shhg.mongodb.net/blogs?retryWrites=true&w=majority';
async function ConnectionMongo() { 
    try {
      await mongoose.connect(mongoDB);

      const mdDirectory = './markdown';
      fs.readdir(mdDirectory, (error, file) => {
        if(error){
          console.error(error);
        } else {
          file.forEach(file => {
            if(path.extname(file) === '.md'){
              const markdownFile = fs.readFileSync(path.join(mdDirectory, file));
              const data = matterMarkdown(markdownFile);
              const md = new markdownIt();
              const htmlContent = md.render(data.content);
              Blog.findOne({title: data.data.title, htmlContent : htmlContent}, (error, blog) => {
                if(error){
                  console.error(error);
                } else if (!blog){
                  const blog = new Blog({
                    title: data.data.title,
                    date: data.data.date,
                    snip: data.data.snip,
                    body: data.body,
                    htmlContent : htmlContent,
                  });
                  blog.save();
                }
              });
            }
          });
        }
      });
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
