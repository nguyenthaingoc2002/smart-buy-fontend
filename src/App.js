import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./pages/Products";
import Header from "./components/Header";
import ProductDetail from "./pages/ProductDetail";
import ProductsSearch from "./pages/ProductsSearch"
import React from "react";
export const ListProductsContext = React.createContext(null);

function App() {
  const [listProducts, setListProducts] = React.useState(null);
  return (
    <ListProductsContext.Provider value={{ listProducts, setListProducts }}>
      <Router>
        <Header/>
        <div className="max-w-7xl mx-auto py-5">
          <Routes>
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail/> } />
            <Route path="/products/search" element={<ProductsSearch />} />
          </Routes>
        </div>
      </Router>
    </ListProductsContext.Provider>
  );
}

export default App;
