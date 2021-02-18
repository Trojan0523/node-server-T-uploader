const express = require('express');
const multer = require('multer');
const upload = multer({dest: 'uploads/'})
const cors = require('cors')
const app = express();
const path = require('path');
app.get('/', (req,res) => {
    res.send('hello nodejs')
})
app.post('/upload', cors(), upload.single('file'), (req,res) => {
    // single后面的类型是协商好的
    res.send(req.file.filename)
})
app.options('/upload', cors())
app.get('/preview:key', cors(), (req,res) => {
    console.log(req.params.key)
    res.sendFile(`uploads/${req.params.key}`, { 
        root: __dirname,
        headers: {
            'Content-Type': 'image/jpeg',
        },
    }, (err) => {
        if(err) {
            res.status(404).send('Not Found')
        }
    });
});
app.listen(3000)