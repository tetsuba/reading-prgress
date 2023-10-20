import {expect, test } from "@playwright/test";
import {setupRoute} from "./tests-utils";
import {USER_1_AUTHORISED} from "./mockData/user";


test.describe('Books', () => {
    test.use({storageState: './tests/mockData/localStorage.json'})
    test.beforeEach(async ({page}) => {
        await setupRoute(page, '**/api/reading/user', USER_1_AUTHORISED)
        await page.goto('/books')
    })

    test('A student reads and completes a book', async ({page}) => {
        await expect(
            page.getByRole('heading', { name: 'Books' })
        ).toBeVisible()
    })
})