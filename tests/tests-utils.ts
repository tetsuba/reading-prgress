import {Page} from "@playwright/test";

export async function setupRoute<T>(page: Page, path: string, json: T) {
    await page.route(path, async route => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(json)
        });
    });
}

export async function setupRouteError<T>(page: Page, path: string, json: T) {
    await page.route(path, async route => {
        await route.fulfill({
            status: 500,
            contentType: 'application/json',
            body: JSON.stringify(json)
        });
    });
}

export async function clickOnViewBooks(page: Page, text: string) {
    await page
        .getByTestId('collection-list')
        .locator('div')
        .filter({ hasText: text })
        .getByTestId('collection-button')
        .click()
}