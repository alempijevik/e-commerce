import React from "react";
import "./CardList.scss";
import Card from '../Card/Card'

const CardList = (props) => (
  <div className="card--list">
    <div className="container">
      <div className="row">
        {props.products.map((product) => (
          <Card product={product} key={product.id} />
          ))}
      </div>
    </div>
  </div>
);

CardList.propTypes = {};

CardList.defaultProps = {};

export default CardList;
