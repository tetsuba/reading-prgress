import { render } from '@testing-library/react'
import HeatMap from '../HeatMap'

describe('HeatMap', () => {
    test('should render a word heatmap', () => {
        const words = [
            { word: 'there', index: 1 },
            { word: 'then', index: 5 }
        ]
        const { asFragment } = render(
            <HeatMap words={words} search="" color="red">
                Test Header
            </HeatMap>
        )
        expect(asFragment()).toMatchSnapshot()
    })

    test('should render nothing if words undefined', () => {
        const words = undefined
        const { asFragment } = render(
            <HeatMap words={words} search="" color="red">
                Test Header
            </HeatMap>
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
