"use client";

import { useMemo, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type MonthlyPoint = { month: string; revenue: number };
type YearlyPoint = { year: string; revenue: number };

type RevenueAnalyticsData = {
  monthly_analytics: MonthlyPoint[];
  yearly_analytics: YearlyPoint[];
};

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const value = payload[0].value as number;
  return (
    <div className='flex flex-col items-center'>
      <div className='bg-green-500 text-white text-xs font-bold px-2 py-1 rounded mb-1 whitespace-nowrap'>
        $
        {value.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </div>
      <span className='text-[10px] text-gray-500'>{label}</span>
    </div>
  );
}

export function AreaChartPlaceholder({ data }: { data: RevenueAnalyticsData }) {
  const [view, setView] = useState<"yearly" | "monthly">("yearly");

  const chartData = useMemo(() => {
    if (view === "monthly") {
      return (data?.monthly_analytics ?? []).map((d) => ({
        label: d.month,
        revenue: d.revenue,
      }));
    }
    return (data?.yearly_analytics ?? []).map((d) => ({
      label: d.year,
      revenue: d.revenue,
    }));
  }, [data, view]);

  const total = useMemo(
    () => chartData.reduce((sum, d) => sum + (d.revenue || 0), 0),
    [chartData],
  );

  return (
    <div className='flex flex-col h-full bg-white rounded-xl shadow-sm p-6 relative overflow-hidden'>
      <div className='flex items-center justify-between mb-8 z-10'>
        <div>
          <h3 className='text-lg font-semibold text-gray-900'>
            Revenue Analytics
          </h3>
          <p className='text-sm text-gray-400'>
            Total: $
            {total.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
        <div className='flex gap-2'>
          <button
            onClick={() => setView("yearly")}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
              view === "yearly"
                ? "bg-brand-light text-brand"
                : "text-gray-500 hover:bg-gray-50 border border-transparent"
            }`}
          >
            Yearly
          </button>
          <button
            onClick={() => setView("monthly")}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
              view === "monthly"
                ? "bg-brand-light text-brand"
                : "text-gray-500 hover:bg-gray-50 border border-transparent"
            }`}
          >
            Monthly
          </button>
        </div>
      </div>

      <div className='flex-1 w-full min-h-[240px] z-10'>
        {chartData.length === 0 ? (
          <div className='h-full flex items-center justify-center text-sm text-gray-400'>
            No revenue data available
          </div>
        ) : (
          <ResponsiveContainer width='100%' height='100%'>
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id='revenueFill' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='5%' stopColor='#d08726' stopOpacity={0.25} />
                  <stop offset='95%' stopColor='#d08726' stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke='#f1f1f1' />
              <XAxis
                dataKey='label'
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#6b7280" }}
                padding={{ left: 10, right: 10 }}
              />
              <YAxis hide domain={[0, (max: number) => max * 1.2]} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type='monotone'
                dataKey='revenue'
                stroke='#d08726'
                strokeWidth={2}
                fill='url(#revenueFill)'
                dot={{ r: 3, fill: "#d08726", strokeWidth: 0 }}
                activeDot={{
                  r: 5,
                  fill: "#d08726",
                  stroke: "#fff",
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
