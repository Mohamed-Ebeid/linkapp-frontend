import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const UserInput = ({
	name,
	value,
	setValue,
	placeHolder,
	autoCapitalize = "none",
	secureTextEntry = false,
	keyboardType = "default",
}) => {
	return (
		<View style={{ marginHorizontal: 24 }}>
			<Text style={styles.text}>{name}:</Text>
			<TextInput
				style={styles.input}
				value={value}
				placeholder={placeHolder}
				onChangeText={(text) => setValue(text)}
				secureTextEntry={secureTextEntry}
				keyboardType={keyboardType}
				autoCapitalize={autoCapitalize}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	text: {
		margin: 5,
		fontSize: 14,
	},
	input: {
		margin: 10,
		padding: 20,
		borderWidth: 0.8,
		height: 40,
		borderColor: "grey",
		marginBottom: 20,
		borderRadius: 30,
		height: 60,
	},
});

export default UserInput;
