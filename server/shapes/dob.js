// Module imports
const PropTypes = require('prop-types')





module.exports = {
  day: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  month: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
}
