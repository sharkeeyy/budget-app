import React from 'react';
import { Button, Container, Stack } from "react-bootstrap";
import AddBudgetModal from './components/AddBudgetModal';
import AddExpenseModal from './components/AddExpenseModal';
import BudgetCard from "./components/BudgetCard";
import { useBudgets } from './contexts/BudgetContext'


function App() {
  const [addBudgetModalShow, setAddBudgetModalShow] = React.useState(false);
  const [addExpenseModalShow, setAddExpenseModalShow] = React.useState(false);
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = React.useState();
  const { budgets, expenses, getBudgetExpenses } = useBudgets();

  function openExpenseBudgetId(budgetId) {
    setAddExpenseModalShow(true);
    setAddExpenseModalBudgetId(budgetId);
  }

  return (
    <>
      <Container className="my-4" style={{ width: '600px' }}>
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">Budgets</h1>
          <Button variant="primary" onClick={() => setAddBudgetModalShow(true)}>Add Budget</Button>
          <Button variant="outline-primary" onClick={openExpenseBudgetId}>Add Expense</Button>
        </Stack>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1rem",
            alignItems: "flex-start",
          }}
        >
          {budgets.map(budget => {
            const amount = getBudgetExpenses(budget.id).reduce((acc, item) => acc + item.amount, 0);
            return <BudgetCard
              key={budget.id}
              name={budget.name}
              amount={amount}
              max={budget.max}
              onAddExpenseClick={() => openExpenseBudgetId(budget.id)}
            />
          })}
        </div>
      </Container>
      <AddBudgetModal
        show={addBudgetModalShow}
        handleClose={() => setAddBudgetModalShow(false)}
      />
      <AddExpenseModal
        show={addExpenseModalShow}
        defaultBudgetId={addExpenseModalBudgetId}
        handleClose={() => setAddExpenseModalShow(false)}
      />
    </>
  );

}

export default App;
