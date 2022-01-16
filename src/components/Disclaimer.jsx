import React from "react";

const Disclaimer = () => {
    return (
        <div className="disclaimer-container">
            <h3 className="disclaimer-heading">Disclaimer</h3>
            <p>
                Migrated to{" "}
                <a
                    href="https://exchangerate.host/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    ExchangeRate.host
                </a>{" "}
                since the original API used became unreliable. Some
                incompatibility, especially as far as error display, may occur.
                The new API does not provide error messages at all. If you use
                known currency symbols such as EUR, USD, PLN etc. and a date no
                earlier than 1999, you will get a reliable result.
            </p>
            <p>
                Here is more on the problem with the original API:{" "}
                <a
                    href="https://github.com/exchangeratesapi/exchangeratesapi/issues/117"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Exchange Rates API trouble
                </a>
                . Seems like it caught clients of the API unprepared, with no
                prior warning from the API owners.
            </p>
        </div>
    );
};
export default Disclaimer;
