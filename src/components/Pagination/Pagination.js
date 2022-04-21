import React from 'react';
import PropTypes from 'prop-types';
import './Pagination.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";


const Pagination = ({isLoading, page, limitPage, setPage, setIsLoading, products, filteredProducts, view}) => {
  const nextIcon = () => {
    const icon = <FontAwesomeIcon className='pagination__navigator' onClick={() => {nextPage()}} icon={faAngleRight} />
    if (view === 'home') {
      if ((filteredProducts.length === 0 && products.length > page + limitPage) || filteredProducts.length > page + limitPage) {
        return icon
      }
    } else if (view === 'favorites') {
      if (filteredProducts.length > page + limitPage) {
        return icon
      }
    }
    return null
  }

  const previousPage = () => {
    if (page === 0 || isLoading) return;
	  setIsLoading(true)
    setPage(page - limitPage);
  };

  const nextPage = () => {
    if (isLoading) return;
	  setIsLoading(true)
    setPage(page + limitPage);
  };
  return (
    <div className="pagination">
      {page > 0 && <FontAwesomeIcon className='pagination__navigator' onClick={() => {previousPage()}} icon={faAngleLeft} />}
      {nextIcon()}
    </div>
  )
};

Pagination.propTypes = {};

Pagination.defaultProps = {};

export default Pagination;
