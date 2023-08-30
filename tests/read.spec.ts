import {expect, Page, test} from "@playwright/test";
import * as R from 'ramda'
import {clickOnViewBooks, setupRoute} from "./tests-utils";
import {userDetails} from "./mockData/user";
import books from "./mockData/books";
import {historyNoErrors, historyWithErrors} from "./mockData/history";
import {dashboardLastRead, dashboardLastReadWithErrors} from "./mockData/dashboard";

async function nextSentence(page: Page) {
    await page.locator('.text-gray-800 > .bg-transparent').click()
}

test.describe('Reading', () => {
    test.use({storageState: './tests/mockData/localStorage.json'})
    test.beforeEach(async ({page  }) => {
        await setupRoute(page, 'http://127.0.0.1:3001/api/reading/user', userDetails)
    })

    test('Read a book with no mistakes', async ({ page }) => {
        await setupRoute(page, 'http://127.0.0.1:3001/api/reading/book?userId=7', books)
        const booksWithHistory = R.clone(books)
        // @ts-ignore
        booksWithHistory[1].books[0].history = [historyNoErrors]
        await setupRoute(page, 'http://127.0.0.1:3001/api/reading/tracker/update?', booksWithHistory)
        await setupRoute(page, 'http://127.0.0.1:3001/api/reading/tracker/words?userId=7', dashboardLastRead)
        await page.goto('http://127.0.0.1:5173/books')
        await clickOnViewBooks(page, 'Very First Reading')
        await page
            .getByTestId('book-list')
            .locator('div')
            .filter({ hasText: 'Double TroubleRead' })
            .getByTestId('book-list-read')
            .click()
        await expect(page.getByRole('heading', { name: 'Double Trouble' })).toBeVisible()
        await page.getByTestId('history-button').click()
        await expect(page.getByRole('heading', { name: 'I read this book 0 times' })).toBeVisible()
        await page.getByTestId('history-back-button').click()

        await nextSentence(page)
        await nextSentence(page)
        await nextSentence(page)
        await nextSentence(page)
        await nextSentence(page)
        await nextSentence(page)
        await nextSentence(page)
        await nextSentence(page)
        await nextSentence(page)
        await nextSentence(page)
        await nextSentence(page)
        await nextSentence(page)
        await nextSentence(page)
        await nextSentence(page)
        await nextSentence(page)
        await expect(page.getByText('100% Completed')).toBeVisible()
        await page.getByRole('link', { name: 'Dashboard' }).click()
        await expect(page.getByText('[30/08/2023] Double Trouble')).toBeVisible()
    })

    test('Read a book with mistakes', async ({ page }) => {
        await setupRoute(page, 'http://127.0.0.1:3001/api/reading/book?userId=7', books)
        const booksWithHistory = R.clone(books)
        // @ts-ignore
        booksWithHistory[1].books[0].history = [historyWithErrors]
        await setupRoute(page, 'http://127.0.0.1:3001/api/reading/tracker/update?', booksWithHistory)
        await setupRoute(page, 'http://127.0.0.1:3001/api/reading/tracker/words?userId=7', dashboardLastReadWithErrors)
        await page.goto('http://127.0.0.1:5173/books')
        await clickOnViewBooks(page, 'Very First Reading')
        await page
            .getByTestId('book-list')
            .locator('div')
            .filter({ hasText: 'Double TroubleRead' })
            .getByTestId('book-list-read')
            .click()

        await nextSentence(page)
        await page.getByRole('button', { name: 'am' }).first().click()
        await nextSentence(page)
        await nextSentence(page)
        await nextSentence(page)
        await nextSentence(page)
        await nextSentence(page)
        await page.getByRole('button', { name: 'sad.' }).click()
        await nextSentence(page)
        await page.getByRole('button', { name: 'mad.' }).click()
        await nextSentence(page)
        await nextSentence(page)
        await nextSentence(page)
        await nextSentence(page)
        await nextSentence(page)
        await nextSentence(page)
        await nextSentence(page)
        await nextSentence(page)
        await expect(page.getByText('am, sad, mad')).toBeVisible()
        await page.getByRole('link', { name: 'Dashboard' }).click()
        await expect(page.getByText('Double Trouble')).toBeVisible()
    })

})