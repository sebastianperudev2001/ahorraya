insert into public.transactions (user_id, type, amount, category, note, date)
values
-- Ingresos
('d8bbb702-dfda-4be5-b126-7b3fe4bb0bb9', 'income', 3000.00, 'Sueldo', 'Pago mensual de abril', '2025-04-01'),
('d8bbb702-dfda-4be5-b126-7b3fe4bb0bb9', 'income', 500.00, 'Freelance', 'Página web para cliente', '2025-04-15'),

-- Gastos
('d8bbb702-dfda-4be5-b126-7b3fe4bb0bb9', 'expense', 150.00, 'Comida', 'Cena en restaurante', '2025-04-03'),
('d8bbb702-dfda-4be5-b126-7b3fe4bb0bb9', 'expense', 75.00, 'Transporte', 'Gasolina semana 1', '2025-04-04'),
('d8bbb702-dfda-4be5-b126-7b3fe4bb0bb9', 'expense', 300.00, 'Salud', 'Dentista', '2025-04-06'),
('d8bbb702-dfda-4be5-b126-7b3fe4bb0bb9', 'expense', 100.00, 'Suscripciones', 'Netflix + Spotify', '2025-04-08'),
('d8bbb702-dfda-4be5-b126-7b3fe4bb0bb9', 'expense', 50.00, 'Comida', 'Groceries', '2025-04-10'),
('d8bbb702-dfda-4be5-b126-7b3fe4bb0bb9', 'expense', 220.00, 'Transporte', 'Revisión técnica', '2025-04-11'),
('d8bbb702-dfda-4be5-b126-7b3fe4bb0bb9', 'expense', 180.00, 'Entretenimiento', 'Entradas cine + snacks', '2025-04-13'),
('d8bbb702-dfda-4be5-b126-7b3fe4bb0bb9', 'expense', 90.00, 'Mascota', 'Consulta veterinaria', '2025-04-14');
