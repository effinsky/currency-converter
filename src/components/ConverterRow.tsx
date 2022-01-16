import React from "react";

interface ConverterRowProps {
    id: string;
    type: string;
    className: string;
    placeholder: string;
    stateParam: string;
    handleStateParamChange: React.EventHandler<React.ChangeEvent>;
    tag: string;
}

export const ConverterRow = ({
    id,
    type,
    className,
    placeholder,
    stateParam,
    handleStateParamChange,
    tag,
}: ConverterRowProps) => {
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
