import { render } from '@testing-library/react'
import WordHeatMap from '../WordHeatMap'
import { HeatMapColors } from '../HeatMap'

describe('WordHeatMap', () => {
    const Colors: HeatMapColors[] = ['red', 'blue', 'green', 'none']

    test.each(Colors)('word color is %s', (color: HeatMapColors) => {
        const { asFragment } = render(
            <WordHeatMap max={3} word="heat" index={5} color={color} />
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
