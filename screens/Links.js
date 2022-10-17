import React, { useContext } from "react";
import { Text, View, SafeAreaView, StyleSheet } from "react-native";
import { AuthContext } from "../context/auth";
import FooterNav from "../components/nav/FooterNav";

const Links = () => {
	const [state, setState] = useContext(AuthContext);
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={styles.container}>
				<FooterNav />
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "flex-end",
	},
});

export default Links;
