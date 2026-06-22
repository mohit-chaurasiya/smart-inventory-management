import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Minus, X, Package } from "lucide-react";
import toast from "react-hot-toast";

import { adjustStock } from "../../services/inventoryService";

const StockAdjustmentModal = ({
  setOpenModal,
  selectedProduct,
  fetchInventory,
}) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    quantity: "",
    operation: "add",
    note: "",
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

      const data = await adjustStock(selectedProduct._id, formData);

      toast.success(data.message || "Stock Updated");

      fetchInventory();

      setOpenModal(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update stock");
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
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
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
        {/* Header */}

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

                bg-linear-to-r
                from-cyan-500
                to-blue-500

                flex
                justify-center
                items-center
              "
            >
              <Package className="text-white" />
            </div>

            <div>
              <h2 className="text-xl font-bold">Adjust Stock</h2>

              <p className="text-sm text-slate-500">{selectedProduct?.name}</p>
            </div>
          </div>

          <button onClick={() => setOpenModal(false)}>
            <X />
          </button>
        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="
            p-6

            space-y-6
          "
        >
          {/* Current Stock */}

          <div
            className="
              rounded-3xl

              p-6

              bg-slate-100
              dark:bg-slate-800
            "
          >
            <p className="text-slate-500">Current Stock</p>

            <h2 className="text-4xl font-bold mt-2">
              {selectedProduct?.stock}
            </h2>
          </div>

          {/* Operation */}

          <div>
            <label className="text-sm font-medium">Operation</label>

            <div className="grid grid-cols-2 gap-4 mt-3">
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    operation: "add",
                  })
                }
                className={`
                  p-4

                  rounded-2xl

                  flex
                  items-center
                  justify-center

                  gap-2

                  ${
                    formData.operation === "add"
                      ? `
                      bg-emerald-500
                      text-white
                    `
                      : `
                      bg-slate-100
                      dark:bg-slate-800
                    `
                  }
                `}
              >
                <Plus />
                Add
              </button>

              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    operation: "remove",
                  })
                }
                className={`
                  p-4

                  rounded-2xl

                  flex
                  items-center
                  justify-center

                  gap-2

                  ${
                    formData.operation === "remove"
                      ? `
                      bg-red-500
                      text-white
                    `
                      : `
                      bg-slate-100
                      dark:bg-slate-800
                    `
                  }
                `}
              >
                <Minus />
                Remove
              </button>
            </div>
          </div>

          {/* Quantity */}

          <div>
            <label className="text-sm font-medium">Quantity</label>

            <input
              type="number"
              required
              min="1"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Enter quantity"
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

          {/* Notes */}

          <div>
            <label className="text-sm font-medium">Notes</label>

            <textarea
              rows="3"
              name="note"
              value={formData.note}
              onChange={handleChange}
              placeholder="Reason for stock adjustment"
              className="
                w-full

                mt-2

                rounded-2xl

                bg-slate-100
                dark:bg-slate-800

                p-4

                outline-none

                resize-none
              "
            />
          </div>

          {/* Buttons */}

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setOpenModal(false)}
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

                bg-linear-to-r
                from-cyan-500
                to-blue-500
              "
            >
              {loading ? "Updating..." : "Update Stock"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default StockAdjustmentModal;
