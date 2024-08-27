import {test, expect} from '@playwright/test';

test.describe('Creating a Restaurant', () => {
  test('allows adding restaurants', async ({page}) => {
    const restaurantId = 27;
    const restaurantName = 'Sushi Place';

    // intercept http request
    await page.route('https://api.outsidein.dev/*/restaurants', async route => {
      if (route.request().method() === 'POST') {
        const postData = route.request().postDataJSON();

        await expect(postData).toHaveProperty('name', restaurantName);

        return route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            id: restaurantId,
            name: restaurantName,
          }),
        });
      } else if (route.request().method() === 'GET') {
        return route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify([]),
        });
      }
    });

    await page.goto('http://localhost:3000');
    await page.locator('[placeholder="Add Restaurant"]').fill(restaurantName);
    await page.getByText('Add').click();

    await expect(page.getByText(restaurantName)).toBeVisible();
  });
});
