import React, { useEffect, useRef, useState } from "react"
import axios from "axios"
import { validateCurrencyInput, validateDateInput } from "./inputValidators"

const CurrencyConverter = () => {
  const [sourceCurrency, setSourceCurrency] = useState("")
  const [targetCurrency, setTargetCurrency] = useState("")
  const [currencyDate, setCurrencyDate] = useState("")
  const [showError, setShowError] = useState(false)
  const [conversionResult, setConversionResult] = useState("")
  // control API call on initial render
  const loaded = useRef(false)

  const getExchangeRate = async () => {
    try {
      // found this endpoint in the test file
      const URL = `https://api.exchangeratesapi.io/${currencyDate}?base=${sourceCurrency}&symbols=${targetCurrency}`

      const { data } = await axios.get(URL)
      const exchangeRate = data.rates[targetCurrency]
      setShowError(false)
      setConversionResult(exchangeRate)
    } catch (err) {
      // dig up the error message from inside of the error response (console was
      // very unhelpful here)
      if (err.response.data.error) {
        setShowError(false)
        setConversionResult(err.response.data.error)
      }
    }
  }

  // use effect will run on initial render, but will then not call the API
  useEffect(() => {
    if (loaded.current) {
      getExchangeRate()
    } else {
      loaded.current = true
    }
  }, [setConversionResult])

  const handleSourceChange = e => {
    e.persist()
    const newSrc = validateCurrencyInput(e.target.value)
    setSourceCurrency(newSrc)
  }

  const handleTargetChange = e => {
    e.persist()
    const newTrg = validateCurrencyInput(e.target.value)
    setTargetCurrency(newTrg)
  }

  const handleDateChange = e => {
    e.persist()
    const newDate = validateDateInput(e.target.value)
    setCurrencyDate(newDate)
  }

  const handleFormSubmit = e => {
    e.preventDefault()

    if (
      sourceCurrency.length < 3 ||
      targetCurrency.length < 3 ||
      currencyDate.length < 10
    ) {
      setShowError(true)
      return
    }

    // send api request
    getExchangeRate()
  }

  const handleResetInputs = () => {
    setSourceCurrency("")
    setTargetCurrency("")
    setCurrencyDate("")
    setShowError(false)
  }

  return (
    <>
      <form className="currency-form">
        <div className="form-control">
          <label htmlFor="currency-source">Source symbol</label>
          <input
            type="text"
            id="currency-source"
            className="currency-source"
            placeholder="USD"
            value={sourceCurrency}
            onChange={handleSourceChange}
          />
        </div>
        <div className="form-control">
          <label htmlFor="currency-destination">Destination symbol</label>
          <input
            type="text"
            id="currency-destination"
            className="currency-destination"
            placeholder="EUR"
            value={targetCurrency}
            onChange={handleTargetChange}
          />
        </div>
        <div className="form-control">
          <label htmlFor="currency-date">Date</label>
          <input
            type="text"
            id="currency-date"
            className="currency-date"
            placeholder="YYYY-MM-DD"
            value={currencyDate}
            onChange={handleDateChange}
          />
        </div>
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
        {showError
          ? "Please complete each field"
          : conversionResult
          ? conversionResult
          : null}
      </div>
    </>
  )
}

export default CurrencyConverter
