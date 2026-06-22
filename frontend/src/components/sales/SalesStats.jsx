import { IndianRupee, ShoppingCart, CreditCard, Receipt } from "lucide-react";

const SalesStats = ({ stats = {}, sales = [] }) => {
  const totalRevenue = sales.reduce((acc, sale) => acc + sale.totalAmount, 0);

  const pendingDue = sales.reduce((acc, sale) => acc + sale.dueAmount, 0);

  const cards = [
    {
      title: "Today's Revenue",
      value: `₹${stats.totalSales || 0}`,
      icon: IndianRupee,
      gradient: "from-emerald-500 to-teal-500",
    },

    {
      title: "Today's Transactions",
      value: stats.totalTransactions || 0,
      icon: ShoppingCart,
      gradient: "from-violet-500 to-fuchsia-500",
    },

    {
      title: "Pending Due",
      value: `₹${pendingDue}`,
      icon: CreditCard,
      gradient: "from-orange-500 to-red-500",
    },

    {
      title: "Total Revenue",
      value: `₹${totalRevenue}`,
      icon: Receipt,
      gradient: "from-cyan-500 to-blue-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
      {cards.map((card) => (
        <div
          key={card.title}
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
              <p className="text-sm text-slate-500">{card.title}</p>

              <h2 className="text-3xl font-bold mt-3">{card.value}</h2>
            </div>

            <div
              className={`
            h-14 w-14

            rounded-2xl

            bg-linear-to-r
            ${card.gradient}

            flex
            items-center
            justify-center
          `}
            >
              <card.icon className="text-white" size={28} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SalesStats;
