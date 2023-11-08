import {expect, test} from "@playwright/test";


test.describe('Accessibility', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('/')
    })
    test.skip('Login modal tabbing from start to end', async ({page}) => {

        await test.step('Open login window', async () => {
            await page
                .getByRole('main')
                .getByRole('button', { name: 'Log in' })
                .click()
            await expect(
                page.getByRole('heading', {name: 'Sign in to our platform'})
            ).toBeVisible()
        })

        // TODO: Investigate why it is not tabbing to the end of the login modal
        await test.step('Tab to the end of the login modal', async () => {
            await page.keyboard.press('Tab');
            await page.keyboard.press('Tab');
            await page.keyboard.press('Tab');
            await expect(page.locator('#email')).toBeFocused();

        })
    })
})