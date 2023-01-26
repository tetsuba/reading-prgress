import "./style.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import {QueryClient, QueryClientProvider} from "react-query"
import Home from "./Views/Home"
import Contact from "./Views/Contact"
import ReadingView from "./Views/ReadingView"
import Header from "./Components/Header/Header";
import Register from "./Views/Register";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  }
})

function App() {
  return (
    <div className="m-0 p-0 container mx-auto">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/reading" element={<ReadingView />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App
