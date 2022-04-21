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
  const [favorites, setFavorites] = useState({});
  const [page, setPage] = useState(0);
  const [filteredProducts, setfilteredProducts] = useState([]);
  const [isFilterItems, setIsFilterItems] = useState(false)
  const [view, setView] = useState('')
  const limitPage = 20;
  const ls = localStorage.getItem('favorites')

  const fetchProductsHandler = async () => {
    setIsLoading(true);
    const response = await fetch("./product_list.json");
    const data = await response.json();
    setItemsShown(data.slice(page, page + limitPage));
    setProducts(data);
  };

  useEffect(() => {
    setView('home')
    if (ls) {
      setFavorites(JSON.parse(ls))
    } else {
      localStorage.setItem('favorites', JSON.stringify({}))
    }
    fetchProductsHandler();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
    if (view === 'favorites') {
      setFavoriteItems()
    }
  }, [favorites]);

  useEffect(() => {
    let itemsProd = []
    if (products.length > limitPage && filteredProducts.length === 0) {
      itemsProd = products.slice(page, page + limitPage)
    } else if (filteredProducts.length > limitPage) {
      itemsProd = filteredProducts.slice(page, page + limitPage)
    }
    if (itemsProd.length > 0) {
      setItemsShown(itemsProd);
      setIsLoading(false);
    }
  }, [page]);

  useEffect(() => {
    setPage(0)
    let setProducts = []
    if (view === 'home') {
      setProducts = isFilterItems ? filteredProducts : products
    } else if (view === 'favorites') {
      setProducts = filteredProducts
    }
    setItemsShown(setProducts.slice(page, page + limitPage));
  }, [filteredProducts])

  useEffect(() => {
    setPage(0);
    if (view === 'home') {
      setIsFilterItems(false)
      setfilteredProducts([])
      setItemsShown(products.slice(page, page + limitPage));
    } else if (view === 'favorites') {
      setIsFilterItems(true)
      setFavoriteItems()
    }
  }, [view])

  const buildFavProdArr = () => {
    return products.filter(product => {
      if (favorites[product.id]) {
        return product
      }
    });
  }

  const setFavoriteItems = () => {
    const favoriteProds = buildFavProdArr();
    if (favoriteProds.length === page) {
      setPage(page - limitPage)
    }
    setfilteredProducts(favoriteProds)
  }

  return (
    <div className="App">
      <div>
        <Nav
          setFavorites={setFavorites}
          limitPage={limitPage}
          products={products}
          filteredProducts={filteredProducts}
          favorites={favorites}
          setfilteredProducts={setfilteredProducts}
          buildFavProdArr={buildFavProdArr}
          view={view}
          setView={setView}
          setIsFilterItems={setIsFilterItems}
        />
        {!isLoading && 
          <CardList products={itemsShown} view={view} favorites={favorites} setFavorites={setFavorites} />}
        {(products.length > limitPage && filteredProducts.length === 0 || filteredProducts.length > limitPage) && 
          <Pagination
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            page={page}
            setPage={setPage}
            favorites={favorites}
            setFavorites={setFavorites}
            limitPage={limitPage}
            products={products}
            filteredProducts={filteredProducts}
            view={view}
          />}
      </div>
      {isLoading && <p className="text-center">Loading...</p>}
    </div>
  );
}

export default App;
