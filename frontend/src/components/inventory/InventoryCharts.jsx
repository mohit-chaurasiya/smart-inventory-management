import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const InventoryCharts = ({ inventory }) => {
  // console.log(inventory);
  // console.log(inventory[0]);
  const chartData = [
    {
      name: "In Stock",
      value: inventory.filter((i) => i.stock > i.lowStockThreshold).length,
    },

    {
      name: "Low Stock",
      value: inventory.filter(
        (i) => i.stock > 0 && i.stock <= i.lowStockThreshold,
      ).length,
    },

    {
      name: "Out Of Stock",
      value: inventory.filter((i) => i.stock === 0).length,
    },
  ];
  // console.log(chartData);

  return (
    <div
      className="
    rounded-3xl
    bg-white
    dark:bg-slate-900
    p-6
    border
    border-slate-200
    dark:border-slate-800
  "
    >
      <h2 className="text-xl font-bold mb-6">Stock Overview</h2>

      <div className="w-full h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              label
            >
              <Cell fill="#10b981" />
              <Cell fill="#f59e0b" />
              <Cell fill="#ef4444" />
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default InventoryCharts;
