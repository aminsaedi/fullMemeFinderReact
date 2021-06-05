import React from "react";

import "./paginator.css";

const Paginaitor = ({
  totalItems = 100,
  onChange,
  currentPage = 1,
  hasPrevPage = false,
  hasNextPage = false,
  totalPages = 1,
}) => {
  return (
    <div className="paginator">
      <div
        className={
          hasPrevPage
            ? "paginaitor__button"
            : "paginaitor__button paginaitor__button--disabled"
        }
        onClick={() => (currentPage > 1 ? onChange("perviousPage") : null)}
      >
        &laquo; صفحه قبلی
      </div>
      <div className="paginaitorInfoContainer">
        {/* TODO: add persian number support */}
        صفحه {currentPage.toString()} از {totalPages.toString()}
      </div>
      <div
        className={
          hasNextPage
            ? "paginaitor__button"
            : "paginaitor__button paginaitor__button--disabled"
        }
        onClick={() => (currentPage < totalPages ? onChange("nextPage") : null)}
      >
        صفحه بعدی &raquo;
      </div>
    </div>
  );
};

export default Paginaitor;
