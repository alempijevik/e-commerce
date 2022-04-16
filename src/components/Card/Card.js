import React, { useState } from "react";
import "./Card.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const Card = (props) => {
  const [ fave, setFave ] = useState(false);

  const saleTag = (price, sale) => {
    const percentage = Math.floor((100 * sale) / price);
    const markup = (
      <>
        {price > sale && <span className="on-sale__tag">{percentage}%</span>}
      </>
    )
    return markup
  }
  
  const price = (price, sale) => {
    const markup = (
      <>
        {price > sale && <span className="red">from {sale}  €</span>}
        <span className={price > sale ? 'on-sale' : ''}>{price} €</span>
      </>
    )
    return markup
  }

  return (
    <div className="col-lg-3 mt-4">
      <div className="card--product">
        {props.product.filename && <img className="card--product__image" src={props.product.filename} alt="Product Image"></img>}
        <div className="card--product__info">
          <h3 className="card--product__name">{props.product.product_name}</h3>
          <div className="card--product__hover">
            <p>{props.product.brand_name}</p>
            
          </div>
          {price(props.product.base_price, props.product.actual_price)}
          <FontAwesomeIcon onClick={() => setFave(!fave)} className={`card--product__heart ${fave ? 'fave' : ''}`} icon={faHeart} />
        </div>
        {saleTag(props.product.base_price, props.product.actual_price)}
      </div>
    </div>
  );
};

Card.propTypes = {};

Card.defaultProps = {};

export default Card;
