const { test, expect, beforeEach, describe } = require('@playwright/test');

describe('When logged in', () => {
  beforeEach(async ({ page, request }) => {
    await page.goto('http://localhost:5173/login');
    await page.fill('input#username', 'testi123');
    await page.fill('input#password', 'testinen123');
    await page.click('text=login');
    await page.waitForSelector('.success');
  });

  test('blogs are sorted by number of likes', async ({ page }) => {
    await createBlog(page, 'Blog with 5 likes', 5);
    await createBlog(page, 'Blog with 3 likes', 3);
    await createBlog(page, 'Blog with 8 likes', 8);

    await page.goto('http://localhost:5173/');

    const blogItems = await page.$$('li.blog');
    const blogLikes = await Promise.all(blogItems.map(async (blog) => {
      const likeCountElement = await blog.$('.likeCount');
      return parseInt(await likeCountElement.textContent(), 10);
    }));

    expect(blogLikes).toEqual(blogLikes.sort((a, b) => b - a));
  });
});

async function createBlog(page, title, likes) {
  await page.goto('http://localhost:5173/create');
  await page.fill('input#title', title);
  await page.fill('input#author', 'Test Author');
  await page.fill('input#url', 'http://testblog.com');
  await page.click('text=create');

  for (let i = 0; i < likes; i++) {
    await page.click('text=Like');
  }
}
