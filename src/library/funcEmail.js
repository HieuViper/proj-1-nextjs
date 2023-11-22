import nodemailer from 'nodemailer'

export const funcEmail = {


}

export async function sendMail( from, to, subject, text ) {
    const mailOptions = { from, to, subject, text };
    const transporter = nodemailer.createTransport( { service: 'gmail',
                                                    auth: {
                                                        user: 'nagaoreishi@gmail.com',
                                                        pass: 'huyquang512',
                                                    } });
    await transporter.sendMail( mailOptions );
}