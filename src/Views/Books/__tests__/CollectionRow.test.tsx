import { render, screen } from '@testing-library/react'
import { WrapperWith_Store_Query_Router } from '../../../vitest-setup'
import CollectionRow from '../CollectionRow'

const booksMock = [
    {
        title: 'titleBook 1',
        story: ['story 1'],
        id: 1,
        userId: 1,
        history: [{ date: '16/02/2023', words: [] }]
    },
    {
        title: 'titleBook 2',
        story: ['story 2'],
        id: 2,
        userId: 2,
        history: [{ date: '16/02/2023', words: [] }]
    }
]

const mockData = [
    {
        id: '001',
        author: '',
        title: 'title collection 1',
        description: 'description',
        books: booksMock
    },
    {
        id: '002',
        author: '',
        title: 'title collection 2',
        description: 'description',
        books: booksMock
    }
]

describe('CollectionRow', () => {
    test('props data is undefined', () => {
        const { asFragment } = render(
            <WrapperWith_Store_Query_Router pathname={'/books'}>
                <CollectionRow data={undefined} index={0} />
            </WrapperWith_Store_Query_Router>
        )
        expect(asFragment()).toMatchSnapshot()
    })

    test('if collection row icon is green', () => {
        const { asFragment } = render(
            <WrapperWith_Store_Query_Router pathname={'/books'}>
                <CollectionRow data={mockData[0]} index={0} />
            </WrapperWith_Store_Query_Router>
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
