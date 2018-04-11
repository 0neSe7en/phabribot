require('dotenv').config();
module.exports = {
  slack: {
    accessToken: process.env.SLACK_TOKEN,
    verificationToken: process.env.SLACK_VERIFICATION
  }
};
