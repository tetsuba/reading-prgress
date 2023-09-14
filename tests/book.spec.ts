import * as R from 'ramda'
import { expect, test, Page } from '@playwright/test'
import books from './mockData/books'
import {userDetails} from './mockData/user'
import {story1} from './mockData/myBooks'
import {setupRoute, clickOnViewBooks} from "./tests-utils";

test.describe('Book', () => {


    test.use({storageState: './tests/mockData/localStorage.json'})
    test.beforeEach(async ({page  }) => {
        await setupRoute(page, '**/api/reading/user', userDetails)
    })

    test('Adding a new book only available in "My Books"', async ({ page }) => {
        await setupRoute(page, '**/api/reading/book?userId=7', books)
        await page.goto('/books')
        await expect(page.getByRole('heading', { name: 'Books' })).toBeVisible()

        await clickOnViewBooks(page, 'My Books')
        await expect(
            page.getByRole('button', { name: 'Add Book' })
        ).toBeVisible()
        await page.getByTestId('back-button').click()
        await clickOnViewBooks(page, 'Very First Reading')
        await expect(
            page.getByRole('button', { name: 'Add Book' })
        ).not.toBeVisible()
        await page.getByTestId('back-button').click()
        await clickOnViewBooks(page, 'First Reading Level One')
        await expect(
            page.getByRole('button', { name: 'Add Book' })
        ).not.toBeVisible()
        await page.getByTestId('back-button').click()
        await clickOnViewBooks(page, 'First Reading Level Two')
        await expect(
            page.getByRole('button', { name: 'Add Book' })
        ).not.toBeVisible()
    })
    test('Adding and deleting a book', async ({ page }) => {
        const myBooks = R.clone(books)
        myBooks[0].books = [story1]
        await setupRoute(page, '**/api/reading/book?userId=7', books)
        await setupRoute(page, '**/api/reading/book/delete?bookId=1', books)
        await setupRoute(page, '**/api/reading/book/register?', myBooks)
        await page.goto('/books')
        await clickOnViewBooks(page, 'My Books')
        await test.step('Add a book', async () => {
            await page.getByRole('button', { name: 'Add Book' }).click()
            await expect(
                page.getByRole('heading', { name: 'Add new book' })
            ).toBeVisible()
            await page.locator('input[name="title"]').fill(story1.title)
            await page.getByPlaceholder('Story Here.').fill(
                story1.story.map((sentence) => sentence + '\n').join('')
            )
            await page.getByRole('button', { name: 'Save' }).click()
            await expect(
                page.getByText('Pirate Pat')
            ).toBeVisible()
        })
        await test.step('Check "My Books" number count updated by plus 1', async () => {
            await page.getByTestId('back-button').click()
            await expect(page.getByText('My Books (1)')).toBeVisible()
            await clickOnViewBooks(page, 'My Books')
        })
        await test.step('Delete a book', async () => {
            await page.getByTestId('book-list-delete').click()
            await expect(
                page.getByRole('heading', { name: 'Pirate Pat' })
            ).toBeVisible()
            await page.getByTestId('delete-button').click()
            await expect(
                page.getByText('Pirate Pat')
            ).not.toBeVisible()
        })
        await test.step('Check "My Books" number count updated by minus 1', async () => {
            await page.getByTestId('back-button').click()
            await expect(page.getByText('My Books (0)')).toBeVisible()
            await clickOnViewBooks(page, 'My Books')
        })
    })
})
