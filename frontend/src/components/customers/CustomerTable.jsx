import { Pencil, Trash2, Users } from "lucide-react";
import toast from "react-hot-toast";
import usePagination from "../../hooks/usePagination";

import Pagination from "../common/Pagination";

import { deleteCustomer } from "../../services/customerService";

const CustomerTable = ({
  customers = [],
  fetchCustomers,
  setOpenModal,
  setSelectedCustomer,
}) => {
  const { currentPage, totalPages, paginatedData, nextPage, prevPage } =
    usePagination(customers, 5);
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this customer?",
    );

    if (!confirmDelete) return;

    try {
      const data = await deleteCustomer(id);

      toast.success(data.message || "Customer deleted");

      fetchCustomers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete customer");
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
      {/* Mobile View */}

      <div className="lg:hidden flex flex-col gap-2">
        {customers.length === 0 ? (
          <div className="p-10 text-center">
            <Users size={50} className="mx-auto text-slate-400" />

            <h2 className="mt-4 text-xl font-semibold">No Customers Found</h2>

            <p className="text-slate-500 mt-2">Add your first customer.</p>
          </div>
        ) : (
          paginatedData.map((customer) => (
            <div
              key={customer._id}
              className="
                p-5
                
                
                border-b
                border-slate-200
                dark:border-slate-800
              "
            >
              <h3 className="font-semibold text-lg">{customer.name}</h3>

              <div className="mt-4 space-y-2">
                <p>
                  <span className="font-medium">Phone:</span> {customer.phone}
                </p>

                <p>
                  <span className="font-medium">Email:</span>{" "}
                  {customer.email || "-"}
                </p>

                <p>
                  <span className="font-medium">Address:</span>{" "}
                  {customer.address || "-"}
                </p>
              </div>

              <div className="flex gap-3 mt-5">
                <button
                  onClick={() => {
                    setSelectedCustomer(customer);
                    setOpenModal(true);
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
                  <Pencil size={18} />
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(customer._id)}
                  className="
                    flex-1

                    flex
                    justify-center
                    items-center

                    gap-2

                    py-3

                    rounded-xl

                    bg-red-100
                    text-red-600
                  "
                >
                  <Trash2 size={18} />
                  Delete
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
              <th className="text-left p-5">Name</th>

              <th className="text-left p-5">Phone</th>

              <th className="text-left p-5">Email</th>

              <th className="text-left p-5">Address</th>

              <th className="text-left p-5">Actions</th>
            </tr>
          </thead>

          <tbody>
            {customers.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-20">
                  <Users
                    size={60}
                    className="
                      mx-auto
                      text-slate-400
                    "
                  />

                  <h2 className="mt-4 text-xl font-semibold">
                    No Customers Found
                  </h2>

                  <p className="text-slate-500 mt-2">
                    Add your first customer.
                  </p>
                </td>
              </tr>
            ) : (
              paginatedData.map((customer) => (
                <tr
                  key={customer._id}
                  className="
                    border-t
                    border-slate-200
                    dark:border-slate-800

                    hover:bg-slate-50
                    dark:hover:bg-slate-800/50
                  "
                >
                  <td className="p-5 font-medium">{customer.name}</td>

                  <td className="p-5">{customer.phone}</td>

                  <td className="p-5">{customer.email || "-"}</td>

                  <td className="p-5">{customer.address || "-"}</td>

                  <td className="p-5">
                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          setSelectedCustomer(customer);
                          setOpenModal(true);
                        }}
                        className="
                          p-2

                          rounded-lg

                          bg-blue-100
                          text-blue-600
                        "
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => handleDelete(customer._id)}
                        className="
                          p-2

                          rounded-lg

                          bg-red-100
                          text-red-600
                        "
                      >
                        <Trash2 size={18} />
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

export default CustomerTable;
