const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const PORT =  5000;
const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

app.use(express.json());
app.use(express.static(path.join("./download", 'public')));

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/api/table', (req, res) => {
    const obj = fs.readFileSync('./db/table.json', 'utf8');
    res.send(obj);
});
app.post('/api/download', (req, res) => {
    const doc = new PDFDocument();
    let json = JSON.stringify(req.body)

    doc.pipe(fs.createWriteStream('./download/estimate.pdf', "utf8"));
    doc.fontSize(27)
        .text(json , 100, 100);

    doc.end();
    res.send("Ok")
});
app.get('/api/download/estimate.pdf', (req, res) => {
    res.download("./download/estimate.pdf")
})
app.post('/api/email', async (req, res) => {
    fs.readFile('./db/user.json', "utf8", (err, data)=> {
        if (err){
            res.send(err)
        } else {
            let obj = JSON.parse(data);
            obj.push(req.body);
            let json = JSON.stringify(obj);
            fs.writeFile('./db/user.json', json, 'utf8', (data) => data);
        }
    });

    const transpoter = nodemailer.createTransport({
        host: 'smtp.mail.ru',
        port: 85,
        secure: false,
        auth: {
            user: '************',
            pass: '************',
        },
    });

    const mailOptions = {
        from: '"The Idea project" <mail.mailru>',
        to: req.body.email,
        subject: 'ВЫ оформили заказ',
        text: JSON.stringify(req.body),
    };

    await transpoter.sendMail(mailOptions, (err, info) => {
        console.log(err, info);
    });
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));