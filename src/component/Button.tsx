import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const Button = ({
    onPress,
    title,
    disabled,
}: any) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            style={disabled ? styles.disabledButton : styles.button}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#42a5f5",
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        margin: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    disabledButton: {
        backgroundColor: "gray",
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        margin: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
    },
});

export default Button;