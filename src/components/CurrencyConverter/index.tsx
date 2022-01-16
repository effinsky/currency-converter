import React, {useEffect} from "react";
import axios from "axios";
import {formatCurrency, formatDate} from "../../utils/inputFormatters";
import {ConverterRow} from "../ConverterRow";
import ConversionResult from "../ConversionResult";
import {useCurrencyConverterReducer} from "./currencyConverterReducer";
import {ButtonControls} from "../ButtonControls";

export const CurrencyConverter = () => {
    const [
        {
            rowsInfo,
            conversionResult,
            formSubmitted,
            sourceCurrency,
            showClientValidationError,
            currencyDate,
            targetCurrency,
        },
        dispatch,
    ] = useCurrencyConverterReducer();

    useEffect(() => {
        if (formSubmitted) {
            getExchangeRate();
        }
    }, [formSubmitted]);

    const getExchangeRate = async () => {
        dispatch({type: "SET_SHOW_CLIENT_VALIDATION_ERROR", payload: false});

        try {
            const URL = `https://api.exchangerate.host/${currencyDate}?base=${sourceCurrency}&symbols=${targetCurrency}`;

            const {
                data: {rates},
            } = await axios.get(URL);
            const exchangeRate = rates[targetCurrency];

            // some forced error handling, since the API I moved to has hardly any error
            // handling of its own
            if (!exchangeRate) {
                throw new Error("API has no result. Check your inputs");
            }
            dispatch({type: "SET_CONVERSION_RESULT", payload: exchangeRate});
        } catch (err) {
            dispatch({
                type: "SET_CONVERSION_RESULT",
                payload: "Error unhandled by the API",
            });
        }
    };

    const handleSourceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist();
        dispatch({type: "SET_FORM_SUBMITTED", payload: false});
        const newSrc = formatCurrency(e.target.value);
        dispatch({type: "SET_SOURCE_CURRENCY", payload: newSrc});
    };

    const handleTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist();
        dispatch({type: "SET_FORM_SUBMITTED", payload: false});
        const newTgt = formatCurrency(e.target.value);
        dispatch({type: "SET_TARGET_CURRENCY", payload: newTgt});
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist();
        dispatch({type: "SET_FORM_SUBMITTED", payload: false});
        const newDate = formatDate(e.target.value);
        dispatch({type: "SET_CURRENCY_DATE", payload: newDate});
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (
            sourceCurrency.length < 3 ||
            targetCurrency.length < 3 ||
            currencyDate.length < 10
        ) {
            dispatch({type: "SET_SHOW_CLIENT_VALIDATION_ERROR", payload: true});
            return;
        }

        dispatch({type: "SET_FORM_SUBMITTED", payload: true});
    };

    const handleResetInputs = () => {
        dispatch({type: "SET_SOURCE_CURRENCY", payload: ""});
        dispatch({type: "SET_TARGET_CURRENCY", payload: ""});
        dispatch({type: "SET_CURRENCY_DATE", payload: ""});
        dispatch({type: "SET_SHOW_CLIENT_VALIDATION_ERROR", payload: false});
    };

    return (
        <>
            <h1 className="title">Currency Converter</h1>
            <form className="currency-form">
                <ConverterRow
                    stateParam={sourceCurrency}
                    handleStateParamChange={handleSourceChange}
                    {...rowsInfo[0]}
                />
                <ConverterRow
                    stateParam={targetCurrency}
                    handleStateParamChange={handleTargetChange}
                    {...rowsInfo[1]}
                />
                <ConverterRow
                    stateParam={currencyDate}
                    handleStateParamChange={handleDateChange}
                    {...rowsInfo[2]}
                />
                <ButtonControls
                    onSubmit={handleFormSubmit}
                    onResetInputs={handleResetInputs}
                />
            </form>
            <div className="conversion-result-control">
                <ConversionResult
                    showClientValidationError={showClientValidationError}
                    conversionResult={conversionResult}
                />
            </div>
        </>
    );
};
