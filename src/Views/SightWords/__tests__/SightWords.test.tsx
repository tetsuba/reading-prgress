import { render, screen, waitFor } from '@testing-library/react'
import { WrapperWith_Store_Query_Router } from '../../../vitest-setup'
import { Mocked } from 'vitest'

import SiteWords from '../SightWords'

import axios from 'axios'
vi.mock('axios')
const mockedAxios = axios as Mocked<typeof axios>

const mockData = {
    data: {
        sightWordsReadWrong: [
            { word: 'this', index: 1 },
            { word: 'that', index: 5 }
        ],
        sightWordsReadInBooks: [
            { word: 'this', index: 1 },
            { word: 'that', index: 5 },
            { word: 'would', index: 10 }
        ],
        sightWordsFromBooks: [
            { word: 'this', index: 1 },
            { word: 'that', index: 5 },
            { word: 'would', index: 10 },
            { word: 'dog', index: 15 }
        ],
        sightWordsNotInBooks: [
            { word: 'right', index: 20 },
            { word: 'live', index: 40 }
        ]
    }
}

describe('SightWords', () => {
    test('will render groups of sight words', async () => {
        mockedAxios.get.mockResolvedValue(mockData)
        const { asFragment } = render(
            <WrapperWith_Store_Query_Router pathname={'/site-words'}>
                <SiteWords />
            </WrapperWith_Store_Query_Router>
        )
        await waitFor(() =>
            expect(screen.queryAllByTestId('heat-map')).toHaveLength(4)
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
