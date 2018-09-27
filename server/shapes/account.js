// Module imports
const PropTypes = require('prop-types')





// Component imports
const BankAccountShape = require('./bankAccount')
const LegalEntityShape = require('./legalEntity')
const TOSAcceptanceShape = require('./tosAcceptance')





module.exports = {
  business_name: PropTypes.string,
  business_url: PropTypes.string,
  email: PropTypes.string,
  external_account: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.exact(BankAccountShape),
  ]),
  legal_entity: PropTypes.exact(LegalEntityShape),
  support_email: PropTypes.string,
  support_phone: PropTypes.string,
  support_url: PropTypes.string,
  tos_acceptance: PropTypes.exact(TOSAcceptanceShape),
}
