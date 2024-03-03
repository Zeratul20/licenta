const router = require("express").Router({ mergeParams: true });
const { knex } = require("../../services/pg");
const uuid = require("uuid");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "andriesvladandrei@gmail.com", // Your email address
    pass: "daez rsvd owdg obkb", // Your email password
  },
});

const emailFrom = "andriesvladandrei@gmail.com";

router.post("/email/grade", async (req, res, next) => {
  try {
    const { emailsTo, ccEmail, studentName, grade, subjectName } = req.body;
    const emailsString = emailsTo.join(", ");
    const html = `
        <div>
            <p> Buna ziua! </p>
            <p> 
                Va informam ca elevul <i>${studentName}</i> a primit nota <b>${grade}</b> la materia <i>${subjectName}</i>.
            </p>
            <br>
            <p>
                Va multumim!
                <br>
                <b>
                    Colegiul de Informatica
                </b>
            </p>
        </div>
    `;
    const mailOptions = {
      from: emailFrom,
      to: emailsString,
      cc: ccEmail,
      subject: `Nota ${studentName}`,
      html,
    };
    await transporter.sendMail(mailOptions);
    res.status(200).send("Email sent!");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/email/absence", async (req, res, next) => {
  try {
    const { emailsTo, ccEmail, studentName, date, subjectName } = req.body;
    const emailsString = emailsTo.join(", ");
    const html = `
        <div>
            <p> Buna ziua! </p>
            <p> 
                Va informam ca elevul <i>${studentName}</i> a absentat la disciplina <i>${subjectName}</i> pe data de ${date}<b>.
            </p>
            <br>
            <p>
                Va multumim!
                <br>
                <b>
                    Colegiul de Informatica
                </b>
            </p>
        </div>
    `;
    const mailOptions = {
      from: emailFrom,
      to: emailsString,
      cc: ccEmail,
      subject: `Absenta`,
      html,
    };
    await transporter.sendMail(mailOptions);
    res.status(200).send("Email sent!");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
