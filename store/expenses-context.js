import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
    {
        id: 'e1',
        description: 'Toilet Paper',
        amount: 94.12,
        date: new Date(2020, 7, 14),
    },
    {
        id: 'e2',
        description: 'New TV',
        amount: 799.49,
        date: new Date(2021, 2, 12),
    },
    {
        id: 'e3',
        description: 'Car Insurance',
        amount: 294.67,
        date: new Date(2021, 2, 28),
    },
    {
        id: 'e4',
        description: 'New Desk (Wooden)',
        amount: 450,
        date: new Date(2021, 5, 12),
    },
    {
        id: 'e5',
        description: 'Toilet Paper',
        amount: 94.12,
        date: new Date(2020, 7, 14),
    },
    {
        id: 'e6',
        description: 'New TV',
        amount: 799.49,
        date: new Date(2021, 2, 12),
    },
    {
        id: 'e7',
        description: 'Car Insurance',
        amount: 294.67,
        date: new Date(2021, 2, 28),
    },
    {
        id: 'e8',
        description: 'Laptop Lenovo Legion 7',
        amount: 9299,
        date: new Date(2022, 11, 1),
    }
];

export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({ description, amount, date }) => { },
    removeExpense: (id) => { },
    editExpense: (id, { description, amount, date }) => { },
    setExpenses: (expenses) => { },
});

function expensesReducer(state, action) {
    switch (action.type) {
        case 'ADD':
            const id = new Date().toString() + Math.random().toString();
            return [{ ...action.payload, id: id }, ...state];
        case 'SET':
            const inverted = action.payload.reverse();
            return inverted;
        case 'UPDATE':
            const updatableExpenseIndex = state.findIndex(expense => expense.id === action.payload.id);
            const updatableExpense = state[updatableExpenseIndex];
            const updatedItem = { ...updatableExpense, ...action.payload.data };
            const updatedExpenses = [...state];
            updatedExpenses[updatableExpenseIndex] = updatedItem;

            return updatedExpenses;
        case 'DELETE':
            return state.filter((expense) => expense.id !== action.payload);
        default: return state;
    }
}

function ExpensesContextProvider({ children }) {
    const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

    function addExpense( expenseData ) {
        dispatch({ type: 'ADD', payload: expenseData });
    }

    function setExpenses(expenses) {
        dispatch({ type: 'SET', payload: expenses });
    }

    function deleteExpense(id) {
        dispatch({ type: 'DELETE', payload: id });
    }

    function updateExpense(id, expenseData) {
        dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData } });
    }

    const value = {
        expenses: expensesState,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense,
        setExpenses: setExpenses,
    };

    return (
        <ExpensesContext.Provider value={value}>
            {children}
        </ExpensesContext.Provider>
    )
}

export default ExpensesContextProvider;