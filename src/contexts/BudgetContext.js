import React from 'react';
import { v4 as uuidV4 } from 'uuid';
import useLocalStorage from '../hooks/useLocalStorage';

const BudgetContext = React.createContext();

export const UNCATEGORIZED_BUDGET_ID = 'Uncategorized';

export function useBudgets() {
  return React.useContext(BudgetContext);
}

export const BudgetsProvider = ({ children }) => {
  const [budgets, setBudgets] = useLocalStorage('budgets', []);
  const [expenses, setExpenses] = useLocalStorage('expenses', []);

  function getBudgetExpenses(budgetId) {
    return expenses.filter(expense => expense.budgetId === budgetId);
  }

  function addBudget({ name, max }) {
    setBudgets(prev => [...prev, { id: uuidV4(), name, max }]);
  }

  function addExpense({ description, amount, budgetId }) {
    setExpenses(prev => [...prev, { id: uuidV4(), description, amount, budgetId }]);
  }

  function deleteBudget({ id }) {
    setBudgets(prev => prev.filter(budget => budget.id !== id));
  }

  function deleteExpense({ id }) {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  }

  return (
    <BudgetContext.Provider value={{
      budgets,
      expenses,
      getBudgetExpenses,
      addExpense,
      addBudget,
      deleteBudget,
      deleteExpense
    }}>
      {children}
    </BudgetContext.Provider>
  )
}