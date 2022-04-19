import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import "./Nav.scss";
import debounce from "lodash.debounce";

const Nav = (props) => {
  const [searchResult, setSearchResult] = useState([]);

  const changeHandler = (event) => {
    const value = event.target.value.replace(/[^a-zA-Z]/g, '').toLowerCase();
    const result = props.products.filter(product => {
      // console.log(product.product_name.includes(value.replace(/[^a-zA-Z]/g, '').toLowerCase()))
      return product.product_name.includes(value.replace(/[^a-zA-Z]/g, '').toLowerCase());
    })
    // console.log(value);
    // console.log(props.products)
    console.log(result);
    setSearchResult(result);
  };

  const debouncedChangeHandler = useMemo(
    () => debounce(changeHandler, 300),
    []
  );

  return (
    <div className="nav">
      <div className="container">
        <div className="nav--wrapper">
          <ul className="nav--list">
            <li>Home</li>
            <li className="nav--list__favorites">Favorites</li>
          </ul>
          <input
            className="nav--search"
            type="text"
            placeholder="Search product..."
            onChange={debouncedChangeHandler}
          ></input>
        </div>
      </div>
    </div>
  );
};

Nav.propTypes = {};

Nav.defaultProps = {};

export default Nav;
