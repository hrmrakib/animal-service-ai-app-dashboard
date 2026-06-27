export function DonutChartPlaceholder() {
  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Role Distribution</h3>
      
      <div className="flex-1 flex flex-col items-center justify-center">
        {/* CSS Conic Gradient Donut Chart */}
        <div className="relative w-48 h-48 rounded-full flex items-center justify-center"
             style={{
               background: "conic-gradient(#f59e0b 0% 40%, #10b981 40% 70%, #3b82f6 70% 85%, #ef4444 85% 100%)"
             }}>
          {/* Inner white circle for donut hole */}
          <div className="w-36 h-36 bg-white rounded-full flex flex-col items-center justify-center shadow-inner">
            <span className="text-gray-500 text-sm font-medium">Total</span>
            <span className="text-2xl font-bold text-gray-900">12540</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-4 mt-8 w-full text-sm">
          <div className="flex items-center gap-1.5">
             <span className="w-2 h-2 rounded-full bg-[#f59e0b]"></span>
             <span className="text-gray-500">Buyer</span>
             <span className="font-semibold text-[#f59e0b]">40%</span>
          </div>
          <div className="flex items-center gap-1.5">
             <span className="w-2 h-2 rounded-full bg-[#10b981]"></span>
             <span className="text-gray-500">Seller</span>
             <span className="font-semibold text-[#10b981]">30%</span>
          </div>
          <div className="flex items-center gap-1.5">
             <span className="w-2 h-2 rounded-full bg-[#3b82f6]"></span>
             <span className="text-gray-500">Vet</span>
             <span className="font-semibold text-[#3b82f6]">15%</span>
          </div>
          <div className="flex items-center gap-1.5">
             <span className="w-2 h-2 rounded-full bg-[#ef4444]"></span>
             <span className="text-gray-500">Transport</span>
             <span className="font-semibold text-[#ef4444]">15%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
