import hbs, {NodemailerExpressHandlebarsOptions} from "nodemailer-express-handlebars";
import exphbs from "express-handlebars";
import path from "path";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import dotenv from "dotenv";

// Betöltjük a rendszerparamétereket
dotenv.config();

// Létrehozzuk az email sablonok generálásához szükséges konfigurációt
const handlebarOptions: NodemailerExpressHandlebarsOptions = {
    viewEngine: exphbs.create({
        extname: '.hbs',
        partialsDir: path.resolve('./email/templates/'),
        defaultLayout: false,
    }),
    viewPath: path.resolve('./email/templates/'),
    extName: '.hbs',
};

// Létrehozzuk az SMTP transportert
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
} as SMTPTransport.Options);

// Beállítjuk, hogy a transporterünk használja az email sablonokat
transporter.use('compile', hbs(handlebarOptions));

// Visszatérünk a függvénnyel
export const emailTransporter = transporter;