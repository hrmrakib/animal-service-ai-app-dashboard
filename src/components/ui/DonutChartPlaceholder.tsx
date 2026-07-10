type PercentageData = {
  product_orders_percentage: number;
  veterinary_percentage: number;
  transports_percentage: number;
  auctions_percentage: number;
  total_usage_count: number;
};

export function DonutChartPlaceholder({
  percentageData,
}: {
  percentageData: PercentageData;
}) {
  const {
    product_orders_percentage = 0,
    veterinary_percentage = 0,
    transports_percentage = 0,
    auctions_percentage = 0,
    total_usage_count = 0,
  } = percentageData || {};

  const segments = [
    {
      label: "Product Orders",
      value: product_orders_percentage,
      color: "#f59e0b",
    },
    { label: "Veterinary", value: veterinary_percentage, color: "#10b981" },
    { label: "Transports", value: transports_percentage, color: "#3b82f6" },
    { label: "Auctions", value: auctions_percentage, color: "#ef4444" },
  ];

  // Build conic-gradient stops cumulatively so segments always sum correctly
  let cumulative = 0;
  const gradientStops = segments
    .map((seg) => {
      const start = cumulative;
      cumulative += seg.value;
      return `${seg.color} ${start}% ${cumulative}%`;
    })
    .join(", ");

  return (
    <div className='flex flex-col h-full bg-white rounded-xl shadow-sm p-6'>
      <h3 className='text-lg font-semibold text-gray-900 mb-6'>
        Role Distribution
      </h3>

      <div className='flex-1 flex flex-col items-center justify-center'>
        {/* CSS Conic Gradient Donut Chart */}
        <div
          className='relative w-48 h-48 rounded-full flex items-center justify-center'
          style={{
            background: `conic-gradient(${gradientStops})`,
          }}
        >
          {/* Inner white circle for donut hole */}
          <div className='w-36 h-36 bg-white rounded-full flex flex-col items-center justify-center shadow-inner'>
            <span className='text-gray-500 text-sm font-medium'>Total</span>
            <span className='text-2xl font-bold text-gray-900'>
              {total_usage_count}
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className='flex flex-wrap justify-center gap-4 mt-8 w-full text-sm'>
          {segments.map((seg) => (
            <div key={seg.label} className='flex items-center gap-1.5'>
              <span
                className='w-2 h-2 rounded-full'
                style={{ backgroundColor: seg.color }}
              ></span>
              <span className='text-gray-500'>{seg.label}</span>
              <span className='font-semibold' style={{ color: seg.color }}>
                {seg.value.toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
