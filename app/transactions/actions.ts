"use server";

import { createClient } from "@/utils/supabase/server";
import { TransactionFormValues } from "@/lib/schemas/transaction";
import { revalidatePath } from "next/cache";

export async function createTransaction(data: TransactionFormValues) {
  try {
    const supabase = await createClient();

    // Ensure the user is authenticated
    const { data: userData, error: authError } = await supabase.auth.getUser();

    if (authError || !userData.user) {
      return { success: false, error: "No estás autenticado" };
    }

    // Format the date to be stored in Supabase
    const formattedDate = data.date.toISOString().split("T")[0];

    // Insert the transaction
    const { error } = await supabase.from("transactions").insert({
      user_id: userData.user.id,
      type: data.type.toLowerCase(),
      amount: data.amount,
      category: data.category,
      note: data.note || "",
      date: formattedDate,
    });

    if (error) {
      console.error("Error inserting transaction:", error);
      return { success: false, error: error.message };
    }

    // Revalidate the transactions page to show the new transaction
    revalidatePath("/transactions");

    return { success: true };
  } catch (error) {
    console.error("Error creating transaction:", error);
    return {
      success: false,
      error: "Ha ocurrido un error al crear la transacción",
    };
  }
}
