import {render} from "@testing-library/react";
import {WrapperWithRouter} from "../../../vitest-setup";
import Sentence from "../Sentence";

describe('Sentence', () => {
    test('if props data is undefined', () => {
        const { asFragment } = render(
            <WrapperWithRouter pathname="/">
                <Sentence data={undefined} index={0} count={0} sentenceClickHandler={() => {}} wordClickHandler={() => {}}/>
            </WrapperWithRouter>
        )
        expect(asFragment()).toMatchSnapshot()
    })
})