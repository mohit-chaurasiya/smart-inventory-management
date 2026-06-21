import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import ProductTable from "../../components/products/ProductTable";
import AddProductModal from "../../components/products/AddProductModal";

import { getProducts } from "../../services/productService";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();

      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>

          <p className="text-slate-500 mt-2">Manage all products.</p>
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="
          flex items-center gap-2

          px-5 py-3

          rounded-2xl

          text-white

          bg-linear-to-r
          from-emerald-500
          to-teal-500
        "
        >
          <Plus size={20} />
          Add Product
        </button>
      </div>

      {/* Table */}

      <ProductTable
        products={products}
        fetchProducts={fetchProducts}
        setOpenModal={setOpenModal}
        setSelectedProduct={setSelectedProduct}
      />

      {/* Modal */}

      {openModal && (
        <AddProductModal
          setOpenModal={setOpenModal}
          fetchProducts={fetchProducts}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
        />
      )}
    </div>
  );
};

export default Products;
