import React, { useState, useContext } from "react";
import { ScrollView, Text, StyleSheet } from "react-native";
import axios from "axios";
import UserInput from "../components/UserInput";
import SubmitButton from "../components/SubmitButton";
import Logo from "../components/Logo";
import { API } from "../config/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/auth";

const Signin = ({ navigation }) => {
	const [state, setState] = useContext(AuthContext);
	const [email, setEmail] = useState("solo@notawesome.com");
	const [password, setPassword] = useState("123456");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async () => {
		setLoading(true);
		if (!password || !email) {
			setLoading(false);
			alert("All field are required ");
			return;
		}
		//172.27.1.92 ipconfig
		try {
			const { data } = await axios.post("/signin", {
				email,
				password,
			});
			if (data.error) {
				alert(data.error);
				setLoading(false);
			} else {
				setState(data);
				await AsyncStorage.setItem("@auth", JSON.stringify(data));
				setLoading(false);
				alert("Welcome :)");
				navigation.navigate("Dashboard");
			}
		} catch (e) {
			alert(e.message);
			setLoading(false);
		}
	};

	// const display = async ()=>{
	// let info = await AsyncStorage.getItem("@auth");
	// if(info){console.log(info)}
	// }
	// display();
	return (
		<ScrollView style={styles.container}>
			<Logo />

			<Text style={styles.header}>Sign in</Text>

			<UserInput
				name="EMAIL"
				value={email}
				setValue={setEmail}
				keyboardType="email-address"
				placeHolder="Enter your email:"
			/>
			<UserInput
				name="PASSWORD"
				value={password}
				setValue={setPassword}
				secureTextEntry={true}
				placeHolder="Enter your password:"
			/>

			<SubmitButton
				name="Sign in"
				handleSubmit={handleSubmit}
				loading={loading}
			/>

			<Text style={styles.text}>
				New User?{" "}
				<Text
					style={{ color: "#4d79ff" }}
					onPress={() => navigation.navigate("Sign up")}
				>
					Sign up
				</Text>
			</Text>
			<Text
				style={styles.text2}
				onPress={() => navigation.navigate("Forgot Password")}
			>
				Froget Password?
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
	text2: {
		alignSelf: "center",
		marginTop: 10,
		fontSize: 12,
		color: "#00CCFF",
	},
});

export default Signin;
