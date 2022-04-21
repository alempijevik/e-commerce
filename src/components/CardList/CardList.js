import React from "react";
import "./CardList.scss";
import Card from '../Card/Card'

const CardList = (props) => {
  return (
  <div className="card--list">
    <div className="container">
      <div className="row">
        {props.products.length > 0 ? 
          props.products.map((product) => (
            <Card product={product} key={product.id} favorites={props.favorites} setFavorites={props.setFavorites} />
          ))
          : <span>No items to be found</span>}
      </div>
    </div>
  </div>)
}

CardList.propTypes = {};

CardList.defaultProps = {};

export default CardList;
