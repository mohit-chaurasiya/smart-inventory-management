import { useEffect, useState } from "react";
import { Boxes } from "lucide-react";

import InventoryTable from "../../components/inventory/InventoryTable";
import InventoryStats from "../../components/inventory/InventoryStats";
import StockAdjustmentModal from "../../components/inventory/StockAdjustmentModal";
import TransactionTable from "../../components/inventory/TransactionTable";
import InventoryCharts from "../../components/inventory/InventoryCharts";
import {
  extractInvoice,
  updateInventoryFromInvoice,
} from "../../services/invoiceService";

import { getInventory, getTransactions } from "../../services/inventoryService";
import AIInsights from "../../components/inventory/AIInsights";
import InvoicePreviewModal from "../../components/inventory/InvoicePreviewModal";
import toast from "react-hot-toast";

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const [extractedProducts, setExtractedProducts] = useState([]);

  useEffect(() => {
    fetchInventory();
    fetchTransactions();
  }, []);

  const fetchInventory = async () => {
    try {
      const data = await getInventory();

      setInventory(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const data = await getTransactions();
      setTransactions(data.transactions);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInvoiceUpload = async (e) => {
    try {
      setLoading(true);

      const file = e.target.files[0];

      if (!file) return;

      const formData = new FormData();

      formData.append("file", file);

      const data = await extractInvoice(formData);

      console.log(data);

      setExtractedProducts(data.products);
      setIsPreviewOpen(true);
    } catch (error) {
      console.log("Invoice Error:");

      console.log(error);

      console.log(error.message);

      console.log(error.stack);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmUpdate = async () => {
    try {
      const response = await updateInventoryFromInvoice(extractedProducts);

      toast.success(response.message);

      setIsPreviewOpen(false);

      setExtractedProducts([]);

      // Refresh data
      await fetchInventory();
      await fetchTransactions();
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message || "Failed to update inventory",
      );
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold">Inventory</h1>

        <p className="text-slate-500 mt-2">Track and manage stock levels</p>
      </div>

      <InventoryStats inventory={inventory} />
      <div className="flex justify-end">
        <label
          htmlFor="invoice-upload"
          className="
      px-5 py-3

      rounded-2xl

      bg-violet-600

      text-white

      cursor-pointer

      hover:bg-violet-700
    "
        >
          Upload Invoice
        </label>

        <input
          id="invoice-upload"
          type="file"
          accept=".pdf,.png,.jpg,.jpeg"
          className="hidden"
          onChange={handleInvoiceUpload}
        />

        <InvoicePreviewModal
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          products={extractedProducts}
          setProducts={setExtractedProducts}
          onConfirm={handleConfirmUpdate}
        />
      </div>
      <InventoryTable
        inventory={inventory}
        fetchInventory={fetchInventory}
        setOpenModal={setOpenModal}
        setSelectedProduct={setSelectedProduct}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InventoryCharts inventory={inventory} />

        <AIInsights inventory={inventory} />
      </div>

      {openModal && (
        <StockAdjustmentModal
          setOpenModal={setOpenModal}
          selectedProduct={selectedProduct}
          fetchInventory={fetchInventory}
        />
      )}

      <TransactionTable transactions={transactions} />
    </div>
  );
};

export default Inventory;
