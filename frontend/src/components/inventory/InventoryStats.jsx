import { Boxes, AlertTriangle, PackageCheck, PackageX } from "lucide-react";

const InventoryStats = ({ inventory }) => {
  const totalProducts = inventory.length;

  const lowStock = inventory.filter(
    (item) => item.stock > 0 && item.stock <= item.lowStockThreshold,
  ).length;

  const outOfStock = inventory.filter((item) => item.stock === 0).length;

  const totalStock = inventory.reduce((acc, item) => acc + item.stock, 0);

  const stats = [
    {
      title: "Total Products",
      value: totalProducts,
      icon: Boxes,
      color: "from-violet-500 to-purple-500",
    },
    {
      title: "Total Units",
      value: totalStock,
      icon: PackageCheck,
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "Low Stock",
      value: lowStock,
      icon: AlertTriangle,
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: "Out of Stock",
      value: outOfStock,
      icon: PackageX,
      color: "from-red-500 to-pink-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="
            rounded-3xl
            p-6

            bg-white/70
            dark:bg-slate-900/70

            backdrop-blur-xl

            border
            border-slate-200
            dark:border-slate-800
          "
        >
          <div className="flex justify-between">
            <div>
              <p className="text-slate-500 text-sm">{stat.title}</p>

              <h2 className="text-3xl font-bold mt-2">{stat.value}</h2>
            </div>

            <div
              className={`
                h-14 w-14

                rounded-2xl

                bg-gradient-to-r ${stat.color}

                flex
                items-center
                justify-center
              `}
            >
              <stat.icon size={26} className="text-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InventoryStats;
