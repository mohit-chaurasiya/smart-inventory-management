import { Pencil, Trash2, PackageOpen } from "lucide-react";
import toast from "react-hot-toast";

import { deleteProduct } from "../../services/productService";

const ProductTable = ({
  products = [],
  fetchProducts,
  setOpenModal,
  setSelectedProduct,
}) => {
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmDelete) return;

    try {
      const data = await deleteProduct(id);

      toast.success(data.message || "Product deleted successfully");

      fetchProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete product");
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

      <div className="lg:hidden">
        {products.length === 0 ? (
          <div className="p-10 text-center">
            <PackageOpen size={50} className="mx-auto text-slate-400" />

            <h2 className="mt-4 text-xl font-semibold">No Products Found</h2>

            <p className="text-slate-500 mt-2">Add your first product.</p>
          </div>
        ) : (
          products.map((product) => (
            <div
              key={product._id}
              className="
                p-5

                border-b
                border-slate-200
                dark:border-slate-800
              "
            >
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{product.name}</h3>

                  <p className="text-sm text-slate-500">{product.sku}</p>
                </div>

                <div
                  className={`
                    p-3
                    text-center

                    rounded-full

                    text-sm

                    ${
                      product.stock <= product.lowStockThreshold
                        ? `
                          bg-red-100
                          text-red-600
                        `
                        : `
                          bg-emerald-100
                          text-emerald-600
                        `
                    }
                  `}
                >
                  {product.stock}
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <p>
                  <span className="font-medium">Category:</span>{" "}
                  {product.category}
                </p>

                <p>
                  <span className="font-medium">Price:</span> ₹
                  {product.sellingPrice}
                </p>
              </div>

              <div className="flex gap-3 mt-5">
                <button
                  onClick={() => {
                    setSelectedProduct(product);
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
                  onClick={() => handleDelete(product._id)}
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
              <th className="text-left p-5">Product</th>

              <th className="text-left p-5">SKU</th>

              <th className="text-left p-5">Category</th>

              <th className="text-left p-5">Stock</th>

              <th className="text-left p-5">Price</th>

              <th className="text-left p-5">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-20">
                  <PackageOpen
                    size={60}
                    className="
                      mx-auto
                      text-slate-400
                    "
                  />

                  <h2 className="mt-4 text-xl font-semibold">
                    No Products Found
                  </h2>

                  <p className="text-slate-500 mt-2">Add your first product.</p>
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr
                  key={product._id}
                  className="
                    border-t
                    border-slate-200
                    dark:border-slate-800

                    hover:bg-slate-50
                    dark:hover:bg-slate-800/50
                  "
                >
                  <td className="p-5 font-medium">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image || "https://placehold.co/50x50"}
                        className="
      w-12 h-12

      rounded-xl

      object-cover
    "
                      />

                      <span>{product.name}</span>
                    </div>
                  </td>

                  <td className="p-5">{product.sku}</td>

                  <td className="p-5">{product.category}</td>

                  <td className="p-5">
                    <span
                      className={`
                        px-3 py-1

                        rounded-full

                        text-sm

                        ${
                          product.stock <= product.lowStockThreshold
                            ? `
                              bg-red-100
                              text-red-600
                            `
                            : `
                              bg-emerald-100
                              text-emerald-600
                            `
                        }
                      `}
                    >
                      {product.stock}
                    </span>
                  </td>

                  <td className="p-5">₹{product.sellingPrice}</td>

                  <td className="p-5">
                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          setSelectedProduct(product);
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
                        onClick={() => handleDelete(product._id)}
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
      </div>
    </div>
  );
};

export default ProductTable;
