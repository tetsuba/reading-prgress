import { render, screen } from '@testing-library/react'
import { WrapperWith_Store_Query_Router } from '../../../vitest-setup'
import CollectionRow from '../../../Components/Row/CollectionRow'

const booksMock = [
    {
        title: 'titleBook 1',
        id: 1,
        completed: true,
        numberOfBooks: 10
    },
    {
        title: 'titleBook 2',
        id: 2,
        completed: false,
        numberOfBooks: 12
    }
]

const mockData = [
    {
        title: 'title collection 1',
        id: '001',
        completed: true,
        numberOfBooks: 2
    },
    {
        title: 'title collection 2',
        id: '002',
        completed: false,
        numberOfBooks: 12
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
