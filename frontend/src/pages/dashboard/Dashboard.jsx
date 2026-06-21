import { useEffect, useState } from "react";

import StatsCard from "../../components/dashboard/StatsCard";

import { Package, ShoppingCart, AlertTriangle, Boxes } from "lucide-react";

import { getDashboardStats } from "../../services/dashboardService";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const data = await getDashboardStats();

      setStats(data.stats);
      setTransactions(data.recentTransactions);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="space-y-8">
      {/* Cards */}

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-4
          gap-6
        "
      >
        <StatsCard
          title="Products"
          value={stats?.totalProducts || 0}
          icon={Package}
          color="text-emerald-500"
          bgColor="bg-emerald-100 dark:bg-emerald-500/10"
        />

        <StatsCard
          title="Inventory Qty"
          value={stats?.totalInventoryQuantity || 0}
          icon={Boxes}
          color="text-violet-500"
          bgColor="bg-violet-100 dark:bg-violet-500/10"
        />

        <StatsCard
          title="Inventory Value"
          value={`₹${stats?.totalInventoryValue}` || 0}
          icon={ShoppingCart}
          color="text-orange-500"
          bgColor="bg-orange-100 dark:bg-orange-500/10"
        />

        <StatsCard
          title="Low Stock"
          value={stats?.lowStockProducts || 0}
          icon={AlertTriangle}
          color="text-red-500"
          bgColor="bg-red-100 dark:bg-red-500/10"
        />
      </div>

      {/* Recent Transactions */}

      <div
        className="
          rounded-3xl

          bg-white/70
          dark:bg-slate-900/70

          backdrop-blur-xl

          border
          border-slate-200
          dark:border-slate-800

          p-6
        "
      >
        <h2 className="text-xl font-semibold mb-6">Recent Transactions</h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800">
                <th className="text-left py-4">Product</th>

                <th className="text-left py-4">Type</th>

                <th className="text-left py-4">Qty</th>

                <th className="text-left py-4">Date</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((transaction) => (
                <tr
                  key={transaction._id}
                  className="
                    border-b
                    border-slate-100
                    dark:border-slate-800
                  "
                >
                  <td className="py-4">{transaction.product?.name || null}</td>

                  <td className="py-4 capitalize">
                    {transaction.type || null}
                  </td>

                  <td className="py-4">{transaction.quantity || 0}</td>

                  <td className="py-4">
                    {new Date(transaction.createdAt).toLocaleDateString() ||
                      "--"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
