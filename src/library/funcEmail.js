import nodemailer from 'nodemailer'

export const funcEmail = {
    sendMail,

}

export async function sendMail( from, to, subject, text ) {
    const mailOptions = { from, to, subject, text };
    try{
        const transporter = nodemailer.createTransport( { service: 'gmail',
                                                        auth: {
                                                            user: 'nagaoreishi@gmail.com',
                                                            pass: 'huyquang512',
                                                        } });
        await transporter.sendMail( mailOptions );
    }
    catch( error ) {
        throw new Error('Sending email failed');
    }
}

export async function sendMail( options ) {
    const mailOptions = options;
    try{
        const transporter = nodemailer.createTransport( { service: 'gmail',
                                                        auth: {
                                                            user: 'nagaoreishi@gmail.com',
                                                            pass: 'huyquang512',
                                                        } });
        await transporter.sendMail( mailOptions );
    }
    catch( error ) {
        throw new Error('Sending email failed');
    }
}