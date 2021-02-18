const express = require('express');
const multer = require('multer');
const cors = require('cors');
const upload = multer({ dest: 'uploads/' });

const app = express();

app.get('/', (req,res) => {
    res.send('hello nodejs')
})
app.options('/upload', cors())

app.post('/upload', cors(), upload.single('file'), function (req, res) {
    console.log(req.body)
    res.send(req.file.filename);
});

app.get('/preview/:key', cors(), (req,res) => {
    console.log(req.params.key)
    res.sendFile(`uploads/${req.params.key}`, { 
        root: __dirname,
        headers: {
            'Content-Type': 'image/jpeg',
        },
    }, (err) => {
        if(err) {
            console.log(err);
            res.status(404).send('Not Found');
        }
    });
});

var port = process.env.PORT || 3000
console.log(port);
app.listen(port)