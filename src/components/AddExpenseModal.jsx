import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from '../contexts/BudgetContext';

export default function AddExpenseModal({ show, handleClose, defaultBudgetId }) {
  const descriptionRef = React.useRef();
  const amountRef = React.useRef();
  const budgetIdRef = React.useRef();
  const { budgets, addExpense } = useBudgets();

  function handleSubmit(e) {
    e.preventDefault();
    addExpense({
      description: descriptionRef.current.value,
      amount: parseInt(amountRef.current.value),
      budgetId: budgetIdRef.current.value,
    });
    handleClose();
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header>
          <Modal.Title>
            New Expense
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control ref={descriptionRef} type="text" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="amount">
            <Form.Label>Amount</Form.Label>
            <Form.Control ref={amountRef} type="number" required min={0} step={1} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="budgetId">
            <Form.Label>Budget</Form.Label>
            <Form.Select
              defaultValue={defaultBudgetId}
              ref={budgetIdRef}>
              <option id={UNCATEGORIZED_BUDGET_ID}>Uncategorized</option>
              {budgets.map(budget => <option key={budget.id} value={budget.id}>{budget.name}</option>)}
            </Form.Select>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button type="submit">Add</Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
}


