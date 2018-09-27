//Module imports
const PropTypes = require('prop-types')





module.exports = async function checkParameterTypes (propTypes, props, endpointName) {
  const errorLogger = console.error
  const errors = []

  console.error = error => errors.push(error)

  PropTypes.checkPropTypes(propTypes, props, 'parameter', endpointName)

  console.error = errorLogger

  return errors.length ? errors : null
}
