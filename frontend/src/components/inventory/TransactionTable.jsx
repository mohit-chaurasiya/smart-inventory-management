import {
  ArrowDownLeft,
  ArrowUpRight,
  RefreshCcw,
  Wrench,
  History,
} from "lucide-react";
import usePagination from "../../hooks/usePagination";

import Pagination from "../common/Pagination";

const TransactionTable = ({ transactions = [] }) => {
  const { currentPage, totalPages, paginatedData, nextPage, prevPage } =
    usePagination(transactions, 5);
  const getTransactionStyle = (type) => {
    switch (type) {
      case "purchase":
        return {
          color: "bg-emerald-100 text-emerald-600",
          icon: <ArrowDownLeft size={16} />,
        };

      case "sale":
        return {
          color: "bg-red-100 text-red-600",
          icon: <ArrowUpRight size={16} />,
        };

      case "return":
        return {
          color: "bg-blue-100 text-blue-600",
          icon: <RefreshCcw size={16} />,
        };

      default:
        return {
          color: "bg-violet-100 text-violet-600",
          icon: <Wrench size={16} />,
        };
    }
  };

  return (
    <div
      className="
        rounded-3xl

        bg-white/70
        dark:bg-slate-900/70

        backdrop-blur-xl

        border
        border-slate-200
        dark:border-slate-800

        overflow-hidden
      "
    >
      {/* Header */}

      <div
        className="
          p-6

          border-b
          border-slate-200
          dark:border-slate-800

          flex
          justify-between
          items-center
        "
      >
        <div>
          <h2 className="text-xl font-bold">Recent Transactions</h2>

          <p className="text-slate-500 mt-1">Track all inventory movements</p>
        </div>
      </div>

      {/* Mobile View */}

      <div className="lg:hidden">
        {transactions.length === 0 ? (
          <div className="p-10 text-center">
            <History
              size={60}
              className="
                mx-auto
                text-slate-400
              "
            />

            <h3 className="mt-4 text-xl font-semibold">
              No Transactions Found
            </h3>

            <p className="text-slate-500 mt-2">
              Inventory transactions will appear here.
            </p>
          </div>
        ) : (
          paginatedData.map((transaction) => {
            const style = getTransactionStyle(transaction.type);

            return (
              <div
                key={transaction._id}
                className="
                  p-5

                  border-b
                  border-slate-200
                  dark:border-slate-800
                "
              >
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold">
                      {transaction.product?.name}
                    </h3>

                    <p className="text-sm text-slate-500">
                      {new Date(transaction.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <span
                    className={`
                      flex
                      items-center
                      gap-2

                      px-3 py-1

                      rounded-full

                      text-sm

                      ${style.color}
                    `}
                  >
                    {style.icon}
                    {transaction.type}
                  </span>
                </div>

                <div className="mt-4 space-y-2">
                  <p>Quantity: {transaction.quantity}</p>

                  <p>
                    Stock: {transaction.previousStock}
                    {" → "}
                    {transaction.currentStock}
                  </p>

                  <p>Notes: {transaction.notes || "-"}</p>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Desktop View */}

      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead
            className="
              bg-slate-100/80
              dark:bg-slate-800/80
            "
          >
            <tr>
              <th className="text-left p-5">Product</th>

              <th className="text-left p-5">Type</th>

              <th className="text-left p-5">Quantity</th>

              <th className="text-left p-5">Previous</th>

              <th className="text-left p-5">Current</th>

              <th className="text-left p-5">Notes</th>

              <th className="text-left p-5">Date</th>
            </tr>
          </thead>

          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="
                    text-center
                    py-20
                  "
                >
                  <History
                    size={60}
                    className="
                      mx-auto
                      text-slate-400
                    "
                  />

                  <h3 className="mt-4 text-xl font-semibold">
                    No Transactions Found
                  </h3>
                </td>
              </tr>
            ) : (
              paginatedData.map((transaction) => {
                const style = getTransactionStyle(transaction.type);

                return (
                  <tr
                    key={transaction._id}
                    className="
                      border-t
                      border-slate-200
                      dark:border-slate-800

                      hover:bg-slate-50
                      dark:hover:bg-slate-800/50
                    "
                  >
                    <td className="p-5 font-medium">
                      {transaction.product?.name}
                    </td>

                    <td className="p-5">
                      <span
                        className={`
                          inline-flex
                          items-center
                          gap-2

                          px-3 py-1

                          rounded-full

                          ${style.color}
                        `}
                      >
                        {style.icon}
                        {transaction.type}
                      </span>
                    </td>

                    <td className="p-5">{transaction.quantity}</td>

                    <td className="p-5">{transaction.previousStock}</td>

                    <td className="p-5">{transaction.currentStock}</td>

                    <td className="p-5">{transaction.notes || "-"}</td>

                    <td className="p-5">
                      {new Date(transaction.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      </div>
    </div>
  );
};

export default TransactionTable;
