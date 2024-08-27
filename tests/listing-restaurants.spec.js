import {test, expect} from '@playwright/test';

test.describe('Listing Restaurants', () => {
  test('shows restaurants from the server', async ({page}) => {
    const sushiPlace = 'Sushi Place';
    const pizzaPlace = 'Pizza Place';

    const mockData = [
      {id: 1, name: sushiPlace},
      {id: 2, name: pizzaPlace},
    ];

    await page.route('https://api.outsidein.dev/*/restaurants', route =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockData),
      }),
    );

    await page.goto('http://localhost:3000');

    await expect(page.getByText(sushiPlace)).toBeVisible();
    await expect(page.getByText(pizzaPlace)).toBeVisible();
  });
});
