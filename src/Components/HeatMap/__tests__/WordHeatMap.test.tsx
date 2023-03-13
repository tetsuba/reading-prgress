import { render } from '@testing-library/react'
import WordHeatMap from '../WordHeatMap'

describe('WordHeatMap', () => {
    test.each(['red', 'blue', 'green', 'none'])(
        'word color is %s',
        (color: any) => {
            const { asFragment } = render(
                <WordHeatMap max={3} word="heat" index={5} color={color} />
            )
            expect(asFragment()).toMatchSnapshot()
        }
    )
})
