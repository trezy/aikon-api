// Module imports
const PropTypes = require('prop-types')





module.exports = {
  city: PropTypes.string,
  country: PropTypes.string,
  line1: PropTypes.string,
  line2: PropTypes.string,
  postal_code: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  state: PropTypes.string,
}
