![image](https://github.com/user-attachments/assets/5838c294-a8f7-405b-b640-16c83b2abc25)


# Playwright + HCaptcha Example

This project is a simple example that demonstrates how to use [Playwright](https://playwright.dev/) in combination with the [2captcha-ts](https://www.npmjs.com/package/2captcha-ts) library to automatically solve hCaptcha challenges on a demo webpage.

## Features

- **Browser Automation:** Launch Chromium using Playwright in non-headless mode for visual debugging.
- **Captcha Solving:** Utilize the 2captcha service to solve hCaptcha challenges.
- **Form Submission:** Automatically insert the captcha solution into form fields and submit the form.
- **Result Verification:** Wait for a specific confirmation message on the page to ensure that the form was processed correctly.

## Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or higher is recommended)
- [npm](https://www.npmjs.com/)
- A valid **2captcha API Key**  
  Update the `API_KEY` constant in the script with your key.

## Installation

1. **Clone the repository (if applicable):**
   ```bash
   git clone https://github.com/clemmie24m/hcaptcha-playwright.git
   cd hcaptcha-playwright

2. Install dependencies:
    ```
    npm install playwright 2captcha-ts
    ```

## Configuration 

- **API Key**: Replace `"2captcha_api_key"` with your actual 2captcha API key in the script.
- **Site Key**: The `SITEKEY` constant is set to the hCaptcha site key required by the demo page.
- **Page UR**L: The `PAGE_URL` variable points to the demo page that contains an hCaptcha form.
- **Headless Mode**: Set the `HEADLESS` constant to `true` if you prefer running the browser in headless mode.

## Running the Example

Run the script using Node.js:
```
node index.js
```

The script will:
- Launch a Chromium browser.
- Open the demo page.
- Wait for the captcha form to load.
- Send the captcha challenge to 2captcha for solving.
- Inject the solution into the form fields.
- Submit the form and wait for a confirmation message to appear.

If successful, you will see a message in the console indicating that the captcha has been completed successfully.

## Code Overview

The main steps performed by the script include:
1. **Launching the Browser:**
   Using Playwright's `chromium.launch()` with a custom viewport size to mimic a real device.
2. **Navigating to the Target Page**:
   Opening the demo page URL and waiting for the captcha form to become visible.
3. **Captcha Solving**:
   Sending the challenge details (page URL and site key) to 2captcha via the 2captcha-ts library and retrieving the solution.
3. **Injecting the Captcha Response**:
   Using page.evaluate() to populate the necessary textareas with the solved captcha token.
3. **Form Submission and Verification**:
   Clicking the submit button and waiting for a specific `<h2>` element containing the confirmation message.

## License

This project is provided for educational purposes. Feel free to modify and use it in your own projects.
