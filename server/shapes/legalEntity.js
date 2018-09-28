// Module imports
const PropTypes = require('prop-types')





// Component imports
const AddressShape = require('./address')
const DOBShape = require('./dob')





module.exports = {
  address: PropTypes.exact(AddressShape),
  business_name: PropTypes.string,
  business_tax_id: PropTypes.string,
  business_vat_id: PropTypes.string,
  dob: PropTypes.exact(DOBShape),
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  maiden_name: PropTypes.string,
  personal_address: PropTypes.exact(AddressShape),
  ssn_last_4: PropTypes.string,
  type: PropTypes.oneOf(['company', 'individual']),
}
