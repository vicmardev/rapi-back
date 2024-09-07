const nodemailer = require('nodemailer');
const config = require('../config.json')

module.exports = sendEdmail;

async function sendEdmail({to, subject, html, from = config.emailFrom})
    {
        const transporter = nodemailer.createTransport(config.smtpOptions);
        await transporter.sendEdmail({from, to, subject, html})
    }