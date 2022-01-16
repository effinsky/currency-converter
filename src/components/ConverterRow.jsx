import React from "react";

const ConverterRow = ({
    id,
    type,
    className,
    placeholder,
    stateParam,
    handleStateParamChange,
    tag,
}) => {
    return (
        <div className="form-control">
            <label htmlFor="currency-destination">{tag}</label>
            <input
                type={type}
                id={id}
                className={className}
                placeholder={placeholder}
                value={stateParam}
                onChange={handleStateParamChange}
            />
        </div>
    );
};

export default ConverterRow;
