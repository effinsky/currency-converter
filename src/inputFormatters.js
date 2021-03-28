export function formatCurrency(currency) {
  return currency
    .replace(/[^a-zA-Z]/, "")
    .substring(0, 3)
    .toUpperCase()
}

export function formatDate(date) {
  return date.replace(/[^0-9-]/, "").substring(0, 10)
}