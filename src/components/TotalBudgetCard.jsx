import React from 'react';
import BudgetCard from './BudgetCard';
import { useBudgets } from '../contexts/BudgetContext';

export default function TotalBudgetCard() {
  const { budgets, expenses } = useBudgets();
  const amount = expenses.reduce((acc, item) => acc + item.amount, 0);
  const max = budgets.reduce((acc, item) => acc + item.max, 0);

  if (max === 0) return null;

  return (
    <BudgetCard name="Total" amount={amount} max={max} gray hideButtons />
  )
}
