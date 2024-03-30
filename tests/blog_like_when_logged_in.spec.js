const { test, expect, beforeEach, describe } = require('@playwright/test');

describe('When logged in', () => {
  beforeEach(async ({ page, request }) => {
    await page.goto('http://localhost:5173/login');
    await page.fill('input#username', 'testi123');
    await page.fill('input#password', 'testinen123');
    await page.click('text=login');
    await page.waitForSelector('.success');
  });

  test('a blog can be liked', async ({ page }) => {
    await page.goto('http://localhost:5173/create');
    await page.fill('input#title', 'Test Blog Title');
    await page.fill('input#author', 'Test Author');
    await page.fill('input#url', 'http://testblog.com');
    await page.click('text=create');
    await page.waitForSelector('li.blog');

    await page.click('text=View');
    await page.click('text=Like');

    const likeCount = await page.textContent('.likeCount');
    expect(likeCount).toBe('1');
  });
});
