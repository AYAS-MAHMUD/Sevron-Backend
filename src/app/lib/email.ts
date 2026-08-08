
import nodemailer from "nodemailer"
import { config } from "../config/config"
import path from "path"
import ejs from "ejs"

export const transporter = nodemailer.createTransport({
  host: config.smtp.host,
  port: Number(config.smtp.port),
  secure: true, // true for 465, false for 587
  auth: {
    user: config.smtp.smtp_user,
    pass: config.smtp.smtp_pass,
  },
});


interface sendEmailOption {
    to : string,
    subject : string,
    templateName : string,
    templateData? : Record<string,any>
    attachments? : {
        filename : string,
        content : Buffer | string,
        contentType : string
    }[]
}

export const sendEmail = async ({
    to,
    subject,
    templateName,
    templateData,
    attachments
}: sendEmailOption)=>{
    try {
    const templatePath = path.resolve(process.cwd() ,`src/app/templates/${templateName}.ejs`);

    const html = await ejs.renderFile(templatePath,templateData);

    const info = await transporter.sendMail({
        from : config.smtp.smtp_from,
        to  : to,
        subject : subject,
        html : html,      // we use ejs for making template 
        attachments : attachments?.map(attachment => ({
            filename : attachment.filename,
            content : attachment.content,
            contentType : attachment.contentType
        }))
    })
    console.log(`\u2709\uFE0F Email sent to ${to}: ${info.messageId}`);
    } catch (error) {
        console.log("Email sending error", error)
    }
}