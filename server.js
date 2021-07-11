const express = require('express');
const app = express();

const nodemailer = require('nodemailer');

const PORT = process.env.PORT || 5000;

//Middleware
app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/contact-us.html');
})

app.post('/', (req, res) => {
    console.log(req.body);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'contactformtest5@gmail.com',
            pass: 'password01!'
        }
    });

    
    const mailOptions = {
        from: req.body.email,
        to: 'contactformtest5@gmail.com',
        subject: `Message from ${req.body.email}: ${req.body.subject}`,
        text: req.body.message
    }

    transporter.sendMail(mailOptions, (err,info)=>{
        if(err){
            console.log(err);
            res.send('error');
        }else{
            console.log('email sent: ' + info.response);
            res.send('success');
        }
    })

})

app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`);
})
