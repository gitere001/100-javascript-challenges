const convertBtn = document.querySelector(".buttons button:first-child");
const clearBtn = document.querySelector(".buttons button:last-child");
const fromCurrencyElement = document.querySelector("#from-currency");
const toCurrencyElement = document.querySelector("#to-currency");
const amountElement = document.querySelector("input");
const resultElement = document.querySelector(".result");
const amountBorder = document.querySelector(".input input");
const amountSmall = document.querySelector(".input small");

const fromBOrder = document.querySelector(".select-from select");
const fromSmall = document.querySelector(".select-from small");

const toBOrder = document.querySelector(".select-to select");
const toSmall = document.querySelector(".select-to small");

/**
 * Converts an amount of currency from one unit to another.
 *
 * @param {string} fromCurrency - The currency to convert from. One of 'kes', 'usd', 'eur', or 'jpy'.
 * @param {string} toCurrency - The currency to convert to. One of 'kes', 'usd', 'eur', or 'jpy'.
 * @param {number} amount - The amount to convert.
 * @returns {string} The converted amount, formatted as a string with the appropriate currency symbol.
 */
function convertCurrency(fromCurrency, toCurrency, amount) {
  const conversions = {
    "kes-usd": `$ ${(amount / 129.01).toFixed(2)}`,
    "kes-eur": `€ ${(amount / 138.0).toFixed(2)}`,
    "kes-jpy": `¥ ${(amount / 12.0).toFixed(2)}`,
    "usd-kes": `Ksh ${(amount * 129.01).toFixed(2)}`,
    "usd-eur": `€ ${(amount * 0.85).toFixed(2)}`,
    "usd-jpy": `¥ ${(amount * 111.0).toFixed(2)}`,
    "eur-kes": `Ksh ${(amount * 138.0).toFixed(2)}`,
    "eur-usd": `$ ${(amount * 1.15).toFixed(2)}`,
    "eur-jpy": `¥ ${(amount * 130.0).toFixed(2)}`,
    "jpy-kes": `Ksh ${(amount * 12.0).toFixed(2)}`,
    "jpy-usd": `$ ${(amount / 111.0).toFixed(2)}`,
    "jpy-eur": `€ ${(amount / 130.0).toFixed(2)}`,
  };

  const conversionKey = `${fromCurrency}-${toCurrency}`;
  return conversions[conversionKey] || "";
}

/**
 * Displays the converted currency result on the webpage.
 *
 * @param {Event} event - The event object from the form submission.
 * Prevents the default form submission behavior.
 * Retrieves and validates the input values for amount, fromCurrency, and toCurrency.
 * Converts the currency if a valid amount is provided and updates the result display.
 */

function displayResult(event) {
  event.preventDefault();

  const amount = parseFloat(amountElement.value.trim());
  const fromCurrency = fromCurrencyElement.value.trim();
  const toCurrency = toCurrencyElement.value.trim();
  if (!amount) {
    amountBorder.style.border = "1px solid red";
    amountSmall.style.display = "block";
  } else {
    amountBorder.style.border = "";
    amountSmall.style.display = "none";
  }

  if (!fromCurrency) {
    fromBOrder.style.border = "1px solid red";
    fromSmall.style.display = "block";
  } else {
    fromBOrder.style.border = "";
    fromSmall.style.display = "none";
  }

  if (!toCurrency) {
    toBOrder.style.border = "1px solid red";
    toSmall.style.display = "block";
  } else {
    toBOrder.style.border = "";
    toSmall.style.display = "none";
  }

  const result = amount
    ? convertCurrency(fromCurrency, toCurrency, amount)
    : "";
  resultElement.textContent = result;
}

/**
 * Handles a change in the fromCurrency dropdown.
 *
 * Resets the toCurrency dropdown and prevents the user from selecting
 *  the same currency for both fromCurrency and toCurrency.
 */

function clearAll(event) {
  event.preventDefault();
  fromCurrencyElement.value = "";
  toCurrencyElement.value = "";
  amountElement.value = "";
  resultElement.textContent = "";
  amountBorder.style.border = "";
  fromBOrder.style.border = "";
  toBOrder.style.border = "";
  amountSmall.style.display = "none";
  fromSmall.style.display = "none";
  toSmall.style.display = "none";

}
function handleFromCurrencyChange() {
  toCurrencyElement.value = "";
  const fromCurrency = fromCurrencyElement.value.trim();

  const previouslyHiddenOption = document.querySelector(
    "#to-currency .hidden-option"
  );
  if (previouslyHiddenOption) {
    previouslyHiddenOption.style.display = "";
    previouslyHiddenOption.classList.remove("hidden-option");
  }

  const similarTo = document.querySelector(`#to-currency .${fromCurrency}`);
  if (similarTo) {
    similarTo.style.display = "none";
    similarTo.classList.add("hidden-option");
  }
}

convertBtn.addEventListener("click", displayResult);
fromCurrencyElement.addEventListener("change", handleFromCurrencyChange);
clearBtn.addEventListener("click", clearAll);
