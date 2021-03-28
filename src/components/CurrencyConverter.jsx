import React, { useEffect, useState } from "react"
import axios from "axios"
import { formatCurrency, formatDate } from "../inputFormatters"
import ConverterRow from "./ConverterRow"

const initialRowsInfo = [
  {
    id: "currency-source",
    className: "currency-source",
    placeHolder: "USD",
    tag: "Source symbol",
    type: "text"
  },
  {
    id: "currency-destination",
    className: "currency-destination",
    placeHolder: "EUR",
    tag: "Destination symbol",
    type: "text"
  },
  {
    id: "currency-date",
    className: "currency-date",
    placeHolder: "YYYY-MM-DD",
    tag: "Date",
    type: "text"
  }
]

const CurrencyConverter = () => {
  const [rowsInfo] = useState(initialRowsInfo)
  const [sourceCurrency, setSourceCurrency] = useState("")
  const [targetCurrency, setTargetCurrency] = useState("")
  const [currencyDate, setCurrencyDate] = useState("")
  const [showClientValidationError, setShowClientValidationError] = useState(
    false
  )
  const [conversionResult, setConversionResult] = useState("")
  // call API only if form submitted
  const [formSubmitted, setFormSubmitted] = useState(false)

  const getExchangeRate = async () => {
    setShowClientValidationError(false)

    try {
      // found this endpoint in the test file
      const URL = `https://api.exchangeratesapi.io/${currencyDate}?base=${sourceCurrency}&symbols=${targetCurrency}`

      const {
        data: { rates }
      } = await axios.get(URL)
      const exchangeRate = rates[targetCurrency]
      setConversionResult(exchangeRate)
    } catch (err) {
        setConversionResult(err.response.data.error)
    }
  }

  useEffect(() => {
    if (formSubmitted) {
      getExchangeRate()
    }
  }, [formSubmitted])

  const handleSourceChange = e => {
    e.persist()
    setFormSubmitted(false)
    const newSrc = formatCurrency(e.target.value)
    setSourceCurrency(newSrc)
  }

  const handleTargetChange = e => {
    e.persist()
    setFormSubmitted(false)
    const newTrg = formatCurrency(e.target.value)
    setTargetCurrency(newTrg)
  }

  const handleDateChange = e => {
    e.persist()
    setFormSubmitted(false)
    const newDate = formatDate(e.target.value)
    setCurrencyDate(newDate)
  }

  const handleFormSubmit = e => {
    e.preventDefault()
    // last-ditch frontend validation on all inputs
    if (
      sourceCurrency.length < 3 ||
      targetCurrency.length < 3 ||
      currencyDate.length < 10
    ) {
      setShowClientValidationError(true)
      return
    }

    setFormSubmitted(true)
  }

  const handleResetInputs = () => {
    setSourceCurrency("")
    setTargetCurrency("")
    setCurrencyDate("")
    setShowClientValidationError(false)
  }

  return (
    <>
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
        <div className="buttons">
          <button
            type="submit"
            onClick={handleFormSubmit}
            className="btn-primary">
            Find rate
          </button>

          <button className="btn-primary" onClick={handleResetInputs}>
            Reset
          </button>
        </div>
      </form>
      <div className="conversion-result">
        {showClientValidationError
          ? "Please complete each field"
          : conversionResult
          ? conversionResult
          : null}
      </div>
    </>
  )
}

export default CurrencyConverter
