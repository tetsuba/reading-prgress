import './style.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import store from './store/store'

import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import Nav from './Components/Nav/Nav'
import FirstLoad from './Components/FirstLoad/FirstLoad'

// VIEWS
import Home from './Views/Home'
import Reading from './Views/Reading'
import Register from './Views/Register'
import Dashboard from './Views/Dashboard'
import Profile from './Views/Profile'
import Books from './Views/Books/Books'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity,
            cacheTime: Infinity
        }
    }
})

function App() {
    return (
        <div className="min-h-full">
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <BrowserRouter>
                        <Nav />
                        <FirstLoad>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route
                                    path="/register"
                                    element={<Register />}
                                />
                                <Route
                                    path="/dashboard"
                                    element={
                                        <ProtectedRoute>
                                            <Dashboard />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/reading"
                                    element={
                                        <ProtectedRoute>
                                            <Reading />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/profile"
                                    element={
                                        <ProtectedRoute>
                                            <Profile />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/books"
                                    element={
                                        <ProtectedRoute>
                                            <Books />
                                        </ProtectedRoute>
                                    }
                                />
                            </Routes>
                        </FirstLoad>
                    </BrowserRouter>
                </QueryClientProvider>
            </Provider>
        </div>
    )
}

export default App
