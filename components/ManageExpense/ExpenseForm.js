import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Input from './Input';
import Button from '../ui/Button';
import { GlobalStyles } from '../../constants/styles';

function ExpenseForm({submitButtonLabel, onCancel, onSubmit, defaultValues}) {
    const [inputs, setInputs] = useState({
        amount:{
            value:  defaultValues ? defaultValues.amount.toString() : '',
            isValid: true
        },
        date: {
            value: defaultValues ? defaultValues.date.toISOString().slice(0, 10) : '',
            isValid: true
        },
        description: {
            value: defaultValues ? defaultValues.description : '',
            isValid: true
        },
    });

    function inputChangedHandler(inputIdentifier, enteredValue) {
        setInputs((curInputs) => {
            return { ...curInputs, [inputIdentifier]: { value: enteredValue, isValid: true } }
        });
    }

    function submitHandler() {
        const expenseData = {
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value
        }

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
        const descriptionIsValid = expenseData.description.trim().length > 0;

        if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
            //Alert.alert('Invalid input', 'Please check the errors in the form.');
            setInputs((curInputs) => {
                return {
                    amount: { value: curInputs.amount.value, isValid: amountIsValid },
                    date: { value: curInputs.date.value, isValid: dateIsValid },
                    description: { value: curInputs.description.value, isValid: descriptionIsValid },
                }
            })
            return;
        } else {
            onSubmit(expenseData);
        }
    }

    const formIsInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid;

    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.inputsRow}>
                <Input
                    style={styles.rowInput}
                    label="Amount"
                    invalid={!inputs.amount.isValid}
                    textInputConfig={{
                        keyboardType: 'decimal-pad',
                        onChangeText: inputChangedHandler.bind(this, 'amount'),
                        value: inputs.amount.value,
                    }} />
                <Input
                    style={styles.rowInput}
                    label="Date"
                    invalid={!inputs.date.isValid}
                    textInputConfig={{
                        placeholder: 'YYYY-MM-DD',
                        maxLength: 10,
                        onChangeText: inputChangedHandler.bind(this, 'date'),
                        value: inputs.date.value,
                    }} />
            </View>
            <Input 
                label="Description"
                invalid={!inputs.description.isValid}
                textInputConfig={{
                    multiline: true,
                    onChangeText: inputChangedHandler.bind(this, 'description'),
                    value: inputs.description.value,
                    // autoCorrect: false,
                    // autoCapitalize: 'sentences',
                }}
            />
            {formIsInvalid && <Text style={styles.errorText}>Invalid input values - please check your entered data!</Text>}
            <View style={styles.buttons}>
                <Button style={styles.button} onPress={onCancel}>Cancel</Button>
                <Button style={styles.button} onPress={submitHandler}>{submitButtonLabel}</Button>
            </View>
        </View>
    )
}

export default ExpenseForm;

const styles = StyleSheet.create({
    form: {
        marginTop: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 24,
        textAlign: 'center',
    },
    inputsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rowInput: {
        flex: 1,
    },
    errorText: {
        textAlign: 'center',
        color: GlobalStyles.colors.error500,
        margin: 8,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8
    },
});