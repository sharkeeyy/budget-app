import React from 'react';
import { Modal, Form, Button, Stack } from 'react-bootstrap';
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from '../contexts/BudgetContext';
import { currencyFormatter } from '../utils'; 

export default function ViewExpensesModal({ budgetId, handleClose }) {
  const { budgets, getBudgetExpenses, deleteExpense, deleteBudget } = useBudgets();

  const isUncategorized = budgetId === UNCATEGORIZED_BUDGET_ID;
  const budget = isUncategorized
    ? { name : 'Uncategorized', id: UNCATEGORIZED_BUDGET_ID }
    : budgets.find(budget => budget.id === budgetId);

  const expenses = getBudgetExpenses(budgetId);

  function handleBudgetDelete(budget) {
    deleteBudget(budget);
    handleClose();
  }

  return (
    <Modal show={budgetId !== null} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>
          <Stack direction="horizontal" gap="2">
            <div>Expenses - {budget?.name}</div>
            {!isUncategorized && <Button variant="outline-danger" onClick={() => handleBudgetDelete(budget)}>Delete</Button>}
          </Stack>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack direction="vertical" gap="3">
          {expenses.map(expense => (
            <Stack direction="horizontal" gap="2" key={expense.id}>
              <div className="me-auto fs-4">{expense.description}</div>
              <div className="fs-5">{currencyFormatter.format(expense.amount)}</div>
              <Button
                size="sm"
                variant="outline-danger"
                onClick={() => deleteExpense(expense)}
              >
                &times;</Button>
            </Stack>
          ))}
        </Stack>
      </Modal.Body>
    </Modal>
  );
}


