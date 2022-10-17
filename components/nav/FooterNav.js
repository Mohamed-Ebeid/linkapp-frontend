import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Divider } from "@rneui/base";

export const Nav = ({ icon, name, handlerPress, screenName, routeName }) => {
	const active = screenName == routeName ? "black" : "darkgrey";
	return (
		<TouchableOpacity onPress={handlerPress} color={active}>
			<>
				<Icon name={icon} size={25} color={active} style={styles.icon} />
				<Text>{name}</Text>
			</>
		</TouchableOpacity>
	);
};

const FooterNav = () => {
	const navigation = useNavigation();
	const route = useRoute();
	//console.log(route);

	return (
		<>
			<View style={styles.container}>
				<Nav
					icon="home"
					name="Dashboard"
					screenName="Dashboard"
					routeName={route.name}
					handlerPress={() => navigation.navigate("Dashboard")}
				/>
				<Nav
					icon="plus-square"
					name="Post"
					screenName="Post"
					routeName={route.name}
					handlerPress={() => navigation.navigate("Post")}
				/>
				<Nav
					icon="list-ol"
					name="My Links"
					screenName="Profile"
					routeName={route.name}
					handlerPress={() => navigation.navigate("Profile")}
				/>
				<Nav
					icon="user"
					name="Account"
					screenName="Account"
					routeName={route.name}
					handlerPress={() => navigation.navigate("Account")}
				/>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingTop: 10,
		paddingBottom: 20,
		paddingHorizontal: 30,
		alignItems: "flex-end",
		backgroundColor: "green",
	},
	icon: {
		alignSelf: "center",
		marginBottom: 4,
		//backgroundColor:"orange",
	},
});

export default FooterNav;
