import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import "./Nav.scss";
import debounce from "lodash.debounce";

const Nav = (props) => {
  const changeHandler = (event) => {
    const value = event.target.value.replace(/[^a-zA-Z]/g, '').toLowerCase();
    if (value === '') {
      if (props.view === 'favorites') {
        props.setfilteredProducts(props.buildFavProdArr());
      } else {
        props.setIsFilterItems(false)
        props.setfilteredProducts([]);
      }
      return
    }
    const prods = props.view === 'home' ? props.products : props.buildFavProdArr()
    const result = prods.filter(product => {
      return product.product_name.toLowerCase().includes(value.replace(/[^a-zA-Z]/g, ''));
    })
    props.setIsFilterItems(true)
    props.setfilteredProducts(result);
  };

  const debouncedChangeHandler = useMemo(
    () => debounce(changeHandler, 400)
  );

  return (
    <div className="nav">
      <div className="container">
        <div className="nav--wrapper">
          <ul className="nav--list">
            <li onClick={() => props.setView('home')} className={props.view === 'home' ? 'selected' : ''}>Home</li>
            <li onClick={() => props.setView('favorites')} className={`nav--list__favorites ${props.view === 'favorites' ? 'selected' : ''}`}>Favorites</li>
          </ul>
          <input
            className="nav--search"
            type="text"
            placeholder="Search product..."
            onChange={(e) => debouncedChangeHandler(e)}
          ></input>
        </div>
      </div>
    </div>
  );
};

Nav.propTypes = {};

Nav.defaultProps = {};

export default Nav;
