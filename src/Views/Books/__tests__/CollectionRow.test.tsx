import {render} from "@testing-library/react";
import {WrapperWith_Store_Query_Router} from "../../../vitest-setup";
import CollectionRow from "../CollectionRow";


describe('CollectionRow', () => {
    test('props data is undefined', () => {
        const { asFragment } = render(
            <WrapperWith_Store_Query_Router pathname={'/books'}>
                <CollectionRow data={undefined} index={0} />
            </WrapperWith_Store_Query_Router>
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
