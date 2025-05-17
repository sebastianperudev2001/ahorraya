import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import React from "react";

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

  return (
    <div>
      <h1>Transactions</h1>
      <pre>{JSON.stringify(transactions, null, 2)}</pre>
    </div>
  );
};

export default TransactionsPage;
