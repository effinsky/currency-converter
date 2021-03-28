import React from "react"

const ConverterRow = ({
  id,
  type,
  className,
  placeHolder,
  stateParam,
  handleStateParamChange, 
  tag
}) => {
  return (
    <div className="form-control">
      <label htmlFor="currency-destination">{tag}</label>
      <input
        type={type}
        id={id}
        className={className}
        placeholder={placeHolder}
        value={stateParam}
        onChange={handleStateParamChange}
      />
    </div>
  )
}

export default ConverterRow
