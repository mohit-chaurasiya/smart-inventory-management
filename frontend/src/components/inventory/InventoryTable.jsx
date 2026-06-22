import { AlertTriangle, CheckCircle2, XCircle, Boxes } from "lucide-react";
import usePagination from "../../hooks/usePagination";

import Pagination from "../common/Pagination";

const InventoryTable = ({
  inventory = [],
  fetchInventory,
  setOpenModal,
  setSelectedProduct,
}) => {
  const { currentPage, totalPages, paginatedData, nextPage, prevPage } =
    usePagination(inventory, 5);
  const getStatus = (product) => {
    if (product.stock === 0) {
      return {
        text: "Out of Stock",
        color: "bg-red-100 text-red-600",
        icon: <XCircle size={16} />,
      };
    }

    if (product.stock <= product.lowStockThreshold) {
      return {
        text: "Low Stock",
        color: "bg-yellow-100 text-yellow-600",
        icon: <AlertTriangle size={16} />,
      };
    }

    return {
      text: "In Stock",
      color: "bg-emerald-100 text-emerald-600",
      icon: <CheckCircle2 size={16} />,
    };
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
      {/* Mobile */}

      <div className="lg:hidden">
        {inventory.length === 0 ? (
          <div className="p-10 text-center">
            <Boxes size={60} className="mx-auto text-slate-400" />

            <h2 className="mt-4 text-xl font-semibold">No Inventory Found</h2>
          </div>
        ) : (
          paginatedData.map((item) => {
            const status = getStatus(item);

            return (
              <div
                key={item._id}
                className="
                  p-5

                  border-b
                  border-slate-200
                  dark:border-slate-800
                "
              >
                <div className="flex justify-between">
                  <h3 className="font-semibold text-lg">{item.name}</h3>

                  <span
                    className={`
                      flex
                      items-center
                      gap-2

                      px-3
                      py-1

                      rounded-full

                      text-sm

                      ${status.color}
                    `}
                  >
                    {status.icon}
                    {status.text}
                  </span>
                </div>

                <div className="mt-4 space-y-2">
                  <p>Stock: {item.stock}</p>

                  <p>Category: {item.category}</p>

                  <p>
                    Threshold:
                    {item.lowStockThreshold}
                  </p>
                </div>
                <div className="mt-5">
                  <button
                    onClick={() => {
                      setSelectedProduct(item);
                      setOpenModal(true);
                    }}
                    className="
      w-full

      py-3

      rounded-xl

      bg-gradient-to-r
      from-cyan-500
      to-blue-500

      text-white
    "
                  >
                    Adjust Stock
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Desktop */}

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

              <th className="text-left p-5">Category</th>

              <th className="text-left p-5">Stock</th>

              <th className="text-left p-5">Threshold</th>

              <th className="text-left p-5">Status</th>
              <th className="text-left p-5">Action</th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.map((item) => {
              const status = getStatus(item);

              return (
                <tr
                  key={item._id}
                  className="
                    border-t
                    border-slate-200
                    dark:border-slate-800
                  "
                >
                  <td className="p-5">{item.name}</td>

                  <td className="p-5">{item.category}</td>

                  <td className="p-5">{item.stock}</td>

                  <td className="p-5">{item.lowStockThreshold}</td>

                  <td className="p-5">
                    <span
                      className={`
                        inline-flex
                        items-center
                        gap-2

                        px-3
                        py-1

                        rounded-full

                        ${status.color}
                      `}
                    >
                      {status.icon}
                      {status.text}
                    </span>
                  </td>
                  <td className="p-5">
                    <button
                      onClick={() => {
                        setSelectedProduct(item);
                        setOpenModal(true);
                      }}
                      className="
      px-4 py-2

      rounded-xl

      bg-gradient-to-r
      from-cyan-500
      to-blue-500

      text-white

      text-sm
    "
                    >
                      Adjust Stock
                    </button>
                  </td>
                </tr>
              );
            })}
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

export default InventoryTable;
