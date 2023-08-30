const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const connectDb = require('./config/db');
const app = express();
const User = require('./models/User');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const multer = require('multer')
const uploadMiddleWare = multer({ dest: 'uploads/' })

const fs = require('fs');
const PostModel = require('./models/Post');
const { dirname } = require('path');


const salt = bcrypt.genSaltSync(10)
const secret = process.env.JWT_SECRET

const port = process.env.PORT || 4000

app.use(cors(

    {
        origin: ['http://localhost:5173', 'https://blog-app-4dqq.onrender.com/'],
        methods: ["POST", "GET", "PUT", "DELETE"],
        credentials: true
    }
));
// app.use(cors({ credentials: true, origin: ['http://localhost:5173', 'https://mern-blog-app-navy.vercel.app/'] }));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

connectDb();
// mongoose.connect("mongodb+srv://blog:blog1234@cluster0.uarrug3.mongodb.net/?retryWrites=true&w=majority");


app.post('/register', async (req, res) => {

    const { username, password } = req.body

    try {
        const userDoc = await User.create({

            username,
            password: bcrypt.hashSync(password, salt)

        })
        res.json(userDoc);

    } catch (err) {
        res.status(400).json(err)
    }

})

// Login

app.post('/login', async (req, res) => {

    const { username, password } = req.body


    const userDoc = await User.findOne({ username: username })
    const passOk = bcrypt.compareSync(password, userDoc.password);
    // res.json(passOk)
    // console.log(passOk)
    if (passOk) {




        jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {

            if (err) throw err
            // res.json(token)
            // console.log(token)
            res.cookie('token', token).json({ username: userDoc.username, id: userDoc._id })
        })


        // 
    } else {
        res.status(400).json('wrong credentials')
    }

})

app.get('/profile', (req, res) => {




    const { token } = req.cookies


    jwt.verify(token, secret, {}, (err, info) => {
        if (err) throw err

        res.json(info)


    })

    // res.json(req.cookies)

})

app.post('/logout', (req, res) => {

    res.cookie("token", "").json("ok")

})

app.post('/post', uploadMiddleWare.single('file'), async (req, res) => {

    const { originalname, path } = req.file

    const parts = originalname.split('.')

    const ext = parts[parts.length - 1]

    const newPath = path + '.' + ext
    fs.renameSync(path, newPath)

    const { title, summary, content } = req.body


    const { token } = req.cookies


    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) throw err


        const postDoc = await PostModel.create({

            title,
            summary,
            content,
            cover: newPath,
            author: info.id
        })


        res.json(postDoc)

    })



})

app.get('/post', async (req, res) => {

    res.json(

        await PostModel.find().populate('author', ['username'])

            .sort({ createdAt: -1 })
            .limit(20)

    )



})

app.put('/post', uploadMiddleWare.single('file'), async (req, res) => {
    let newPath = null;
    if (req.file) {
        const { originalname, path } = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
    }

    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) throw err;
        const { id, title, summary, content } = req.body;
        const postDoc = await PostModel.findById(id);
        const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
        if (!isAuthor) {
            return res.status(400).json('you are not the author');
        }
        postDoc.set({
            title,
            summary,
            content,
            cover: newPath ? newPath : postDoc.cover,
        });

        await postDoc.save();

        res.json(postDoc);
    });




})



app.get('/post/:id', async (req, res) => {
    const { id } = req.params

    const postDoc = await PostModel.findById(id).populate('author', ['username'])

    res.json(postDoc)


})

app.get('/', (req, res) => {
    res.json('Hello World')
})

app.listen(4000, (req, res) => {
    console.log('listening on port 4000');
})

// mongodb+srv://blog:blog1234@cluster0.uarrug3.mongodb.net/?retryWrites=true&w=majority
// zgaksgyeuposhdvs