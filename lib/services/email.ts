import "server-only";
import { createTransport } from "nodemailer";

const transporter = createTransport({
  service: "Gmail",
  port: 465, // true for 465, false for other ports
  host: "smtp.gmail.com",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
  secure: true,
});

export async function sendNewNoteEmail({
  note,
  receiverEmail,
}: {
  receiverEmail: string;
  note: Note;
}) {
  console.log(">>>>>>>>>>>", { receiverEmail, note });
  try {
    const noteLink = `${
      process.env.NODE_ENV === "production"
        ? "https://grow-game.vercel.app"
        : "http://localhost:3000"
    }/dashboard/all-notes/${note?.id}`;

    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: receiverEmail,
      subject: "Emerald Diary",
      html: `
      <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      * {
        box-sizing: border-box;
      }
    </style>
  </head>
  <body>
    <div
      style="
        font-family: Arial, sans-serif;
        text-align: center;
        width: 50rem;
        margin: auto;
        color: white;
        background-color: #fef2ee;
        padding: 10px;
      "
    >
      <div
        style="
          background-color: #956e60;
          padding: 10px;
          height: 8rem;
          color: white;
          display: flex;
          align-items: flex-end;
          gap: 10px;
        "
      >
        <div style="height: 100%; width: 6rem">
          <img
            src="https://notee-app.vercel.app/images/overlay.png"
            style="object-fit: cover; width: 100%; height: 100%; z-index: -1"
          />
        </div>
        <h1>Hi, from Emerald's Diary!</h1>
      </div>
      <p
        style="
          color: #956e60;
          font-weight: 600;
          font-size: 24px;
          text-align: left;
        "
      >
        Your note has been created successfully
      </p>
      <div style="padding: 20px">
        <a style="color: #956e60; text-decoration: none" href="${noteLink}">
          <div
            style="
              border-radius: 1rem;
              padding: 0.5rem;
              z-index: 10;
              border: 1px solid #956e60;
              display: flex;
              text-align: left;
              align-items: center;
              line-height: 14px;
              background-color: #fff;
              height: 5rem;
            "
          >
            <div
              style="
                font-size: x-large;
                background-color: #e1baac;
                padding: 3px;
                border-radius: 100%;
                height: 4rem;
                width: 4rem;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1;
              "
            >
              🗒️
            </div>
            <div
              style="
                margin-left: -27px;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: flex-start;
                height: 100%;
                gap: 3px;
              "
            >
              <div
                style="
                  font-weight: 600;
                  background-color: #e1baac;
                  padding-top: 10px;
                  padding-bottom: 10px;
                  padding-right: 5px;
                  padding-left: 30px;
                  border-top-right-radius: 100px;
                  border-bottom-right-radius: 100px;
                  height: fit-content;
                  display: inline-block;
                "
              >
                <p
                  style="
                    border-radius: 10px;
                    background-color: #fff;
                    display: inline;
                    padding: 3px;
                  "
                >
                  Title: ${note?.title}
                </p>
              </div>
              <small style="padding-left: 30px">Click to view</small>
            </div>
          </div>
        </a>
        <p style="color: #956e60; font-weight: 600">Happy Scribbling!🚀</p>
      </div>
    </div>
  </body>
</html>


    `,
    };

    await transporter.sendMail(mailOptions);
    console.info("=========EMAIL_SENT!==========");
    return "success";
  } catch (error) {
    const err = error as Error;
    console.error("REQUEST_VERIFICATION_ERROR: ", error);
    return err.message;
  }
}
