import nodemailer from "nodemailer";

export async function POST(req) {
    try {
        const { name, email, message } = await req.json();

        if (!name || !email || !message) {
            return Response.json({ message: "All fields are required" }, { status: 400 });
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "nitheenkumar18@gmail.com",
                pass: "ilyg vimb geku sfxy"
            }
        });

        const mailOptions = {
            from: email,
            to: "nitheenkumar18@gmail.com",
            subject: `New Portfolio Message from ${name}`,
            html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                <div style="background-color: #4f46e5; padding: 24px; text-align: center;">
                    <h2 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600;">New Portfolio Message</h2>
                </div>
                <div style="padding: 32px; background-color: #ffffff;">
                    <p style="font-size: 16px; color: #333333; margin-bottom: 8px;"><strong>Sender Name:</strong> ${name}</p>
                    <p style="font-size: 16px; color: #333333; margin-top: 0; margin-bottom: 24px;"><strong>Reply-To:</strong> <a href="mailto:${email}" style="color: #4f46e5; text-decoration: none;">${email}</a></p>
                    
                    <h3 style="color: #333333; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px; border-bottom: 1px solid #eeeeee; padding-bottom: 8px;">Message Content</h3>
                    <div style="background-color: #f9fafb; padding: 20px; border-left: 4px solid #4f46e5; border-radius: 4px;">
                        <p style="font-size: 15px; color: #444444; margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                    </div>
                </div>
                <div style="background-color: #f8fafc; padding: 16px; text-align: center; border-top: 1px solid #e0e0e0;">
                    <p style="font-size: 12px; color: #94a3b8; margin: 0;">This email was automatically generated from your website's contact form.</p>
                </div>
            </div>
            `,
        };

        await transporter.sendMail(mailOptions);

        return Response.json({ message: "Message sent successfully!" }, { status: 200 });

    } catch (error) {
        console.error("Failed to send email:", error);
        return Response.json({ message: "Failed to send message. Please try again later." }, { status: 500 });
    }
}
