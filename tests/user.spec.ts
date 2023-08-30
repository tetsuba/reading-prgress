import { test, expect } from '@playwright/test'
import {setupRoute, setupRouteError} from "./tests-utils";
import {userDetailsLogin, userLoginError} from "./mockData/user";
import {dashboardEmptyData} from "./mockData/dashboard";

test.describe('User', () => {
    test.describe('Login', () => {
        test.beforeEach(async ({ page }) => {
            await page.goto('/')
        })
        test('SUCCESS', async ({ page }) => {
            await setupRoute(page, 'http://localhost:3001/api/reading/user/login', userDetailsLogin)
            await setupRoute(page, 'http://localhost:3001/api/reading/tracker/words?userId=7', dashboardEmptyData)

            await test.step('Open login window', async () => {
                await page
                    .getByRole('main')
                    .getByRole('button', { name: 'Log in' })
                    .click()
            })
            await test.step('Input user credentials', async () => {
                await page
                    .getByPlaceholder('name@company.com')
                    .fill('bob@bob.com')
                await page.getByPlaceholder('••••••••').fill('123456')
                await page
                    .getByRole('button', { name: 'Login to your account' })
                    .click()
            })
            await test.step('redirect to dashboard', async () => {
                await expect(page).toHaveURL('http://localhost:5173/dashboard')
                await expect(
                    page.getByRole('heading', { name: 'Dashboard' })
                ).toBeVisible()
            })
        })
        test('ERROR: incorrect username', async ({ page }) => {
            await setupRouteError(page, 'http://localhost:3001/api/reading/user/login', userLoginError)
            await test.step('Open login window', async () => {
                await page
                    .getByRole('main')
                    .getByRole('button', { name: 'Log in' })
                    .click()
            })
            await test.step('Input incorrect user credentials', async () => {
                await page
                    .getByPlaceholder('name@company.com')
                    .fill('bob@44.com')
                await page.getByPlaceholder('••••••••').fill('123456')
                await page
                    .getByRole('button', { name: 'Login to your account' })
                    .click()
            })
            await test.step('show error', async () => {
                await expect(
                    page.getByTestId('error-message')
                ).toBeVisible()
                await expect(page.getByTestId('error-message')).toHaveText(
                    'Incorrect username or password'
                )
            })
        })
        test('ERROR: incorrect password', async ({ page }) => {
            await setupRouteError(page, 'http://localhost:3001/api/reading/user/login', userLoginError)
            await test.step('Open login window', async () => {
                await page
                    .getByRole('main')
                    .getByRole('button', { name: 'Log in' })
                    .click()
            })
            await test.step('Input incorrect user credentials', async () => {
                await page
                    .getByPlaceholder('name@company.com')
                    .fill('bob@bob.com')
                await page.getByPlaceholder('••••••••').fill('abcded')
                await page
                    .getByRole('button', { name: 'Login to your account' })
                    .click()
            })
            await test.step('show error', async () => {
                await expect(
                    page.getByTestId('error-message')
                ).toBeVisible()
                await expect(page.getByTestId('error-message')).toHaveText(
                    'Incorrect username or password'
                )
            })
        })
    })

    test.describe('Register', () => {
        test.beforeEach(async ({page}) => {

        })

        test('SUCCESS', async ({page}) => {
            await page.route('http://localhost:3001/api/reading/user/register?firstName=bob&lastName=bob&email=bob@bob.com&password=123456', async route => {
                const json = {"success":"User registered!"};
                await route.fulfill({ json });
            });
            await page.goto('/register')
            await expect(page.locator('form')).toBeVisible()

            await test.step('fill form', async () => {
                await page.getByPlaceholder('first name').fill('bob')
                await page.getByPlaceholder('last name').fill('bob')
                await page.getByPlaceholder('name@company.com').fill('bob@bob.com')
                await page.getByPlaceholder('••••••••').fill('123456')
                await page
                    .getByRole('button', { name: 'Register' })
                    .click()
            })

            await expect(page.locator('form')).not.toBeVisible()
            await expect(page.getByText('Registration Completed.')).toBeVisible()
        })
        test('ERROR: by submitting an empty form', async ({page}) => {
            await page.route('http://localhost:3001/api/reading/user/register?**', async route => {
                const json = {
                    "message": "Bad request",
                    "stack": "data/email must match format \"email\", data/firstName First letter must be a character, data/lastName First letter must be a character",
                    "status": 400,
                    "success": false
                };
                await route.fulfill({
                    status: 400,
                    contentType: 'application/json',
                    body: JSON.stringify(json)
                });
            });
            await page.goto('/register')
            await test.step('fill form with empty string', async () => {
                await page.getByPlaceholder('first name').fill('')
                await page.getByPlaceholder('last name').fill('')
                await page.getByPlaceholder('name@company.com').fill('')
                await page.getByPlaceholder('••••••••').fill('')
                await page
                    .getByRole('button', { name: 'Register' })
                    .click()
            })
            await expect(page.getByTestId('error-message')).toHaveText(
                'data/email must match format "email", data/firstName First letter must be a character, data/lastName First letter must be a character'
            )
        })
        test('ERROR: by submitting an incorrect email format', async ({page}) => {
            await page.route('http://localhost:3001/api/reading/user/register?**', async route => {
                const json = {
                    "message": "Bad request",
                    "stack": "SQLITE_CONSTRAINT: UNIQUE constraint failed: user.email",
                    "status": 400,
                    "success": false
                };
                await route.fulfill({
                    status: 400,
                    contentType: 'application/json',
                    body: JSON.stringify(json)
                });
            });
            await page.goto('/register')
            await test.step('fill form with empty string', async () => {
                await page.getByPlaceholder('first name').fill('Bob')
                await page.getByPlaceholder('last name').fill('Bob')
                await page.getByPlaceholder('name@company.com').fill('bob@bob.com')
                await page.getByPlaceholder('••••••••').fill('123456')
                await page
                    .getByRole('button', { name: 'Register' })
                    .click()
            })
            await expect(page.getByTestId('error-message')).toHaveText(
                'SQLITE_CONSTRAINT: UNIQUE constraint failed: user.email'
            )
        })
    })
})
