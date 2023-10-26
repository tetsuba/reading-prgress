import { render, screen } from '@testing-library/react'
import BookRow from '../BookRow'
import { WrapperWith_Store_Router } from '../../../vitest-setup'

describe('BookRow', () => {
    test('data, index and collectionId properties are undefined', () => {
        render(
            <WrapperWith_Store_Router pathname={'/dashboard'}>
                <BookRow />
            </WrapperWith_Store_Router>
        )
        expect(screen.getByText('loading...')).exist
    })
})
