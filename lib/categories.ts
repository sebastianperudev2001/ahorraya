// List of expense categories
export const EXPENSE_CATEGORIES = [
  "Comida",
  "Transporte",
  "Salud",
  "Suscripciones",
  "Entretenimiento",
  "Mascota",
  "Vivienda",
  "Educación",
  "Ropa",
  "Servicios",
  "Otros",
];

// List of income categories
export const INCOME_CATEGORIES = [
  "Sueldo",
  "Freelance",
  "Inversiones",
  "Regalo",
  "Venta",
  "Reembolso",
  "Otros",
];

// Get categories based on transaction type
export const getCategoriesByType = (type: string) => {
  return type.toUpperCase() === "INCOME"
    ? INCOME_CATEGORIES
    : EXPENSE_CATEGORIES;
};
