# Currency Converter

## Overview

The **Currency Converter** is a web application that allows users to convert an amount from one currency to another. The app supports multiple currencies including **KES (Kenyan Shilling)**, **USD (US Dollar)**, **EUR (Euro)**, and **JPY (Japanese Yen)**. Users can input an amount in their desired currency, select the currencies for conversion, and view the result instantly.

The app includes validation to ensure users input valid values, and the interface adjusts dynamically based on user input.

## Features

- **Currency Conversion**: Convert between KES, USD, EUR, and JPY with real-time calculations.
- **Amount Validation**: The app validates the amount input by the user and highlights the input field if it's empty or invalid.
- **Dropdown Management**: Once a currency is selected from the "From Currency" dropdown, the "To Currency" dropdown is updated to ensure the same currency cannot be selected for both fields.
- **Clear Option**: Resets all fields and the result display to start a fresh conversion.

## How It Works

1. **Currency Conversion**: 
   - Users select the currency to convert from (`fromCurrency`) and the currency to convert to (`toCurrency`).
   - The user enters the amount they want to convert.
   - Once the **Convert** button is clicked, the app calculates the converted amount using predefined exchange rates and displays the result.
  
2. **Validation**: 
   - If the amount field is left empty, it will be highlighted in red to indicate an invalid input.
   - The app prevents selecting the same currency for both "From Currency" and "To Currency" by hiding the option in the "To Currency" dropdown.
  
3. **Clear Option**: 
   - When the **Clear** button is clicked, all input fields are cleared, and the result area is reset.

## Supported Currencies

- **KES (Kenyan Shilling)**
- **USD (US Dollar)**
- **EUR (Euro)**
- **JPY (Japanese Yen)**
