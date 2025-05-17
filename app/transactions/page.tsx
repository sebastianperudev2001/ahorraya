import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import React from "react";
import TransactionDashboard from "@/components/transactions/transaction-dashboard";
import { Transaction } from "@/types/transaction";

const TransactionsPage = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const { data: transactions, error } = await supabase
    .from("transactions")
    .select("*");

  if (error) {
    console.error("Error fetching transactions:", error);
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Transactions Dashboard</h1>
      <TransactionDashboard transactions={transactions as Transaction[]} />

      {/* Mantener la visualización JSON para depuración si es necesario */}
      <details className="mt-8 border rounded-md p-4">
        <summary className="font-medium cursor-pointer">
          Raw Transaction Data
        </summary>
        <pre className="mt-2 text-xs overflow-auto max-h-96">
          {JSON.stringify(transactions, null, 2)}
        </pre>
      </details>
    </div>
  );
};

export default TransactionsPage;
