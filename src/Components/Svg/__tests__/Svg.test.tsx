import { render, screen } from '@testing-library/react'
import Svg from '../Svg'

describe('SVG', () => {
    test('No icons found', () => {
        // @ts-ignore
        render(<Svg type="" />)
        expect(screen.getByText('No icon found'))
    })
})
