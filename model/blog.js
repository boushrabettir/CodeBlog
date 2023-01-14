const mongoose = require('mongoose');
const Schema = mongoose.Schema; //define structure / documents in a collection 
const blogSchema = new Schema({ //creating an instance of a schema
//similar to oop
    title:  {
        type: String,
        required: true
    },
    snip: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }

}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema); //should be a signular of a collection name for Blog by defining the name as a sinfgular
module.exports = Blog;