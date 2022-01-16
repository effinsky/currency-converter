export const formatCurrency = (currency: string) =>
    currency
        .replace(/[^a-zA-Z]/, "")
        .substring(0, 3)
        .toUpperCase();

export const formatDate = (date: string) =>
    date.replace(/[^0-9-]/, "").substring(0, 10);
