import { useState } from "react";
import { Package2, X } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import { createProduct, updateProduct } from "../../services/productService";

const AddProductModal = ({
  setOpenModal,
  fetchProducts,
  selectedProduct,
  setSelectedProduct,
}) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: selectedProduct?.name || "",
    category: selectedProduct?.category || "",
    purchasePrice: selectedProduct?.purchasePrice || "",
    sellingPrice: selectedProduct?.sellingPrice || "",
    image: null,
    stock: selectedProduct?.stock || "",
    lowStockThreshold: selectedProduct?.lowStockThreshold || "",
    description: selectedProduct?.description || "",
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

      if (selectedProduct) {
        data = await updateProduct(selectedProduct._id, formData);

        toast.success(data.message || "Product Updated Successfully");
      } else {
        data = await createProduct(formData);

        toast.success(data.message || "Product Added Successfully");
      }

      fetchProducts();

      setSelectedProduct(null);

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

    flex
    items-center
    justify-center
    md:items-center
    md:justify-center

    bg-black/60
    backdrop-blur-md   "
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="
  w-6/7

  h-[90vh]
  

  md:h-auto

  md:max-w-3xl

  rounded-t-[32px]
  md:rounded-[32px]

  bg-white
  dark:bg-slate-900

  border
  border-slate-200
  dark:border-slate-800

  shadow-2xl

  overflow-hidden

  flex
  flex-col
"
      >
        {/* Header */}

        <div
          className="
             sticky top-0 z-10

  bg-white
  dark:bg-slate-900

  flex justify-between items-center

  px-5 py-4 md:px-8 md:py-6

  border-b
  border-slate-200
  dark:border-slate-800
          "
        >
          <div className="flex items-center gap-4">
            <div
              className="
                lg:h-14 
                lg:w-14

                h-10

                rounded-2xl

                bg-gradient-to-r
                from-emerald-500
                to-teal-500

                flex
                items-center
                justify-center
              "
            >
              <Package2 size={28} className="text-white" />
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-bold">
                {selectedProduct ? "Update Product" : "Add Product"}
              </h2>

              <p className="text-sm text-slate-500">
                {selectedProduct
                  ? "Update inventory item"
                  : "Add new inventory item"}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setSelectedProduct(null);
              setOpenModal(false);
            }}
            className="
              p-3

              rounded-xl

              hover:bg-slate-100
              dark:hover:bg-slate-800
            "
          >
            <X />
          </button>
        </div>

        {/* Form */}

        <div
          className="flex-1

    overflow-y-auto

    px-5
    py-4

    md:px-8
    md:py-6"
        >
          <form onSubmit={handleSubmit} className="space-y-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-medium">Product Image</label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      image: e.target.files[0],
                    })
                  }
                  className="
      w-full

      mt-2

      rounded-2xl

      bg-slate-100
      dark:bg-slate-800

      p-4
    "
                />
              </div>
              <Input
                label="Product Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />

              <Input
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              />

              <Input
                label="Purchase Price"
                name="purchasePrice"
                type="number"
                value={formData.purchasePrice}
                onChange={handleChange}
              />

              <Input
                label="Selling Price"
                name="sellingPrice"
                type="number"
                value={formData.sellingPrice}
                onChange={handleChange}
              />

              <Input
                label="Stock"
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleChange}
              />

              <Input
                label="Low Stock Alert"
                name="lowStockThreshold"
                type="number"
                value={formData.lowStockThreshold}
                onChange={handleChange}
              />
            </div>

            {/* Description */}

            <div>
              <label className="text-sm font-medium">Description</label>

              <textarea
                rows="2"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter product description..."
                className="
                  w-full

                  mt-2

                  rounded-2xl

                  bg-slate-100
                  dark:bg-slate-800

                  px-5
                  py-4

                  outline-none

                  resize-none

                  focus:ring-2
                  focus:ring-emerald-500
                "
              />
            </div>

            {/* Buttons */}

            <div
              className="
    bottom-0

    bg-white
    dark:bg-slate-900

    flex gap-4

    pt-4
    pb-2

    border-t
    border-slate-200
    dark:border-slate-800"
            >
              <button
                type="button"
                onClick={() => {
                  setSelectedProduct(null);
                  setOpenModal(false);
                }}
                className="
                  flex-1

                  py-4

                  rounded-2xl

                  bg-slate-200
                  dark:bg-slate-800

                  font-medium
                "
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="
                  flex-1

                  py-4

                  rounded-2xl

                  text-white
                  font-semibold

                  bg-gradient-to-r
                  from-emerald-500
                  to-teal-500

                  hover:scale-[1.02]

                  transition-all

                  disabled:opacity-50
                "
              >
                {loading
                  ? selectedProduct
                    ? "Updating..."
                    : "Adding..."
                  : selectedProduct
                    ? "Update Product"
                    : "Add Product"}
              </button>
            </div>
          </form>
        </div>
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

        focus:ring-2
        focus:ring-emerald-500
      "
    />
  </div>
);

export default AddProductModal;
