import {expect, test } from "@playwright/test";
import {USER_1_LOGIN, USER_1_REGISTER} from "./mockData/user";
import {STUDENT_1, STUDENT_1__FIRST_UPDATE} from "./mockData/students";
import {setupRoute} from "./tests-utils";

test.describe('New User Registration Flow', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/')
    })
    test('user registration workflow', async ({page}) => {
        const params = '?' + Object.entries(USER_1_REGISTER).map((a) => a.join('=')).join('&')
        await page.route('**/api/reading/user/register' + params, async route => {
            const json = {"success":"User registered!"};
            await route.fulfill({ json });
        });
        await setupRoute(page, '**/api/reading/user/login', USER_1_LOGIN)
        await setupRoute(page, '**/api/reading/student/register', [STUDENT_1])
        await setupRoute(page, '**/api/reading/student/update', [STUDENT_1__FIRST_UPDATE])

        await test.step('Register a new user', async () => {
            await page.goto('/register')
            await expect(page.locator('form')).toBeVisible()
            await page.getByPlaceholder('first name').fill(USER_1_REGISTER.firstName)
            await page.getByPlaceholder('last name').fill(USER_1_REGISTER.lastName)
            await page.getByPlaceholder('name@company.com').fill(USER_1_REGISTER.email)
            await page.getByPlaceholder('••••••••').fill(USER_1_REGISTER.password)
            await page
                .getByRole('button', { name: 'Register' })
                .click()
            await expect(page.locator('form')).not.toBeVisible()
            await expect(page.getByText('Registration Completed.')).toBeVisible()
        })
        await test.step('User Logs in for the first time', async () => {
            await page.getByRole('button', { name: 'Log in' }).click()
            await page
                .getByPlaceholder('name@company.com')
                .fill(USER_1_REGISTER.email)
            await page.getByPlaceholder('••••••••').fill(USER_1_REGISTER.password)
            await page
                .getByRole('button', { name: 'Login to your account' })
                .click()
            await expect(page).toHaveURL('/dashboard')

        })
        await test.step('Register a new student', async () => {
            await expect(
                page.getByRole('heading', { name: 'Dashboard' })
            ).toBeVisible()
            await expect(page.getByRole('main')).toBeEmpty()
            await page.getByRole('button', { name: 'Register Student' }).click()
            await expect(
                page.getByRole('heading', { name: 'Register a new student' })
            ).toBeVisible()
            await page
                .getByPlaceholder('first name')
                .fill(STUDENT_1.firstname)
            await page
                .getByPlaceholder('last name')
                .fill(STUDENT_1.lastname)
            await page
                .locator('input[name="dob"]')
                .fill(STUDENT_1.dob)

            await page.getByTestId('modal-test').getByRole('button', { name: 'Register Student' }).click()
            await expect(page.getByRole('main')).not.toBeEmpty()
        })
        await test.step('Select registered student', async () => {
            await expect(page.getByText(`${STUDENT_1.firstname} ${STUDENT_1.lastname}`)).toBeVisible()
            await page.getByTestId('select-student').click()
            await expect(page.getByTestId('change-student-button')).toBeVisible()
            await expect(page.getByText(`Student: ${STUDENT_1.firstname} ${STUDENT_1.lastname}`)).toBeVisible()
        })
        await test.step('Select a book for a student to read', async () => {
            await page.getByRole('link', { name: 'Books' }).click()
            await expect(
                page.getByRole('heading', { name: 'Books' })
            ).toBeVisible()
            await page
                .getByTestId('collection-list')
                .locator('div')
                .filter({ hasText: 'Books for testing (3)View Books' })
                .getByTestId('collection-button').click()
            await expect(page.getByText('Books for testing')).toBeVisible()
            await page.getByTestId('book-list-read').first().click()
            await expect(page.getByRole('heading', { name: 'Test book 1' })).toBeVisible()
        })
        await test.step('Student reads book to the end', async () => {
            await page.getByTestId('sentence-complete').first().click()
            await page.getByTestId('sentence-complete').first().click()
            await page.getByTestId('sentence-complete').first().click()
            await expect(page.getByRole('heading', { name: 'I read this book 1 times' })).toBeVisible()
            await expect(page.getByTestId('history-block').locator('div').filter({ hasText: '100% Completed' })).toBeVisible()
        })
    })

})
