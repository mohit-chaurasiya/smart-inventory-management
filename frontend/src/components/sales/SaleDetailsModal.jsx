import { X, Receipt } from "lucide-react";
import { motion } from "framer-motion";

const SaleDetailsModal = ({ sale, setOpenDetails }) => {
  console.log("Modal Sale:", sale);
  if (!sale) return null;

  return (
    <div
      className="
        fixed inset-0 z-[100]

        bg-black/60
        backdrop-blur-sm

        flex
        items-end
        md:items-center
        md:justify-center
      "
    >
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        className="
          w-full

          md:max-w-3xl

          max-h-[90vh]

          overflow-y-auto

          rounded-t-[32px]
          md:rounded-[32px]

          bg-white
          dark:bg-slate-900

          p-6
        "
      >
        {/* Header */}

        <div className="flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <div
              className="
                h-12 w-12

                rounded-2xl

                bg-gradient-to-r
                from-emerald-500
                to-teal-500

                flex
                justify-center
                items-center
              "
            >
              <Receipt className="text-white" />
            </div>

            <div>
              <h2 className="text-2xl font-bold">Sale Details</h2>

              <p className="text-slate-500">
                Invoice #{sale.invoiceNumber || sale._id}
              </p>
            </div>
          </div>

          <button onClick={() => setOpenDetails(false)}>
            <X />
          </button>
        </div>

        {/* Customer */}

        <div
          className="
            mt-8

            rounded-2xl

            bg-slate-100
            dark:bg-slate-800

            p-5
          "
        >
          <h3 className="font-semibold text-lg">Customer Details</h3>

          <div className="mt-4 space-y-2">
            <p>Name: {sale.customer?.name || "Walk-in Customer"}</p>

            <p>Phone: {sale.customer?.phone || "-"}</p>

            <p>Payment Method: {sale.paymentMethod}</p>

            <p>Date: {new Date(sale.createdAt).toLocaleString()}</p>
          </div>
        </div>

        {/* Items */}

        <div className="mt-8">
          <h3 className="font-semibold text-lg">Products</h3>

          <div className="mt-4 space-y-4">
            {sale.items.map((item) => (
              <div
                key={item._id}
                className="
                  rounded-2xl

                  bg-slate-100
                  dark:bg-slate-800

                  p-5

                  flex
                  justify-between
                  items-center
                "
              >
                <div>
                  <h4 className="font-medium">{item.product?.name}</h4>

                  <p className="text-sm text-slate-500">Qty: {item.quantity}</p>
                </div>

                <div className="text-right">
                  <p>₹{item.price}</p>

                  <p className="font-semibold">₹{item.subtotal}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}

        <div
          className="
            mt-8

            rounded-2xl

            bg-slate-100
            dark:bg-slate-800

            p-6
          "
        >
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Total Amount</span>
              <span>₹{sale.totalAmount}</span>
            </div>

            <div className="flex justify-between">
              <span>Paid Amount</span>
              <span>₹{sale.paidAmount}</span>
            </div>

            <div className="flex justify-between">
              <span>Due Amount</span>
              <span>₹{sale.dueAmount}</span>
            </div>

            <div className="flex justify-between">
              <span>Status</span>

              <span className="capitalize">{sale.paymentStatus}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SaleDetailsModal;
