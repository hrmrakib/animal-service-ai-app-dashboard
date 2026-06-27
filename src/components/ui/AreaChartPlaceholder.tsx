export function AreaChartPlaceholder() {
  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-sm p-6 relative overflow-hidden">
      <div className="flex items-center justify-between mb-8 z-10">
        <h3 className="text-lg font-semibold text-gray-900">Revenue Analytics</h3>
        <div className="flex gap-2">
           <button className="px-4 py-1.5 text-sm font-medium rounded-md bg-brand-light text-brand">
             Yearly
           </button>
           <button className="px-4 py-1.5 text-sm font-medium rounded-md text-gray-500 hover:bg-gray-50 border border-transparent">
             Monthly
           </button>
        </div>
      </div>
      
      <div className="flex-1 w-full relative min-h-[200px] flex items-end justify-between px-4 pb-8 z-10">
         {/* Simplified SVG area chart representation */}
         <svg className="absolute inset-0 w-full h-full preserve-3d" preserveAspectRatio="none" viewBox="0 0 100 100">
           {/* Area fill */}
           <path d="M0,100 L0,70 Q10,50 20,65 T40,55 T60,35 T80,75 T100,20 L100,100 Z" fill="#fef9f2" />
           {/* Line path */}
           <path d="M0,70 Q10,50 20,65 T40,55 T60,35 T80,75 T100,20" fill="none" stroke="#d08726" strokeWidth="2" />
         </svg>

         {/* Tooltip placeholder */}
         <div className="absolute top-[25%] left-[60%] flex flex-col items-center transform -translate-x-1/2">
            <div className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded mb-1">
               $8,900
            </div>
            <div className="w-4 h-4 rounded-full bg-brand border-2 border-white shadow"></div>
            {/* Vertical dotted line */}
            <div className="w-px h-32 border-l-2 border-dashed border-brand/40 mt-1"></div>
         </div>
      </div>

      {/* X Axis Labels */}
      <div className="flex justify-between text-sm text-gray-500 font-medium px-4 mt-2 border-t border-border-subtle pt-4 z-10">
        <span>2020</span>
        <span>2021</span>
        <span>2023</span>
        <span>2024</span>
        <span>2025</span>
        <span>2026</span>
      </div>
    </div>
  );
}
