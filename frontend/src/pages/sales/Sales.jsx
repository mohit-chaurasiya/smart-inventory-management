import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import SalesStats from "../../components/sales/SalesStats";
import SalesTable from "../../components/sales/SalesTable";
import AddSaleModal from "../../components/sales/AddSaleModal";
import { downloadInvoice as downloadInvoiceService } from "../../services/salesService";

import { getSales, getTodaySales } from "../../services/salesService";
import SaleDetailsModal from "../../components/sales/SaleDetailsModal";

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [stats, setStats] = useState({});
  const [selectedSale, setSelectedSale] = useState(null);

  const [openDetails, setOpenDetails] = useState(false);

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetchSales();
    fetchStats();
  }, []);

  const fetchSales = async () => {
    try {
      const data = await getSales();

      setSales(data.sales);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStats = async () => {
    try {
      const data = await getTodaySales();

      setStats(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Sales</h1>

          <p className="text-slate-500 mt-2">Manage all sales and invoices</p>
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
          New Sale
        </button>
      </div>

      <SalesStats stats={stats} sales={sales} />

      <SalesTable
        sales={sales}
        setSelectedSale={setSelectedSale}
        setOpenDetails={setOpenDetails}
      />

      {openModal && (
        <AddSaleModal
          setOpenModal={setOpenModal}
          fetchSales={fetchSales}
          fetchStats={fetchStats}
        />
      )}

      {openDetails && (
        <SaleDetailsModal sale={selectedSale} setOpenDetails={setOpenDetails} />
      )}
    </div>
  );
};

export default Sales;
