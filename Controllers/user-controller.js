const Userdata = require("../Models/ContactSchema");
const nodemailer = require("nodemailer");
require("dotenv").config();

const contactData = async (req, res) => {
    try {
        const { email, phone, name, subject, message } = req.body;

        // Save data to MongoDB
        const contact = new Userdata({
            name,
            email,
            phone,
            subject,
            message,
        });

        await contact.save();

        // Set up Node Mailer transport
        const transporter = nodemailer.createTransport({
            // Specify your email service details (SMTP or other service)
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });

        // Compose email message for client
        const clientMailOptions = {
            from: process.env.EMAIL,
            to: email, // Client's email
            subject: "Your message has been recorded",
            html: `
        <h1>Thank you for reaching out to us. We will get back to you shortly.</h1>
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <p>Phone: ${phone}</p>
        <p>Subject: ${subject}</p>
        <p>Message: ${message}</p>
        <p>Your message has been sent.</p>
      `,
        };

        // Compose email message for admin
        const adminMailOptions = {
            from: process.env.EMAIL,
            to: process.env.ADMIN_EMAIL, // Admin's email
            subject:
                "Contact Form Submission (NAVATA TECH) - You've Got Email!",
            html: `
        <h1>Hey, You Got Email From A Client</h1>
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <p>Phone: ${phone}</p>
        <p>Subject: ${subject}</p>
        <p>Message: ${message}</p>
      `,
        };

        // Send email to client
        transporter.sendMail(clientMailOptions, (error, info) => {
            if (error) {
                console.error(error);
                return res
                    .status(500)
                    .json({ error: "Email could not be sent to client" });
            }
            console.log("Client Email sent: " + info.response);
        });

        // Send email to admin
        transporter.sendMail(adminMailOptions, (error, info) => {
            if (error) {
                console.error(error);
                return res
                    .status(500)
                    .json({ error: "Email could not be sent to admin" });
            }
            console.log("Admin Email sent: " + info.response);
        });

        res.status(200).json({ message: "Emails sent successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { contactData };
