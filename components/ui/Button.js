import { Pressable, StyleSheet, Text, View } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

function Button({ children, onPress, style }){
    return (
        <View style={style}>
            <Pressable onPress={onPress} style={({pressed}) => pressed && styles.pressed}>
                <View style={styles.button}>
                    <Text style={styles.button}>{ children }</Text>
                </View>
            </Pressable>
        </View>
    )
}

export default Button;

const styles = StyleSheet.create({
    button: {
        borderRadius: 4,
        padding: 8,
        color: 'white',
        textAlign: 'center',
        backgroundColor: GlobalStyles.colors.primary500
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    pressed: {
        opacity: 0.75,
        backgroundColor: GlobalStyles.colors.primary100,
        borderRadius: 4
    }
});