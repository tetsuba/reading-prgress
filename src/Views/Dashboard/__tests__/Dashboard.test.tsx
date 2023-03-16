import { render, screen, waitFor } from '@testing-library/react'
import { Mocked } from 'vitest'
import { WrapperWith_Store_Query_Router } from '../../../vitest-setup'
import Dashboard from '../Dashboard'

import axios from 'axios'
vi.mock('axios')
const mockedAxios = axios as Mocked<typeof axios>

const mockData = {
    data: {
        lastBookRead: [
            { date: '12/12/2023', title: 'The Perfect Pet', words: [] },
            { date: '12/12/2023', title: 'Double Trouble', words: ['there'] }
        ],
        readIncorrectly: {
            oneWeekAgo: [
                { word: 'this', index: 1 },
                { word: 'that', index: 5 }
            ],
            oneMonthAgo: [
                { word: 'would', index: 10 },
                { word: 'dog', index: 15 }
            ],
            history: [
                { word: 'right', index: 20 },
                { word: 'live', index: 40 }
            ]
        }
    }
}

describe('Dashboard', () => {
    test('should render a list of words', async () => {
        mockedAxios.get.mockResolvedValue(mockData)
        const { asFragment } = render(
            <WrapperWith_Store_Query_Router pathname={'/dashboard'}>
                <Dashboard />
            </WrapperWith_Store_Query_Router>
        )
        await waitFor(() =>
            expect(screen.queryAllByTestId('heat-map-word')).toHaveLength(6)
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
