import React from "react";
interface ConversionResultProps {
    showClientValidationError: boolean;
    conversionResult: string;
}

const ConversionResult = ({
    showClientValidationError,
    conversionResult,
}: ConversionResultProps) => {
    if (showClientValidationError) return <p>Please complete each field</p>;
    if (conversionResult) return <p>{conversionResult}</p>;
    return <p>{""}</p>;
};

export default ConversionResult;
