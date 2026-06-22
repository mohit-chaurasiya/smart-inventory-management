const Pagination = ({ currentPage, totalPages, nextPage, prevPage }) => {
  if (totalPages <= 1) return null;

  return (
    <div
      className="
        flex
        justify-between
        items-center

        p-5

        border-t
        border-slate-200
        dark:border-slate-800
      "
    >
      <button
        onClick={prevPage}
        disabled={currentPage === 1}
        className="
          px-4 py-2

          rounded-xl

          bg-slate-100
          dark:bg-slate-800

          disabled:opacity-50
        "
      >
        Previous
      </button>

      <span>
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={nextPage}
        disabled={currentPage === totalPages}
        className="
          px-4 py-2

          rounded-xl

          bg-slate-100
          dark:bg-slate-800

          disabled:opacity-50
        "
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
