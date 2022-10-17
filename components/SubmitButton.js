import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

const SubmitButton = ({ name, handleSubmit, loading }) => {
	return (
		<TouchableOpacity style={styles.button} onPress={handleSubmit}>
			<Text style={styles.text}>{loading ? "Please wait..." : name}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		backgroundColor: "#809fff",
		height: 40,
		justifyContent: "center",
		marginTop: 10,
		marginHorizontal: 50,
		borderRadius: 24,
	},
	text: {
		alignSelf: "center",
		fontWeight: "bold",
		fontSize: 16,
	},
});
export default SubmitButton;
