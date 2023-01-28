import {QueryClient, QueryClientProvider} from "react-query"
import {MemoryRouter} from "react-router-dom"
import {Provider} from "react-redux"
import store from './store/store'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 0,
            cacheTime: 0,
            retryDelay: 1,
            retry:0,
        }
    }
})

type PropTypes = {
    pathname: string,
    children: JSX.Element
}


export function WrapperWith_Store_Query_Router(props: PropTypes) {
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={['', { pathname: props.pathname }]}>
                    {props.children}
                </MemoryRouter>
            </QueryClientProvider>
        </Provider>
    )
}

export function WrapperWithQueryAndRouter(props: PropTypes) {
    return (
        <QueryClientProvider client={queryClient}>
            <MemoryRouter initialEntries={['', { pathname: props.pathname }]}>
                {props.children}
            </MemoryRouter>
        </QueryClientProvider>
    )
}

export function WrapperWithQuery(props: {children: JSX.Element}) {
    return (
        <QueryClientProvider client={queryClient}>
            {props.children}
        </QueryClientProvider>
    )
}

export function WrapperWithRouter(props: PropTypes) {
    return (
        <MemoryRouter initialEntries={['', { pathname: props.pathname }]}>
            {props.children}
        </MemoryRouter>
    )
}
