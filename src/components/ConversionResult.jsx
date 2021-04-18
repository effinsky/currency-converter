import React from "react"

const ConversionResult = ({ showClientValidationError, conversionResult }) => {
  if (showClientValidationError) return <p>Please complete each field</p>
  if (conversionResult) return <p>{conversionResult}</p>
  return <p>{""}</p>
}

export default ConversionResult
