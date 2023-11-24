import nodemailer from 'nodemailer'

export const funcEmail = {
    sendMail,

}

// export async function sendMail( from, to, subject, text ) {
//     const mailOptions = { from, to, subject, text };
//     try{
//         const transporter = nodemailer.createTransport( { service: 'gmail',
//                                                         auth: {
//                                                             user: 'nagaoreishi@gmail.com',
//                                                             pass: 'huyquang512',
//                                                         } });
//         await transporter.sendMail( mailOptions );
//     }
//     catch( error ) {
//         throw new Error('Sending email failed');
//     }
// }

export async function sendMail( options ) {
    const mailOptions = options;
    try{
        const transporter = nodemailer.createTransport( { service: process.env.MAIL_SERVICE,
                                                        auth: {
                                                            user: process.env.MAIL_USER,
                                                            pass: process.env.MAIL_PASS,  //jdlz yuhb rhtl tsr  //uill swsq lfyu lgfk
                                                        } });
        await transporter.sendMail( mailOptions );
    }
    catch( error ) {
        throw new Error('Sending email failed' + error.message);
    }
}