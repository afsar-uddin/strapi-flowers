import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import './App.css';
import BlogDetail from './pages/BlogDetail';
import Category from './pages/Category';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

// Apollo client 
const client = new ApolloClient({
  uri: "http://localhost:1337/graphql",
  cache: new InMemoryCache()
})

function App() {
  return (
    <div className="site-wrapper">
      <BrowserRouter>
        <ApolloProvider client={client}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="blog-detail/:id" element={<BlogDetail />} />
            <Route path="category/:id" element={<Category />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ApolloProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
