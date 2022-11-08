import { useContext, useEffect, useState } from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import ErrorOverlay from '../components/ui/ErrorOverlay';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../util/date';
import { fetchExpenses } from '../util/http';

function RecentExpenses() {
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState();

    const expensesCtx = useContext(ExpensesContext);

    const recentExpenses = expensesCtx.expenses.filter(expense => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);

        return (expense.date >= date7DaysAgo) && (expense.date <= today);
    });

    useEffect(() => {
        async function getExpenses() {
            setIsFetching(true);

            try {
                const expenses = await fetchExpenses();
                expensesCtx.setExpenses(expenses);
            } catch (error) {
                setError('Could not fetch expenses!');
            }

            setIsFetching(false);
        }

        getExpenses();
    }, [])

    function errorHandler() {
        setError(null);
    }

    if (error && !isFetching) {
        return <ErrorOverlay message={error} onConfirm={errorHandler} />
    }

    if (isFetching) {
        return <LoadingOverlay />;
    }

    return (
        <ExpensesOutput expensesPeriod="Last 7 months" expenses={recentExpenses} fallbackText="No expenses registered for the last 7 days." />
    )
}

export default RecentExpenses;