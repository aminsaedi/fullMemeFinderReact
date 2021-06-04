import React from "react";

import "./paginator.css";

const Paginaitor = ({
  totalItems = 100,
  onChange,
  itemPerPage = 16,
  currentPage = 1,
}) => {
  const totalPages = Math.ceil(totalItems / itemPerPage);
  return (
    <div className="paginator">
      <div
        className={
          currentPage === 1
            ? "paginaitor__button paginaitor__button--disabled"
            : "paginaitor__button"
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
          currentPage >= totalPages
            ? "paginaitor__button paginaitor__button--disabled"
            : "paginaitor__button"
        }
        onClick={() => (currentPage < totalPages ? onChange("nextPage") : null)}
      >
        صفحه بعدی &raquo;
      </div>
    </div>
  );
};

export default Paginaitor;
