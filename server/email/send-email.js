const sgMail = require("@sendgrid/mail");
const { weeklyEmailTemplate } = require("./weekly-email-template");
const { welcomeEmailTemplate } = require("./welcome-email-template");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * Given an array of mentions, fill out the weekly email template with the
 * information from the first 3 elements of the array of mentions. Produce a
 * filled-out email that's ready to send.
 *
 * @param {Object[]} topMentions
 * @returns {string} an HTML email in the form of a string.
 */
const createWeeklySummary = (topMentions) => "";

/**
 * Given an email address of a client, send the weekly summary email to that
 * address when the function executes. If there has been an error sending the
 * email, log that error to the console.
 *
 * @param {string} clientEmail - the email address of the client.
 * @returns {void}
 */
const sendWeeklySummary = async (clientEmail) => {
  try {
    const summary = createWeeklySummary();
    await sgMail.send({
      to: clientEmail,
      from: "report@mentionscrawler.com", // Use the email address or domain you verified above
      subject: "Welcome to Mentions Crawler",
      text: "Your top mentions of last week",
      html: weeklyEmailTemplate(summary),
    });
  } catch (error) {
    console.error(error);
    if (error.response) console.error(error.response.body);
  }
};

/**
 * Given the email address of a client, send them the "welcome email". If
 * there's been an error sending the email, log that error to the console.
 *
 * @param {string} clientEmail - the email address of the client.
 * @returns {void}
 */
const sendWelcomeEmail = async (clientEmail) => {
  try {
    await sgMail.send({
      to: clientEmail,
      from: "welcome@mentionscrawler.com",
      subject: "Your Weekly Report",
      text:
        "You're receiving this email because you signed-up with Mentions Crawler. If you didn't sign up, please let us know by responding to this email. No action is necessary.",
      html: welcomeEmailTemplate(clientEmail),
    });
  } catch (error) {
    console.error(error);
    if (error.response) console.error(error.response.body);
  }
};

module.exports = { sendWelcomeEmail, sendWeeklySummary };
