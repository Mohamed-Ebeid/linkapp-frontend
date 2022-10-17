import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";

const Logo = ({ children }) => {
	return (
		<View style={styles.container}>
			<View style={styles.container2}>
				{children ? (
					children
				) : (
					<Image source={require("../assets/fire.png")} style={styles.image} />
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
		marginTop: 60,
	},
	container2: {
		backgroundColor: "#fff",
		height: 150,
		width: 150,
		borderRadius: 100,
		alignItems: "center",
		justifyContent: "center",
	},
	image: {
		width: 150,
		height: 150,
	},
});

export default Logo;
