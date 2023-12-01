
import React from 'react';
import './listing.css';

const Pagination = ({ currentPage, totalItems, pageSize, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / pageSize);
  const changePage = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="pagination">
      <button className="page-btn" onClick={() => changePage(1)} disabled={currentPage === 1}>
        First
      </button>
      <button className="page-btn" onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1}>
        Previous
      </button>
      {pageNumbers.map(number => (
        <button
          key={number}
          className={`page-btn number-btn ${currentPage === number ? 'active' : ''}`}
          onClick={() => changePage(number)}
        >
          {number}
        </button>
      ))}
      <button className="page-btn" onClick={() => changePage(currentPage + 1)} disabled={currentPage === totalPages}>
        Next
      </button>
      <button className="page-btn" onClick={() => changePage(totalPages)} disabled={currentPage === totalPages}>
        Last
      </button>
    </div>
  );
};

export default Pagination;
