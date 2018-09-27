// Module imports
const PropTypes = require('prop-types')





// Component imports
const LegalEntityShape = require('./legalEntity')
const TOSAcceptanceShape = require('./tosAcceptance')





module.exports = {
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  ip: PropTypes.string.isRequired,
}
