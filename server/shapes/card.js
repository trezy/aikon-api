// Module imports
const PropTypes = require('prop-types')





module.exports = {
  address_city: PropTypes.string,
  address_country: PropTypes.string,
  address_line1: PropTypes.string,
  address_line2: PropTypes.string,
  address_zip: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  address_state: PropTypes.string,
  exp_month: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  exp_year: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  name: PropTypes.string,
  number: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}
