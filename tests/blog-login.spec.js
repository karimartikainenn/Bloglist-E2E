const { test, expect, beforeEach, describe } = require('@playwright/test');

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset');
    await request.post('http://localhost:3003/api/login', {
      data: {
        username: 'testaaja',
        password: 'testinen'
      }
    });
  });

  test('Login form is shown', async ({ page }) => {
    await page.goto('http://localhost:5173');
    await page.waitForSelector('form');
  });

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.fill('#username', 'testaaja');
      await page.fill('#password', 'testinen');
      await page.click('text=login');
      await page.waitForSelector('.success');
    });

    test('fails with wrong credentials', async ({ page }) => {
      await page.fill('#username', 'testaaja');
      await page.fill('#password', 'wrong'); 
      await page.click('text=login');
      await page.waitForSelector('.error');
      const error = await page.$('.error');
      expect(error).not.toBeNull();
    });
  });
});
