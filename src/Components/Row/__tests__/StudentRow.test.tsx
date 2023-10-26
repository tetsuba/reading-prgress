import { render, screen } from '@testing-library/react'
import StudentRow from '../StudentRow'

describe('StudentRow', () => {
    test('data and index properties are undefined', () => {
        render(<StudentRow deleteStudent={vi.fn} selectStudent={vi.fn} />)
        expect(screen.getByText('loading...')).exist
    })
})
