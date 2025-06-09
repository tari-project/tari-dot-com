export const formatNumberWithCommas = (value: string | number | null | undefined): string => {
    if (value === null || value === undefined) {
        return '';
    }

    const stringValue = String(value);

    // If the input is just a decimal point, return it as is to allow typing "0."
    if (stringValue === '.') {
        return '.';
    }

    const [integerPart, decimalPart] = stringValue.split('.');

    // Format the integer part with commas
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // Reconstruct the number with the decimal part if it exists
    if (decimalPart !== undefined) {
        return `${formattedIntegerPart}.${decimalPart}`;
    }

    return formattedIntegerPart;
};

export const cleanFormattedNumber = (value: string | null | undefined): string => {
    if (value === null || value === undefined) {
        return '';
    }
    return value.replace(/,/g, '');
};
