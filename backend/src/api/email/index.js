const router = require("express").Router({ mergeParams: true });
const { knex } = require("../../services/pg");
const uuid = require("uuid");
const nodemailer = require("nodemailer");
const { checkToken } = require("../helpers/tokens");

const transporter = nodemailer.createTransport({
  host: process.env.NODEMAILER_HOST,
  port: process.env.NODEMAILER_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.NODEMAILER_USER, // Your email address
    pass: process.env.NODEMAILER_PASS, // Your email password
  },
});

const emailFrom = "andriesvladandrei@gmail.com";

router.post("/email/grade", async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!checkToken(token)) {
      throw new Error("Unauthorized");
    }
    let ok = true;
    let { emailsTo, ccEmail, studentName, grade, subjectName } = req.body;
    if (emailsTo[0] && !emailsTo[0].includes("389")) emailsTo = [];
    if (ccEmail && !ccEmail.includes("389")) {
      ccEmail = "";
      ok = false;
    }
    if (ok) {
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
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/email/absence", async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!checkToken(token)) {
      throw new Error("Unauthorized");
    }
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
