# JS Key Logger

## Overview

**JS Key Logger** is a web application that captures and displays detailed information about the keys pressed on the keyboard. It provides real-time data for various keys, including their **code**, **keycode**, and **location**. This app is designed for desktop and laptop devices, and it prevents default actions for specific keys such as **Tab**, **Meta**, **Alt**, and certain function keys (**F1**, **F3**, **F5**, **F6**, **F7**, **F10**). 

The primary purpose of this app is to give users insight into how keyboard events are processed by the browser. It is useful for developers or users who want to understand the underlying details of key events.

## Features

- **Displays Key Information**: When a key is pressed, the app shows its **key**, **code**, **keycode**, and **location**.
- **Prevents Default Behavior**: The app prevents default actions for specific keys such as **Tab**, **Meta**, **Alt**, and some function keys to avoid triggering unwanted actions.
- **Mobile-Friendly Block**: If the screen width is smaller than 1000px, the app will notify users that it's intended for desktop use only.
- **Dynamic Screen Size Handling**: The app dynamically checks the screen size and adjusts the content accordingly.
  
## How It Works

1. When a user presses a key, the app captures the event and extracts the key information.
2. The app then displays the key information in a structured format.
3. It prevents default behavior for selected keys (e.g., **Tab**, **Meta**, **Alt**, and some function keys).
4. If the screen width is less than 1000px, the app will show a message indicating it's intended for desktop devices only.
