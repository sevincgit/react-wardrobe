const { test, expect } = require('@playwright/test');

test('display a sign up page for a not logged in user', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await expect(page).toHaveTitle('React App');

  //check url
  // do sign up. A new username is required!
  await page.getByLabel('username').fill('testName10');
  await page.getByLabel('email').fill('test@mail.com');
  await page.getByLabel('password').fill('ABCabc123!');

  await page.locator('button', { type: /submit/i }).click();

  // check created
  await expect(page.locator('.signup_message')).toHaveText('Account created successfully');
  // Find the link to the login page
  await expect(page.locator('.login')).toHaveText('Login');
  const loginLink = page.getByRole('link', { name: 'Login' });

  // click the link
  await loginLink.click();
  await expect(page).toHaveURL(/.*login/);
  // Do the steps of the login
  await page.getByLabel('username').fill('testName07');
  await page.getByLabel('password').fill('ABCabc123!');

  await page.locator('button', { type: /submit/i }).click();
  await expect(page.locator('.login_message')).toHaveText('You are logged in!');
  // Find the link to the main page
  const mainPageLink = page.getByRole('link', { name: 'My Wardrobe' });

  // click the link
  await mainPageLink.click();

  //Check the content of the main page (see some text)
  await expect(page).toHaveURL('/');
  await expect(page.locator('h3')).toHaveText('Select an outfit!');
});
