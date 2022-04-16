import React from 'react';
import PropTypes from 'prop-types';
import './Pagination.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";


const Pagination = ({isLoading, page, limitPage, setPage, setIsLoading}) => {
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
      <FontAwesomeIcon className='pagination__navigator' onClick={() => {previousPage()}} icon={faAngleLeft} />
      <FontAwesomeIcon className='pagination__navigator' onClick={() => {nextPage()}} icon={faAngleRight} />
    </div>
  )
};

Pagination.propTypes = {};

Pagination.defaultProps = {};

export default Pagination;
