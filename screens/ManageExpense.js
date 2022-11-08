import { useContext, useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native'

import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import IconButton from '../components/ui/IconButton';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { GlobalStyles } from '../constants/styles';
import { ExpensesContext } from '../store/expenses-context';
import { deleteExpense, storeExpense, updateExpense } from '../util/http';

function ManageExpense({ route, navigation }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState();

    const expensesCtx = useContext(ExpensesContext);

    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;

    const selectedExpense = expensesCtx.expenses.find(expense => expense.id === editedExpenseId);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense',
        })
    }, [navigation, isEditing])

    async function deleteExpenseHandler() {
        setIsSubmitting(true);
        try {
            await deleteExpense(editedExpenseId);
            // setIsSubmitting(false);
            expensesCtx.deleteExpense(editedExpenseId);
            navigation.goBack();
        } catch (error) {
            setError('Could not delete expense!');
            setIsSubmitting(false);
        }
    }

    function errorHandler() {
        setError(null);
    }

    function cancelHandler() {
        navigation.goBack();
    }

    async function confirmHandler(expenseData) {
        try {
            if (isEditing) {
                expensesCtx.updateExpense(editedExpenseId, expenseData);
                await updateExpense(editedExpenseId, expenseData);
            } else {
                const id = await storeExpense(expenseData);
                expensesCtx.addExpense({ ...expenseData, id: id });
            }

            navigation.goBack();
        } catch (error) {
            setError('Could not save expense!');
            setIsSubmitting(false);
        }
    }

    if(error && !isSubmitting) {
        return <ErrorOverlay message={error} onConfirm={errorHandler} />
    }

    if(isSubmitting) { 
        return <LoadingOverlay />;
    }

    return (
        <View style={styles.container}>
            <ExpenseForm
                onCancel={cancelHandler}
                onSubmit={confirmHandler}
                submitButtonLabel={isEditing ? 'Update' : 'Add'}
                defaultValues={selectedExpense}
            />
            {isEditing && (
                <View style={styles.deleteContainer}>
                    <IconButton icon='trash' size={36} color={GlobalStyles.colors.error500} onPress={deleteExpenseHandler} />
                </View>
            )}
        </View>
    )
}

export default ManageExpense;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800,
    },
    deleteContainer: { 
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center',
    }
});