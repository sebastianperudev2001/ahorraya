import { z } from "zod";
import { TransactionType } from "@/types/transaction";

export const transactionFormSchema = z.object({
  type: z.nativeEnum(TransactionType, {
    required_error: "Selecciona el tipo de transacción",
  }),
  amount: z.coerce
    .number({
      required_error: "Ingresa la cantidad",
      invalid_type_error: "Debe ser un número válido",
    })
    .positive("La cantidad debe ser mayor a 0"),
  category: z.string({
    required_error: "Selecciona una categoría",
  }),
  note: z.string().optional(),
  date: z.date({
    required_error: "Selecciona una fecha",
  }),
});

export type TransactionFormValues = z.infer<typeof transactionFormSchema>;

// Default values for new transaction form
export const defaultTransactionValues: Partial<TransactionFormValues> = {
  type: TransactionType.EXPENSE,
  amount: 0,
  category: "",
  note: "",
  date: new Date(),
};
