import React from 'react';
import BudgetCard from './BudgetCard';
import { useBudgets, UNCATEGORIZED_BUDGET_ID } from '../contexts/BudgetContext';

export default function MiscBudgetCard(props) {
  const { getBudgetExpenses } = useBudgets();
  const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce((acc, item) => acc + item.amount, 0);

  if (amount === 0) return null;

  return (
    <BudgetCard name="Uncategorized" amount={amount} gray {...props} />
  )
}
