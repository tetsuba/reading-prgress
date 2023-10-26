import { QueryClient, QueryClientProvider } from 'react-query'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store'
import { updateUser } from './store/user/userSlice'
import { addBooks } from './store/books/booksSlice'
import { addStudents } from './store/students/studentsSlice'
import { studentsMockData } from '../tests/mockData/students'
import booksMockData from '../tests/mockData/books'
import { userMockData } from '../tests/mockData/user'

const portal = document.createElement('div')
portal.setAttribute('id', 'modal')
document.body.appendChild(portal)

const mockResults = {
    results: [[{ transcript: 'This is a story' }]]
}

class MockSpeech {
    start() {
        // @ts-ignore
        this.onresult(mockResults)
    }
    stop = vi.fn()
    onresult = vi.fn()
    onend = vi.fn()
}

Object.defineProperty(window, 'webkitSpeechRecognition', {
    writable: true,
    value: vi.fn().mockImplementation(() => new MockSpeech())
})

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 0,
            cacheTime: 0,
            retryDelay: 1,
            retry: 0
        }
    }
})

type PropTypes = {
    pathname: string
    children: JSX.Element
    notAuthenticated?: boolean
}

export function updateStoreWithMockData() {
    store.dispatch(updateUser(userMockData))
    store.dispatch(addBooks(booksMockData))
    store.dispatch(addStudents(studentsMockData))
}

export function WrapperWith_Store_Query_Router(props: PropTypes) {
    if (!props.notAuthenticated) updateStoreWithMockData()
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={[props.pathname]}>
                    {props.children}
                </MemoryRouter>
            </QueryClientProvider>
        </Provider>
    )
}

export function WrapperWith_Store_Router(props: PropTypes) {
    return (
        <Provider store={store}>
            <MemoryRouter initialEntries={[props.pathname]}>
                {props.children}
            </MemoryRouter>
        </Provider>
    )
}

export function WrapperWithQueryAndRouter(props: PropTypes) {
    return (
        <QueryClientProvider client={queryClient}>
            <MemoryRouter initialEntries={[props.pathname]}>
                {props.children}
            </MemoryRouter>
        </QueryClientProvider>
    )
}

export function WrapperWithQuery(props: { children: JSX.Element }) {
    return (
        <QueryClientProvider client={queryClient}>
            {props.children}
        </QueryClientProvider>
    )
}

export function WrapperWithRouter(props: PropTypes) {
    return (
        <MemoryRouter initialEntries={[props.pathname]}>
            {props.children}
        </MemoryRouter>
    )
}
