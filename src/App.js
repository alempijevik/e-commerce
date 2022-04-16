import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import CardList from "./components/CardList/CardList";
import Pagination from "./components/Pagination/Pagination";

function App() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [itemsShown, setItemsShown] = useState([]);
  const [page, setPage] = useState(0);
  const limitPage = 20;

  const fetchProductsHandler = async () => {
    setIsLoading(true);
    const response = await fetch("./product_list.json");
    const data = await response.json();
    setItemsShown(data.slice(page, page + limitPage));
    setProducts(data);
    console.log(data);
  };

//   const previousPage = () => {
//     if (page === 0 || isLoading) return;
// 	setIsLoading(true)
//     setPage(page - limitPage);
//   };

//   const nextPage = () => {
//     if (isLoading) return;
// 	setIsLoading(true)
//     setPage(page + limitPage);
//   };

  useEffect(() => {
    fetchProductsHandler();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setItemsShown(products.slice(page, page + limitPage));
	setIsLoading(false)
  }, [page]);

  return (
    <div className="App">
      <div>
        {!isLoading && <CardList products={itemsShown} />}
        <Pagination isLoading={isLoading} page={page} limitPage={limitPage} setPage={setPage} setIsLoading={setIsLoading} />
      </div>
      {isLoading && <p className="text-center">Loading...</p>}
    </div>
  );
}

export default App;
