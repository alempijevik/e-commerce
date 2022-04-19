import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import CardList from "./components/CardList/CardList";
import Nav from "./components/Nav/Nav";
import Pagination from "./components/Pagination/Pagination";

function App() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [itemsShown, setItemsShown] = useState([]);
  const [favorites, setFavorites] = useState();
  const [page, setPage] = useState(0);
  const [filteredProducts, setfilteredProducts] = useState([]);
  const limitPage = 20;

  const fetchProductsHandler = async () => {
    setIsLoading(true);
    const response = await fetch("./product_list.json");
    const data = await response.json();
    setItemsShown(data.slice(page, page + limitPage));
    setProducts(data);
    console.log(data);
  };

  useEffect(() => {
    fetchProductsHandler();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // filteredProducts ? setItemsShown(filteredProducts.slice(page, page + limitPage)) : setItemsShown(products.slice(page, page + limitPage))
    setItemsShown(products.slice(page, page + limitPage));
    setIsLoading(false);
  }, [page]);

  return (
    <div className="App">
      <div>
        <Nav
          setFavorites={setFavorites}
          limitPage={limitPage}
          products={products}
          filteredProducts={filteredProducts}
          setfilteredProducts={setfilteredProducts}
        />
        {!isLoading && <CardList products={itemsShown} />}
        <Pagination
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          page={page}
          setPage={setPage}
          favorites={favorites}
          setFavorites={setFavorites}
          limitPage={limitPage}
        />
      </div>
      {isLoading && <p className="text-center">Loading...</p>}
    </div>
  );
}

export default App;
