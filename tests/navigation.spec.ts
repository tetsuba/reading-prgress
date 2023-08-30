import {expect, test} from "@playwright/test";

test.describe('Navigation', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('/')
    })

    test.describe('Home', () => {
        test('Login button primary', async ({page}) => {
            await page
                .getByRole('main')
                .getByRole('button', {name: 'Log in'})
                .click()
            await expect(
                page.getByRole('heading', {name: 'Sign in to our platform'})
            ).toBeVisible()
        })
        test('Login button secondary', async ({page}) => {
            await page
                .getByRole('navigation')
                .getByRole('button', {name: 'Log in'})
                .click()
            await expect(
                page.getByRole('heading', {name: 'Sign in to our platform'})
            ).toBeVisible()
        })
        test('Register button primary', async ({page}) => {
            await page.getByRole('button', {name: 'Register'}).click()
            await expect(page).toHaveURL('/register')
            await expect(
                page.getByRole('heading', {name: 'Register'})
            ).toBeVisible()
        })
        test('Register button secondary', async ({page}) => {
            await page.getByRole('link', {name: 'Register'}).click()
            await expect(page).toHaveURL('/register')
            await expect(
                page.getByRole('heading', {name: 'Register'})
            ).toBeVisible()
        })
    })
})