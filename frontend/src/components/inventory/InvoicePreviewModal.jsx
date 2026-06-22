import { X } from "lucide-react";

const InvoicePreviewModal = ({
  isOpen,
  onClose,
  products,
  setProducts,
  onConfirm,
}) => {
  if (!isOpen) return null;

  const handleChange = (index, field, value) => {
    const updatedProducts = [...products];

    updatedProducts[index][field] = field === "name" ? value : Number(value);

    setProducts(updatedProducts);
  };

  return (
    <div
      className="
        fixed inset-0 z-50

        bg-black/60

        flex
        items-center
        justify-center

        p-4
      "
    >
      <div
        className="
          w-full
          max-w-4xl

          bg-white

          rounded-3xl

          shadow-2xl

          overflow-hidden
        "
      >
        {/* Header */}

        <div
          className="
            flex
            justify-between
            items-center

            p-6

            border-b
          "
        >
          <div>
            <h2
              className="
                text-2xl
                font-bold
              "
            >
              Invoice Preview
            </h2>

            <p
              className="
                text-gray-500
                mt-1
              "
            >
              Verify extracted products before updating inventory
            </p>
          </div>

          <button
            onClick={onClose}
            className="
              p-2

              rounded-xl

              hover:bg-gray-100
            "
          >
            <X size={24} />
          </button>
        </div>

        {/* Body */}

        <div
          className="
            p-6

            overflow-x-auto
          "
        >
          <table
            className="
              w-full
            "
          >
            <thead>
              <tr
                className="
                  border-b
                "
              >
                <th
                  className="
                    py-3
                    text-left
                  "
                >
                  Product
                </th>

                <th
                  className="
                    py-3
                    text-left
                  "
                >
                  Quantity
                </th>

                <th
                  className="
                    py-3
                    text-left
                  "
                >
                  Purchase Price
                </th>
              </tr>
            </thead>

            <tbody>
              {products.map((product, index) => (
                <tr
                  key={index}
                  className="
                      border-b
                    "
                >
                  <td
                    className="
                        py-4
                      "
                  >
                    <input
                      type="text"
                      value={product.name}
                      onChange={(e) =>
                        handleChange(index, "name", e.target.value)
                      }
                      className="
                          w-full

                          border

                          rounded-xl

                          px-4
                          py-2
                        "
                    />
                  </td>

                  <td>
                    <input
                      type="number"
                      value={product.quantity}
                      onChange={(e) =>
                        handleChange(index, "quantity", e.target.value)
                      }
                      className="
                          w-28

                          border

                          rounded-xl

                          px-4
                          py-2
                        "
                    />
                  </td>

                  <td>
                    <input
                      type="number"
                      value={product.purchasePrice}
                      onChange={(e) =>
                        handleChange(index, "purchasePrice", e.target.value)
                      }
                      className="
                          w-36

                          border

                          rounded-xl

                          px-4
                          py-2
                        "
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}

        <div
          className="
            flex
            justify-end
            gap-4

            p-6

            border-t
          "
        >
          <button
            onClick={onClose}
            className="
              px-6
              py-3

              rounded-xl

              bg-gray-100
            "
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="
              px-6
              py-3

              rounded-xl

              bg-violet-600

              text-white

              hover:bg-violet-700
            "
          >
            Confirm Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoicePreviewModal;
