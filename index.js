import { chromium } from "playwright";
import { Solver } from "2captcha-ts";

const API_KEY = "2captcha_api_key"; // Ваш API ключ 2captcha
const SITEKEY = "338af34c-7bcb-4c7c-900b-acbec73d7d43";
const PAGE_URL = "https://democaptcha.com/demo-form-eng/hcaptcha.html";
const HEADLESS = false;
const solver = new Solver(API_KEY);

(async () => {
  // Запуск браузера Chromium с нужными настройками (режим видимого окна)
  const browser = await chromium.launch({ headless: HEADLESS });
  
  // Создание нового контекста с заданными размерами окна
  const context = await browser.newContext({
    viewport: { width: 1080, height: 1024 }
  });
  const page = await context.newPage();

  // Открытие целевой страницы
  await page.goto(PAGE_URL);

  // Ожидание загрузки формы с капчей
  await page.waitForSelector("form.recaptcha_demo_form");

  // Отправляем капчу в сервис 2captcha для решения
  const res = await solver.hcaptcha({
    pageurl: PAGE_URL,
    sitekey: SITEKEY,
  });
  console.log(res);

  // Получаем решение капчи
  const captchaAnswer = res.data;

  // Вставляем решение капчи в необходимые поля на странице
  await page.evaluate((captchaAnswer) => {
    document.querySelector("textarea[name='h-captcha-response']").value = captchaAnswer;
    document.querySelector("textarea[name='g-recaptcha-response']").value = captchaAnswer;
  }, captchaAnswer);

  // Нажимаем кнопку отправки формы
  await page.click('input[type="submit"]');

  // Ждем, пока появится элемент <h2> с нужным текстом (или до 30 секунд)
  await page.waitForFunction(() => {
    const h2 = document.querySelector('h2');
    return h2 && h2.textContent.trim() === 'Thank you, your message "" was posted!';
  }, null, { timeout: 30000 });

  console.log("The captcha has been successfully completed!");

  await browser.close();
})();
