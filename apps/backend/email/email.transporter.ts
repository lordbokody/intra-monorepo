import hbs, {NodemailerExpressHandlebarsOptions} from "nodemailer-express-handlebars";
import exphbs from "express-handlebars";
import path from "path";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const handlebarOptions: NodemailerExpressHandlebarsOptions = {
    viewEngine: exphbs.create({
        extname: '.hbs',
        partialsDir: path.resolve('./email/templates/'),
        defaultLayout: false,
    }),
    viewPath: path.resolve('./email/templates/'),
    extName: '.hbs',
};

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
} as SMTPTransport.Options);

transporter.use('compile', hbs(handlebarOptions));

export const emailTransporter = transporter;