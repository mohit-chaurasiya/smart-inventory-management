const StatsCard = ({ title, value, icon: Icon, color, bgColor }) => {
  return (
    <div
      className="
        p-6

        rounded-3xl

        bg-white/70
        dark:bg-slate-900/70

        backdrop-blur-xl

        border
        border-slate-200
        dark:border-slate-800

        shadow-sm

        hover:-translate-y-1
        hover:shadow-xl

        transition-all
        duration-300
      "
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-500 text-sm">{title}</p>

          <h2 className="text-3xl font-bold mt-3">{value}</h2>
        </div>

        <div
          className={`
            w-14 h-14

            rounded-2xl

            flex
            items-center
            justify-center

            ${bgColor}
          `}
        >
          <Icon className={color} size={28} />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
