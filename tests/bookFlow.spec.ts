import {expect, test } from "@playwright/test";
import {setupRoute} from "./tests-utils";
import {USER_1_AUTHORISED} from "./mockData/user";
import {STUDENT_1__FIRST_UPDATE, STUDENT_1__SECOND_UPDATE, STUDENT_1__THIRD_UPDATE} from "./mockData/students";


test.describe('Books', () => {
    test.use({storageState: './tests/mockData/localStorage.json'})


    test.beforeEach(async ({page}) => {
        await setupRoute(page, '**/api/reading/user', USER_1_AUTHORISED)
        await page.goto('/books')
    })

    async function nextSentence(page: any) {
        await page.getByTestId('sentence-complete').first().click()
    }

    test('A student completes a collection of books', async ({page}) => {
        await test.step('Select a collection', async () => {
            await page
                .getByTestId('collection-list')
                .locator('div')
                .filter({ hasText: 'Books for testing (3)View Books' })
                .getByTestId('collection-button').click()
            await expect(page.getByText('Books for testing')).toBeVisible()
        })
        await test.step('Student selects a book 1 and reads book to the end', async () => {
            await setupRoute(page, '**/api/reading/student/update', [STUDENT_1__FIRST_UPDATE])
            await page.getByTestId('book-list-read').first().click()
            await expect(page.getByRole('heading', { name: 'Test book 1' })).toBeVisible()
            await nextSentence(page)
            await nextSentence(page)
            await nextSentence(page)
            await expect(page.getByRole('heading', { name: 'I read this book 1 times' })).toBeVisible()
        })
        await test.step('Book 1 icon colour changed to green', async () => {
            await page.getByTestId('back-button').click()
            await expect(page.getByTestId('test-row-icon').first()).toHaveClass(/text-green-500/)
            await expect(page.getByTestId('test-row-icon').nth(1)).toHaveClass(/text-gray-300/)
            await expect(page.getByTestId('test-row-icon').last()).toHaveClass(/text-gray-300/)
        })
        await test.step('Student selects a book 2 and reads book to the end', async () => {
            await setupRoute(page, '**/api/reading/student/update', [STUDENT_1__SECOND_UPDATE])
            await page.getByTestId('book-list-read').nth(1).click()
            await expect(page.getByRole('heading', { name: 'Test book 2' })).toBeVisible()
            await nextSentence(page)
            await nextSentence(page)
            await nextSentence(page)
            await expect(page.getByRole('heading', { name: 'I read this book 1 times' })).toBeVisible()
        })
        await test.step('Book 2 icon colour changed to green', async () => {
            await page.getByTestId('back-button').click()
            await expect(page.getByTestId('test-row-icon').first()).toHaveClass(/text-green-500/)
            await expect(page.getByTestId('test-row-icon').nth(1)).toHaveClass(/text-green-500/)
            await expect(page.getByTestId('test-row-icon').last()).toHaveClass(/text-gray-300/)
        })
        await test.step('Student selects a book 3 and reads book to the end', async () => {
            await setupRoute(page, '**/api/reading/student/update', [STUDENT_1__THIRD_UPDATE])
            await page.getByTestId('book-list-read').last().click()
            await expect(page.getByRole('heading', { name: 'Test book 3' })).toBeVisible()
            await nextSentence(page)
            await nextSentence(page)
            await nextSentence(page)
            await expect(page.getByRole('heading', { name: 'I read this book 1 times' })).toBeVisible()
        })
        await test.step('Book 3 icon colour changed to green', async () => {
            await page.getByTestId('back-button').click()
            await expect(page.getByTestId('test-row-icon').first()).toHaveClass(/text-green-500/)
            await expect(page.getByTestId('test-row-icon').nth(1)).toHaveClass(/text-green-500/)
            await expect(page.getByTestId('test-row-icon').last()).toHaveClass(/text-green-500/)
        })

        await test.step('Collection icon updated', async () => {
            await page.getByTestId('back-button').click()
            await expect(page.getByText('Books for testing')).toBeVisible()
            await expect(page.getByTestId('test-row-icon').first()).toHaveClass(/text-green-500/)
        })

    })
    test('Selecting a book without selecting a student', async ({page}) => {
        await test.step('Unselect a student', async () => {
            await page.getByRole('link', { name: 'Dashboard' }).click()
            await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible()
            await page.getByTestId('change-student-button').click()
            await page.getByRole('link', { name: 'Books' }).click()
            await expect(page.getByRole('heading', { name: 'Books' })).toBeVisible()
        })
        await test.step('Selecting a book and receiving a message', async () => {
            await page.getByTestId('collection-button').first().click()
            await page.getByTestId('book-list-read').first().click()
            await expect(page.getByTestId('modal-test')).toBeVisible()
            await expect(page.getByRole('heading', { name: 'Please select a student' })).toBeVisible()
            await page.getByTestId('modal-message-button').click()
            await expect(page).toHaveURL('/dashboard')
        })
    })
})