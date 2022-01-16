import {useReducer} from "react";
import {initialRowsInfo} from "../../assets/data";

export type ConverterAction =
    | {type: "SET_SOURCE_CURRENCY"; payload: string}
    | {type: "SET_TARGET_CURRENCY"; payload: string}
    | {type: "SET_CURRENCY_DATE"; payload: string}
    | {type: "SET_SHOW_CLIENT_VALIDATION_ERROR"; payload: boolean}
    | {type: "SET_CONVERSION_RESULT"; payload: string}
    | {type: "SET_FORM_SUBMITTED"; payload: boolean};

interface State {
    rowsInfo: RowInfo[];
    sourceCurrency: string;
    targetCurrency: string;
    currencyDate: string;
    showClientValidationError: boolean;
    conversionResult: string;
    formSubmitted: boolean;
}

interface RowInfo {
    id: string;
    className: string;
    placeholder: string;
    tag: string;
    type: string;
}

const initState: State = {
    rowsInfo: initialRowsInfo,
    sourceCurrency: "",
    targetCurrency: "",
    currencyDate: "",
    conversionResult: "",
    showClientValidationError: false,
    formSubmitted: false,
};

const reducer = (state: State, action: ConverterAction) => {
    switch (action.type) {
        case "SET_SOURCE_CURRENCY": {
            return {...state, sourceCurrency: action.payload};
        }
        case "SET_TARGET_CURRENCY": {
            return {...state, targetCurrency: action.payload};
        }
        case "SET_CURRENCY_DATE": {
            return {...state, currencyDate: action.payload};
        }
        case "SET_SHOW_CLIENT_VALIDATION_ERROR": {
            return {...state, showClientValidationError: action.payload};
        }
        case "SET_FORM_SUBMITTED": {
            return {...state, showClientValidationError: action.payload};
        }
        default: {
            return state;
        }
    }
};

export const useCurrencyConverterReducer = () => useReducer(reducer, initState);
