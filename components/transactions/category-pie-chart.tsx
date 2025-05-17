"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { Transaction, TransactionType } from "@/types/transaction";

interface CategoryPieChartProps {
  transactions: Transaction[];
}

const CategoryPieChart: React.FC<CategoryPieChartProps> = ({
  transactions,
}) => {
  // Filter only expenses
  const expenses = transactions.filter(
    (t) => t.type.toLowerCase() === TransactionType.EXPENSE.toLowerCase()
  );

  // Group by category and sum amounts
  const categoryData = expenses.reduce(
    (acc, transaction) => {
      const { category, amount } = transaction;
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += Number(amount);
      return acc;
    },
    {} as Record<string, number>
  );

  // Convert to array format for recharts
  const data = Object.entries(categoryData).map(([name, value]) => ({
    name,
    value,
  }));

  // Sort by value (highest first)
  data.sort((a, b) => b.value - a.value);

  // Colors for the pie chart (using CSS variables from your theme)
  const COLORS = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ];

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return percent > 0.05 ? (
      <text
        x={x}
        y={y}
        fill="#fff"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={12}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null;
  };

  return (
    <div className="w-full h-[300px]">
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => [`$${value.toFixed(2)}`, "Amount"]}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex items-center justify-center h-full text-muted-foreground">
          No expense data available for this month
        </div>
      )}
    </div>
  );
};

export default CategoryPieChart;
