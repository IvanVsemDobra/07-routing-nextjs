"use client";
import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

export interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (selectedItem: { selected: number }) => void;
}

const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  return (
    <div className={css.pagination}>
      <ReactPaginate
        pageCount={totalPages}
        onPageChange={onPageChange}
        forcePage={currentPage - 1}
        marginPagesDisplayed={1}
        pageRangeDisplayed={3}
        previousLabel="Prev"
        nextLabel="Next"
        breakLabel="..."
        containerClassName={css.container}
        pageClassName={css.page}
        pageLinkClassName={css.pageLink}
        previousClassName={css.prev}
        nextClassName={css.next}
        activeClassName={css.active}
        disabledClassName={css.disabled}
      />
    </div>
  );
};

export default Pagination;
