import { useState } from "react";
import { UserRound, X } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import { createCustomer, updateCustomer } from "../../services/customerService";

const AddCustomerModal = ({
  setOpenModal,
  fetchCustomers,
  selectedCustomer,
  setSelectedCustomer,
}) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: selectedCustomer?.name || "",
    phone: selectedCustomer?.phone || "",
    email: selectedCustomer?.email || "",
    address: selectedCustomer?.address || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      let data;

      if (selectedCustomer) {
        data = await updateCustomer(selectedCustomer._id, formData);

        toast.success(data.message || "Customer Updated Successfully");
      } else {
        data = await createCustomer(formData);

        toast.success(data.message || "Customer Added Successfully");
      }

      fetchCustomers();

      setSelectedCustomer(null);

      setOpenModal(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        fixed inset-0 z-[100]

        bg-black/60
        backdrop-blur-sm

        flex
        items-center
        justify-center
        md:items-center
        md:justify-center
      "
    >
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="
          w-6/7

          md:max-w-xl

          max-h-[95vh]

          rounded-t-[32px]
          md:rounded-[32px]

          bg-white
          dark:bg-slate-900

          overflow-y-auto
        "
      >
        <div
          className="
            sticky top-0

            bg-white
            dark:bg-slate-900

            p-6

            border-b
            border-slate-200
            dark:border-slate-800

            flex
            justify-between
            items-center
          "
        >
          <div className="flex gap-4 items-center">
            <div
              className="
                h-12 w-12

                rounded-2xl

                bg-gradient-to-r
                from-violet-500
                to-fuchsia-500

                flex
                justify-center
                items-center
              "
            >
              <UserRound className="text-white" />
            </div>

            <div>
              <h2 className="text-xl font-bold">
                {selectedCustomer ? "Update Customer" : "Add Customer"}
              </h2>

              <p className="text-sm text-slate-500">Manage customers</p>
            </div>
          </div>

          <button
            onClick={() => {
              setSelectedCustomer(null);
              setOpenModal(false);
            }}
          >
            <X />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="
            p-6

            space-y-5
          "
        >
          <Input
            label="Customer Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          <Input
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />

          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />

          <div>
            <label className="text-sm font-medium">Address</label>

            <textarea
              rows="3"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="
                w-full

                mt-2

                rounded-2xl

                bg-slate-100
                dark:bg-slate-800

                p-4

                outline-none
              "
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => {
                setSelectedCustomer(null);
                setOpenModal(false);
              }}
              className="
                flex-1

                py-4

                rounded-2xl

                bg-slate-200
                dark:bg-slate-800
              "
            >
              Cancel
            </button>

            <button
              disabled={loading}
              className="
                flex-1

                py-4

                rounded-2xl

                text-white

                bg-gradient-to-r
                from-violet-500
                to-fuchsia-500
              "
            >
              {loading
                ? "Saving..."
                : selectedCustomer
                  ? "Update Customer"
                  : "Add Customer"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

const Input = ({ label, ...props }) => (
  <div>
    <label className="text-sm font-medium">{label}</label>

    <input
      {...props}
      required
      className="
        w-full

        mt-2

        rounded-2xl

        bg-slate-100
        dark:bg-slate-800

        px-5
        py-4

        outline-none
      "
    />
  </div>
);

export default AddCustomerModal;
