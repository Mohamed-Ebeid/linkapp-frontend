import React, { useState } from "react";
import { ScrollView, Text, StyleSheet } from "react-native";
import axios from "axios";
import UserInput from "../components/UserInput";
import SubmitButton from "../components/SubmitButton";
import Logo from "../components/Logo";

const Signup = ({ navigation }) => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async () => {
		setLoading(true);
		if (!name || !password || !email) {
			setLoading(false);
			alert("All field are required ");
			return;
		}
		//172.27.1.92 ipconfig
		try {
			const { data } = await axios.post("/signup", {
				name,
				email,
				password,
			});
			if (data.error) {
				alert(data.error);
				setLoading(false);
			} else {
				setLoading(false);
				alert("You sign up successfully! Now login");
				navigation.navigate("Sign in");
			}
		} catch (e) {
			alert(e);
			setLoading(false);
		}
	};

	return (
		<ScrollView style={styles.container}>
			<Logo />

			<Text style={styles.header}>Sign up</Text>

			<UserInput
				name="NAME"
				value={name}
				setValue={setName}
				autoCapitalize="words"
			/>
			<UserInput
				name="EMAIL"
				value={email}
				setValue={setEmail}
				keyboardType="email-address"
			/>
			<UserInput
				name="PASSWORD"
				value={password}
				setValue={setPassword}
				secureTextEntry={true}
			/>

			<SubmitButton
				name="Sign up"
				handleSubmit={handleSubmit}
				loading={loading}
			/>

			<Text style={styles.text}>
				{" "}
				Already have an account?
				<Text
					style={{ color: "#4d79ff" }}
					onPress={() => navigation.navigate("Sign in")}
				>
					Login
				</Text>
			</Text>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "lightgray",
	},
	header: {
		alignSelf: "center",
		fontWeight: "bold",
		fontSize: 18,
		color: "blue",
		marginTop: 20,
		marginBottom: 30,
	},
	text: {
		alignSelf: "center",
		marginTop: 20,
		fontSize: 12,
	},
});

export default Signup;
