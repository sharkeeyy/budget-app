import React from 'react';
import { Button, Container, Stack } from "react-bootstrap";
import AddBudgetModal from './components/AddBudgetModal';
import AddExpenseModal from './components/AddExpenseModal';
import BudgetCard from "./components/BudgetCard";
import MiscBudgetCard from './components/MiscBudgetCard';
import TotalBudgetCard from './components/TotalBudgetCard'
import ViewExpensesModal from './components/ViewExpensesModal';
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from './contexts/BudgetContext';


function App() {
  const [addBudgetModalShow, setAddBudgetModalShow] = React.useState(false);
  const [addExpenseModalShow, setAddExpenseModalShow] = React.useState(false);
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = React.useState();
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = React.useState(null);
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
              onViewExpensesClick={() => setViewExpensesModalBudgetId(budget.id)}
            />
          })}
          <MiscBudgetCard
            onAddExpenseClick={openExpenseBudgetId}
            onViewExpensesClick={() => setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)}
          />
          <TotalBudgetCard />
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
      <ViewExpensesModal
        budgetId={viewExpensesModalBudgetId}
        handleClose={() => setViewExpensesModalBudgetId(null)}
      />
    </>
  );

}

export default App;
