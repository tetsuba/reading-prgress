import {render} from "@testing-library/react";
import WordHeatMap from "../WordHeatMap";

describe('WordHeatMap', () => {
    test.each([1, 2, 5, 10, 15, 20])('word index is %i', (index) => {
        const { asFragment } = render(<WordHeatMap word="heat" index={index} />)
        expect(asFragment()).toMatchSnapshot()
    })
})