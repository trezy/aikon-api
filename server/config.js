module.exports = {
  stripe: {
    secret: process.env.PAYAPI_STRIPE_SECRET,
  },
  twilio: {
    accountSID: process.env.PAYAPI_TWILIO_ACCOUNT_ID,
    authToken: process.env.PAYAPI_TWILIO_AUTH_TOKEN,
    from: process.env.PAYAPI_TWILIO_SENDING_NUMBER,
  },
}
