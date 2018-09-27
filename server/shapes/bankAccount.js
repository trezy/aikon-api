// Module imports
const PropTypes = require('prop-types')





module.exports = {
  account_holder_name: PropTypes.string,
  account_holder_type: PropTypes.oneOf(['company', 'individual']),
  account_number: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  country: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  routing_number: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}
