import React from "react";
import { CurrencyConverter } from "./components/CurrencyConverter";
import {Disclaimer} from "./components/Disclaimer";

export default function App() {
    return (
        <>
            <CurrencyConverter />
            <Disclaimer />
        </>
    );
}
