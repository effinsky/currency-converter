import React, {useEffect, useState} from "react";
import axios from "axios";
import {formatCurrency, formatDate} from "../../inputFormatters";
import ConverterRow from "../ConverterRow";
import ConversionResult from "../ConversionResult";
import {initialRowsInfo} from "../../assets/data";
import {useCurrencyConverterReducer} from "./currencyConverterReducer";

const CurrencyConverter = () => {
    // move all local state to reducer
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
        setShowClientValidationError(false);

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
            setConversionResult(exchangeRate);
        } catch (err) {
            setConversionResult("Error unhandled by the API");
        }
    };

    const handleSourceChange = (e: any) => {
        e.persist();
        dispatch({type: "SET_FORM_SUBMITTED", payload: false});
        const newSrc = formatCurrency(e.target.value);
        dispatch({type: "SET_SOURCE_CURRENCY", payload: newSrc});
    };

    const handleTargetChange = (e: any) => {
        e.persist();
        setFormSubmitted(false);
        const newTrg = formatCurrency(e.target.value);
        setTargetCurrency(newTrg);
    };

    const handleDateChange = (e: any) => {
        e.persist();
        dispatch({type: "SET_FORM_SUBMITTED", payload: false});
        const newDate = formatDate(e.target.value);
        dispatch({type: "SET_CURRENCY_DATE", payload: newDate});
    };

    const handleFormSubmit = (e: any) => {
        e.preventDefault();
        // last-ditch frontend validation on all inputs
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
                {/* move to separate button section */}
                <section className="buttons">
                    <button
                        type="submit"
                        onClick={handleFormSubmit}
                        className="btn-primary btn-submit"
                    >
                        Find rate
                    </button>

                    <button
                        className="btn-primary btn-reset"
                        onClick={handleResetInputs}
                    >
                        Reset
                    </button>
                </section>
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

export default CurrencyConverter;
