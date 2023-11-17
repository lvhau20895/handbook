import nodemailer, { Transporter, SendMailOptions } from "nodemailer";
import config from "../Configs/config";

export default async function sendMail(email: string, value: string | number) {
	const { user, pass } = config.sendMail;

	const transporter: Transporter = nodemailer.createTransport({
		service: "gmail",
		auth: { user, pass }
	});

	const mailOptions: SendMailOptions = {
		from: `'Handbook' <${user}>`,
		to: email,
		subject: "Support Handbook",
		html: `
            <div style="font-family: Arial, Helvetica, sans-serif;">
                <p>Your temporary password is <strong>"${value}"</strong><p>
                <a style="display: inline-block; text-decoration: none; background: #71a697; color: #eee; padding: 20px; border-radius: 5px; font-weight: bold; margin: 30px 0;" href="http://localhost:3000/">Go to Handbook</a>
            </div>
        `
	};

	await transporter.sendMail(mailOptions);
}
