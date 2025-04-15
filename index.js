import { chromium } from "playwright";
import { Solver } from "2captcha-ts";

const API_KEY = "2captcha_api_key"; // Your 2captcha API key
const SITEKEY = "338af34c-7bcb-4c7c-900b-acbec73d7d43";
const PAGE_URL = "https://democaptcha.com/demo-form-eng/hcaptcha.html";
const HEADLESS = false; // Set to false to run browser with UI
const solver = new Solver(API_KEY);

(async () => {
  // Launch the Chromium browser with a visible window (headless mode off)
  const browser = await chromium.launch({ headless: HEADLESS });

  // Create a new browser context with the specified viewport size
  const context = await browser.newContext({
    viewport: { width: 1080, height: 1024 }
  });
  const page = await context.newPage();

  // Navigate to the target page
  await page.goto(PAGE_URL);

  // Wait for the captcha form to load on the page
  await page.waitForSelector("form.recaptcha_demo_form");

  // Send the captcha challenge to 2captcha for solving
  const res = await solver.hcaptcha({
    pageurl: PAGE_URL,
    sitekey: SITEKEY,
  });
  console.log(res);

  // Retrieve the captcha solution from the response
  const captchaAnswer = res.data;

  // Set the captcha solution in the required textareas on the page
  await page.evaluate((captchaAnswer) => {
    document.querySelector("textarea[name='h-captcha-response']").value = captchaAnswer;
    document.querySelector("textarea[name='g-recaptcha-response']").value = captchaAnswer;
  }, captchaAnswer);

  // Click the submit button to verify the captcha response
  await page.click('input[type="submit"]');

  // Wait until an <h2> element with the desired success text appears (up to 30 seconds)
  await page.waitForFunction(() => {
    const h2 = document.querySelector('h2');
    return h2 && h2.textContent.trim() === 'Thank you, your message "" was posted!';
  }, null, { timeout: 30000 });

  console.log("The captcha has been successfully completed!");

  // Close the browser after finishing
  await browser.close();
})();
