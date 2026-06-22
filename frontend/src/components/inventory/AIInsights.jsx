import {
  Sparkles,
  AlertTriangle,
  PackageX,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";

const AIInsights = ({ inventory = [] }) => {
  const lowStockProducts = inventory.filter(
    (item) => item.stock <= item.lowStockThreshold,
  );

  const outOfStockProducts = inventory.filter((item) => item.stock === 0);

  const overStockProducts = inventory.filter((item) => item.stock > 100);

  const totalProducts = inventory.length;

  const healthyProducts = inventory.filter(
    (item) => item.stock > item.lowStockThreshold,
  ).length;

  const healthScore =
    totalProducts === 0
      ? 0
      : Math.round((healthyProducts / totalProducts) * 100);

  return (
    <div
      className="
        rounded-3xl

        bg-gradient-to-br
        from-violet-600
        via-indigo-600
        to-blue-600

        text-white

        p-6

        shadow-xl
      "
    >
      {/* Header */}

      <div className="flex items-center gap-3">
        <div
          className="
            h-12 w-12

            rounded-2xl

            bg-white/20

            flex
            items-center
            justify-center
          "
        >
          <Sparkles size={24} />
        </div>

        <div>
          <h2 className="text-2xl font-bold">AI Assistant</h2>

          <p className="text-white/80 text-sm">Smart inventory insights</p>
        </div>
      </div>

      {/* Insights */}

      <div className="mt-8 space-y-5">
        {/* Health Score */}

        <div
          className="
            rounded-2xl

            bg-white/10

            p-4
          "
        >
          <div className="flex gap-3">
            <ShieldCheck />

            <div>
              <h3 className="font-semibold">Inventory Health</h3>

              <p className="text-sm text-white/80">
                Health Score: {healthScore}%
              </p>
            </div>
          </div>
        </div>

        {/* Low Stock */}

        <div
          className="
            rounded-2xl

            bg-white/10

            p-4
          "
        >
          <div className="flex gap-3">
            <AlertTriangle />

            <div>
              <h3 className="font-semibold">Low Stock Alert</h3>

              <p className="text-sm text-white/80">
                {lowStockProducts.length} products need restocking.
              </p>
            </div>
          </div>
        </div>

        {/* Out Of Stock */}

        <div
          className="
            rounded-2xl

            bg-white/10

            p-4
          "
        >
          <div className="flex gap-3">
            <PackageX />

            <div>
              <h3 className="font-semibold">Out Of Stock</h3>

              <p className="text-sm text-white/80">
                {outOfStockProducts.length} products unavailable.
              </p>
            </div>
          </div>
        </div>

        {/* Overstock */}

        <div
          className="
            rounded-2xl

            bg-white/10

            p-4
          "
        >
          <div className="flex gap-3">
            <TrendingUp />

            <div>
              <h3 className="font-semibold">Overstock Alert</h3>

              <p className="text-sm text-white/80">
                {overStockProducts.length} products have excess stock.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}

      <div
        className="
          mt-8

          rounded-2xl

          bg-white/10

          p-4
        "
      >
        <h3 className="font-semibold">AI Recommendation</h3>

        <ul className="mt-3 space-y-2 text-sm text-white/90">
          {lowStockProducts.length > 0 && (
            <li>• Restock low stock products immediately.</li>
          )}

          {overStockProducts.length > 0 && (
            <li>• Reduce purchase of overstocked products.</li>
          )}

          {outOfStockProducts.length > 0 && (
            <li>• Refill unavailable products to avoid sales loss.</li>
          )}

          {healthScore >= 80 && <li>• Inventory health is good.</li>}
        </ul>
      </div>
    </div>
  );
};

export default AIInsights;
