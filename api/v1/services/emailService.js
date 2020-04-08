const AWS = require("aws-sdk");
const config = require('../../../config')
const fs = require('fs')
const common = require('../../common')
const nodemailer = require('nodemailer');

AWS.config.update({
    accessKeyId: config.AWS.ACCESS_KEY_ID,
    secretAccessKey: config.AWS.SECRETT_KEY,
    region: config.AWS.SES_REGION
});


async function sesSendMail(ccEmail, toEmail, subject, htmlData) {
    const ses = new AWS.SES({ apiVersion: "2010-12-01" });
    const params = {
        Destination: {
            CcAddresses: ccEmail,
            ToAddresses: toEmail
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: htmlData
                },
                // Text: {
                //     Charset: "UTF-8",
                //     Data: "Hello Charith Sample description time 1517831318946"
                // }
            },
            Subject: {
                Charset: "UTF-8",
                Data: subject
            }
        },
        Source: config.SES.email
    };

    const sendEmail = ses.sendEmail(params).promise();

    sendEmail
        .then(data => {
            console.log("email submitted to SES", data);
        })
        .catch(error => {
            console.log(error);
        });
}

async function nodeMailerSendMail(ccEmail, toEmail, subject, htmlData) {
    var transporter = nodemailer.createTransport({ // config mail server
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: config.SES.email,
            pass: config.SES.password
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
        from: config.SES.email,
        cc: ccEmail,
        to: toEmail,
        subject: subject,
        html: htmlData
    }
    transporter.sendMail(mainOptions, function(err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log('Message sent: ' + info.response);
        }
    });
}


async function sendMailWelcomeUser(user) {
    let filePath = process.cwd() + '/template/email.html'
        // let data = fs.readFile(filePath, {encoding: 'utf-8'}, function(err, data) {
        //     console.log('aaa')
        // })

    let data = await fs.readFileSync(filePath, { encoding: 'utf-8' })
    if (data) {
        data = data.replace('PHONE', user.phone)
        data = data.replace('PASSWORD', '1111')
        data = data.replace('FULLNAME', user.name)
        data = data.replace('EMAIL', user.email)
        data = data.replace('ADDRESS', user.address)
        data = data.replace('BIRTHDAY', common.formatDateV2(user.dateOfBirth))
        data = data.replace('GENDER', user.gender)

        let toEmail = [user.email]
        sesSendMail([], toEmail, 'Welcome To Apartment', data)
        // nodeMailerSendMail([], toEmail, 'Welcome To Apartment', data)
    }
}

module.exports = {
    sendMailWelcomeUser
}