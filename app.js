const express = require('express');

//express invoke app
const app = express(); //invoking function to create an instance of an express app

//register veiw engine
app.set('view engine', 'ejs');


// listening requests
app.listen(3000); //infers local host

app.get('/', (req, res) => {
    const blogs = [
        {title: 'Hi', snip: 'this one'},
        {title: 'Hi4', snip: 'this on4e'},
        {title: 'Hi34', snip: 'this on3e'},
    ];
    //send a response to the browser/user
    //automatically does content type header-- and does sets status code 
    //res.sendFile('./Page/index.html', { root: __dirname}); //dirname curent directory -- root is this folder
    res.render('index', { title: 'Home', blogs: blogs}); //render it and sent it back to browser

});

app.get('/about', (req, res) => {
    //send a response to the browser/user
   //res.send('<p>about page</p>');//automatically does content type header-- and does sets status code 
   res.render('about', { title: 'about'});

});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'create'});
});

//redirects!

/*app.get('/about-me', (req,res) => {
    res.redirect('/about');
});*/


//404

app.use((req, res) => { //for every single request if all the requests have not been matched (MUST go at bottom)
    //res.status(404).sendFile('./Page/404.html', { root: __dirname});
    //express doesnt know if its an error unless we put the status manually
    res.status(404).render('404', { title: '404'});
});
