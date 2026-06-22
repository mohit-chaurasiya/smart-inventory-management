import { Eye, Download, ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";
import { downloadInvoice } from "../../services/salesService";
import usePagination from "../../hooks/usePagination";

import Pagination from "../common/Pagination";

const SalesTable = ({ sales = [], setSelectedSale, setOpenDetails }) => {
  const { currentPage, totalPages, paginatedData, nextPage, prevPage } =
    usePagination(sales, 5);
  const getStatusStyle = (status) => {
    switch (status) {
      case "paid":
        return "bg-emerald-100 text-emerald-600";

      case "partial":
        return "bg-yellow-100 text-yellow-600";

      case "unpaid":
        return "bg-red-100 text-red-600";

      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  const handleDownloadInvoice = async (saleId) => {
    try {
      const blob = await downloadInvoice(saleId);

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;

      link.download = `invoice-${saleId}.pdf`;

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);

      toast.error("Failed to download invoice");
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
        "
      >
        <h2 className="text-xl font-bold">Sales History</h2>

        <p className="text-slate-500 mt-1">View and manage all sales</p>
      </div>

      {/* Mobile View */}

      <div className="lg:hidden">
        {sales.length === 0 ? (
          <div className="p-10 text-center">
            <ShoppingCart
              size={60}
              className="
                mx-auto
                text-slate-400
              "
            />

            <h3 className="mt-4 text-xl font-semibold">No Sales Found</h3>

            <p className="text-slate-500 mt-2">
              Your sales history will appear here.
            </p>
          </div>
        ) : (
          paginatedData.map((sale) => (
            <div
              key={sale._id}
              className="
                p-5

                border-b
                border-slate-200
                dark:border-slate-800
              "
            >
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold text-lg">
                    {sale.customer?.name || "Walk-in Customer"}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {new Date(sale.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <span
                  className={`
                    px-3
                    py-1

                    rounded-full

                    text-sm

                    ${getStatusStyle(sale.paymentStatus)}
                  `}
                >
                  {sale.paymentStatus}
                </span>
              </div>

              <div className="mt-4 space-y-2">
                <p>
                  Total:
                  <span className="font-semibold"> ₹{sale.totalAmount}</span>
                </p>

                <p>
                  Paid:
                  <span className="font-semibold"> ₹{sale.paidAmount}</span>
                </p>

                <p>
                  Due:
                  <span className="font-semibold"> ₹{sale.dueAmount}</span>
                </p>

                <p>Items: {sale.items?.length}</p>
              </div>

              <div className="flex gap-3 mt-5">
                <button
                  onClick={() => {
                    setSelectedSale(sale);
                    setOpenDetails(true);
                  }}
                  className="
                    flex-1

                    flex
                    justify-center
                    items-center

                    gap-2

                    py-3

                    rounded-xl

                    bg-blue-100
                    text-blue-600
                  "
                >
                  <Eye size={18} />
                  View
                </button>

                <button
                  onClick={() => handleDownloadInvoice(sale._id)}
                  className="
                    flex-1

                    flex
                    justify-center
                    items-center

                    gap-2

                    py-3

                    rounded-xl

                    bg-emerald-100
                    text-emerald-600
                  "
                >
                  <Download size={18} />
                  Invoice
                </button>
              </div>
            </div>
          ))
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
              <th className="text-left p-5">Customer</th>

              <th className="text-left p-5">Items</th>

              <th className="text-left p-5">Total</th>

              <th className="text-left p-5">Paid</th>

              <th className="text-left p-5">Due</th>

              <th className="text-left p-5">Status</th>

              <th className="text-left p-5">Date</th>

              <th className="text-left p-5">Actions</th>
            </tr>
          </thead>

          <tbody>
            {sales.length === 0 ? (
              <tr>
                <td
                  colSpan="8"
                  className="
                    text-center
                    py-20
                  "
                >
                  <ShoppingCart
                    size={60}
                    className="
                      mx-auto
                      text-slate-400
                    "
                  />

                  <h3 className="mt-4 text-xl font-semibold">No Sales Found</h3>
                </td>
              </tr>
            ) : (
              paginatedData.map((sale) => (
                <tr
                  key={sale._id}
                  className="
                    border-t
                    border-slate-200
                    dark:border-slate-800

                    hover:bg-slate-50
                    dark:hover:bg-slate-800/50
                  "
                >
                  <td className="p-5 font-medium">
                    {sale.customer?.name || "Walk-in Customer"}
                  </td>

                  <td className="p-5">{sale.items.length}</td>

                  <td className="p-5">₹{sale.totalAmount}</td>

                  <td className="p-5">₹{sale.paidAmount}</td>

                  <td className="p-5">₹{sale.dueAmount}</td>

                  <td className="p-5">
                    <span
                      className={`
                        px-3
                        py-1

                        rounded-full

                        text-sm

                        ${getStatusStyle(sale.paymentStatus)}
                      `}
                    >
                      {sale.paymentStatus}
                    </span>
                  </td>

                  <td className="p-5">
                    {new Date(sale.createdAt).toLocaleDateString()}
                  </td>

                  <td className="p-5">
                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          //   console.log(sale);
                          setSelectedSale(sale);
                          setOpenDetails(true);
                        }}
                        className="
                          p-2

                          rounded-xl

                          bg-blue-100
                          text-blue-600
                        "
                      >
                        <Eye size={18} />
                      </button>

                      <button
                        onClick={() => handleDownloadInvoice(sale._id)}
                        className="
                          p-2

                          rounded-xl

                          bg-emerald-100
                          text-emerald-600
                        "
                      >
                        <Download size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
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

export default SalesTable;
