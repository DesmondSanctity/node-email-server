import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';


dotenv.config()
const app = express();

/** middlewares */
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by'); // less hackers know about our stack


const port = process.env.PORT || 8080;

/** HTTP GET Request */
app.get('/', (req, res) => {
    res.status(201).json("Health Check PASS");
});



// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: process.env.USER, // generated mailtrap user
        pass: process.env.PASSWORD, // generated mailtrap password
    }
});

// generate email body using Mailgen
let MailGenerator = new Mailgen({
    theme: "default",
    product : {
        name: "Test Email",
        link: 'https://mailgen.js/'
    }
})

// define a route for sending emails
app.post('/send-email', (req, res) => {
    // get the recipient's email address, name and message from the request body
    const { to, name, message } = req.body;

    // body of the email
    const email = {
        body : {
            name: name,
            intro : message || 'Welcome to Test Mail! We\'re very excited to have you on board.',
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        }
    }

    const emailBody = MailGenerator.generate(email);

    // send mail with defined transport object
    const mailOptions = {
        from: process.env.EMAIL,
        to: to,
        subject: 'Test Email',
        html: emailBody
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Email sent successfully');
        }
    });
});

// start the server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

