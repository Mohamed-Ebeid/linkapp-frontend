import React from "react";
import { TextInput, View, StyleSheet } from "react-native";

const Search = ({ value, setValue }) => {
	return (
		<View>
			<TextInput
				style={styles.container}
				value={value}
				onChangeText={(text) => setValue(text)}
				placeholderTextColor="white"
				placeholder="search..."
				backgroundColor="black"
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		height: 60,
		marginHorizontal: 20,
		marginBottom: 20,
		borderRadius: 50,
		padding: 20,
		borderColor: "pink",
		borderWidth: 5,
		fontWeight: "bold",
		fontSize: 18,
		color: "white",
	},
});

export default Search;
