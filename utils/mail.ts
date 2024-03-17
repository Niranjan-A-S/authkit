import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
    //TODO: read the domain from the env file
    const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

    const response = await resend.emails.send({
        from: 'onboading@resend.dev',
        to: email,
        subject: 'Confirm your email',
        html: `<p>Click <a href=${confirmLink}>here</a> to confirm email.</p>`
    });

    return response;
};
