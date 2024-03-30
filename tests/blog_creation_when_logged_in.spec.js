const { test, expect, beforeEach, describe } = require('@playwright/test');

describe('When logged in', () => {
  beforeEach(async ({ page, request }) => {
    await page.goto('http://localhost:5173/login');
    await page.fill('input#username', 'your_username');
    await page.fill('input#password', 'your_password');
    await page.click('text=login');
    await page.waitForSelector('.success');
  });

  test('a new blog can be created', async ({ page }) => {
    await page.goto('http://localhost:5173/create');

    await page.fill('input#title', 'Test Blog Title');
    await page.fill('input#author', 'Test Author');
    await page.fill('input#url', 'http://testblog.com');
    await page.click('text=create');

    await page.waitForSelector('li.blog');

    const createdBlogTitle = await page.textContent('li.blog .title');
    expect(createdBlogTitle).toContain('Test Blog Title');
  });
});
