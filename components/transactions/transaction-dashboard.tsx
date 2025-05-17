"use client";

import React, { useState, useMemo } from "react";
import { Transaction, TransactionType } from "@/types/transaction";
import MonthSelector from "./month-selector";
import CategoryPieChart from "./category-pie-chart";

interface TransactionDashboardProps {
  transactions: Transaction[];
}

const TransactionDashboard: React.FC<TransactionDashboardProps> = ({
  transactions,
}) => {
  const [selectedMonth, setSelectedMonth] = useState<string>(
    new Date().toISOString().slice(0, 7) // Current month in YYYY-MM format
  );

  // Get all available months from transactions
  const availableMonths = useMemo(() => {
    const months = new Set<string>();
    transactions.forEach((transaction) => {
      const month = transaction.date.slice(0, 7); // YYYY-MM
      months.add(month);
    });
    return Array.from(months).sort().reverse(); // Most recent first
  }, [transactions]);

  // Filter transactions by selected month
  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) =>
      transaction.date.startsWith(selectedMonth)
    );
  }, [transactions, selectedMonth]);

  // Calculate totals
  const totals = useMemo(() => {
    const income = filteredTransactions
      .filter(
        (t) => t.type.toLowerCase() === TransactionType.INCOME.toLowerCase()
      )
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const expenses = filteredTransactions
      .filter(
        (t) => t.type.toLowerCase() === TransactionType.EXPENSE.toLowerCase()
      )
      .reduce((sum, t) => sum + Number(t.amount), 0);

    return { income, expenses, balance: income - expenses };
  }, [filteredTransactions]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <MonthSelector
          months={availableMonths}
          selectedMonth={selectedMonth}
          onChange={setSelectedMonth}
        />

        <div className="grid grid-cols-3 gap-4 w-full md:w-auto">
          <div className="p-4 border rounded-md bg-card">
            <h3 className="text-sm font-medium text-muted-foreground">
              Income
            </h3>
            <p className="text-2xl font-bold text-green-500">
              ${totals.income.toFixed(2)}
            </p>
          </div>
          <div className="p-4 border rounded-md bg-card">
            <h3 className="text-sm font-medium text-muted-foreground">
              Expenses
            </h3>
            <p className="text-2xl font-bold text-red-500">
              ${totals.expenses.toFixed(2)}
            </p>
          </div>
          <div className="p-4 border rounded-md bg-card">
            <h3 className="text-sm font-medium text-muted-foreground">
              Balance
            </h3>
            <p
              className={`text-2xl font-bold ${totals.balance >= 0 ? "text-green-500" : "text-red-500"}`}
            >
              ${totals.balance.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        <div className="border rounded-md p-4 bg-card">
          <h2 className="text-lg font-medium mb-4">Expense Categories</h2>
          <CategoryPieChart transactions={filteredTransactions} />
        </div>
      </div>
    </div>
  );
};

export default TransactionDashboard;
