import { useEffect, useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

import { createSale } from "../../services/salesService";
import { getProducts } from "../../services/productService";
import { getCustomers } from "../../services/customerService";

const AddSaleModal = ({ setOpenModal, fetchSales, fetchStats }) => {
  const [loading, setLoading] = useState(false);

  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);

  const [formData, setFormData] = useState({
    customer: "",
    paymentMethod: "cash",
    paidAmount: 0,
  });

  const [items, setItems] = useState([
    {
      product: "",
      quantity: 1,
      price: 0,
      subtotal: 0,
    },
  ]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const productRes = await getProducts();
      const customerRes = await getCustomers();

      setProducts(productRes.products);
      setCustomers(customerRes.customers);
    } catch (error) {
      console.log(error);
    }
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];

    updatedItems[index][field] = value;

    // Auto price
    if (field === "product") {
      const selectedProduct = products.find((p) => p._id === value);

      if (selectedProduct) {
        updatedItems[index].price = selectedProduct.sellingPrice;

        updatedItems[index].subtotal =
          selectedProduct.sellingPrice * updatedItems[index].quantity;
      }
    }

    // Auto subtotal

    if (field === "quantity") {
      updatedItems[index].subtotal = updatedItems[index].price * value;
    }

    setItems(updatedItems);
  };

  const addItem = () => {
    setItems([
      ...items,
      {
        product: "",
        quantity: 1,
        price: 0,
        subtotal: 0,
      },
    ]);
  };

  const removeItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);

    setItems(updatedItems);
  };

  const totalAmount = items.reduce((acc, item) => acc + item.subtotal, 0);

  const dueAmount = totalAmount - Number(formData.paidAmount || 0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        ...formData,
        items,
      };

      const data = await createSale(payload);

      toast.success(data.message);

      fetchSales();
      fetchStats();

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
        fixed inset-0 z-50

        bg-black/60

        flex
        items-end
        md:items-center
        md:justify-center
      "
    >
      <div
        className="
          w-full

          md:max-w-4xl

          max-h-[95vh]

          overflow-y-auto

          rounded-t-[32px]
          md:rounded-[32px]

          bg-white
          dark:bg-slate-900

          p-6
        "
      >
        {/* Header */}

        <div className="flex justify-between">
          <div>
            <h2 className="text-2xl font-bold">New Sale</h2>

            <p className="text-slate-500">Create a new sale</p>
          </div>

          <button onClick={() => setOpenModal(false)}>
            <X />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 mt-8">
          {/* Customer */}

          <select
            value={formData.customer}
            onChange={(e) =>
              setFormData({
                ...formData,
                customer: e.target.value,
              })
            }
            className="
              w-full

              p-4

              rounded-2xl

              bg-slate-100
              dark:bg-slate-800
            "
          >
            <option value="">Walk-in Customer</option>

            {customers.map((customer) => (
              <option key={customer._id} value={customer._id}>
                {customer.name}
              </option>
            ))}
          </select>

          {/* Products */}

          {items.map((item, index) => (
            <div
              key={index}
              className="
                grid

                md:grid-cols-5

                gap-4

                p-4

                rounded-2xl

                bg-slate-100
                dark:bg-slate-800
              "
            >
              <select
                value={item.product}
                onChange={(e) =>
                  handleItemChange(index, "product", e.target.value)
                }
              >
                <option>Select Product</option>

                {products.map((product) => (
                  <option key={product._id} value={product._id}>
                    {product.name}
                  </option>
                ))}
              </select>

              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) =>
                  handleItemChange(index, "quantity", Number(e.target.value))
                }
              />

              <input readOnly value={item.price} />

              <input readOnly value={item.subtotal} />

              <button type="button" onClick={() => removeItem(index)}>
                <Trash2 />
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addItem}
            className="
              flex items-center gap-2

              px-5 py-3

              rounded-xl

              bg-blue-500

              text-white
            "
          >
            <Plus size={18} />
            Add Product
          </button>

          {/* Payment */}

          <div className="grid md:grid-cols-2 gap-5">
            <select
              value={formData.paymentMethod}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  paymentMethod: e.target.value,
                })
              }
            >
              <option value="cash">Cash</option>

              <option value="upi">UPI</option>

              <option value="card">Card</option>
            </select>

            <input
              type="number"
              placeholder="Paid Amount"
              value={formData.paidAmount}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  paidAmount: e.target.value,
                })
              }
            />
          </div>

          {/* Summary */}

          <div
            className="
              p-6

              rounded-2xl

              bg-slate-100
              dark:bg-slate-800
            "
          >
            <h3 className="font-bold">Total: ₹{totalAmount}</h3>

            <h3 className="mt-2">Due: ₹{dueAmount}</h3>
          </div>

          <button
            disabled={loading}
            className="
              w-full

              py-4

              rounded-2xl

              text-white

              bg-gradient-to-r
              from-emerald-500
              to-teal-500
            "
          >
            {loading ? "Creating..." : "Create Sale"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSaleModal;
