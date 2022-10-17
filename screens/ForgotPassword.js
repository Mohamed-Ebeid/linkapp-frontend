import React, { useState, useContext } from "react";
import { ScrollView, Text, StyleSheet } from "react-native";
import axios from "axios";
import UserInput from "../components/UserInput";
import SubmitButton from "../components/SubmitButton";
import Logo from "../components/Logo";
import { API } from "../config/config";

const ForgotPassword = ({ navigation }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [code, setCode] = useState("");
	const [loading, setLoading] = useState(false);
	const [visiable, setVisiable] = useState(false);

	const handleRequest = async () => {
		setLoading(true);
		if (!email) {
			setLoading(false);
			alert("All field are required ");
			return;
		}

		try {
			const { data } = await axios.post("/forgot-password", {
				email,
			});
			if (data.error) {
				alert(data.error);
				setLoading(false);
			} else {
				setLoading(false);
				alert(
					"Reset code was sent! Check your spam folder if you don't see it"
				);
				setVisiable(true);
			}
		} catch (e) {
			alert(e.message);
			setLoading(false);
		}
	};

	const handleUpdate = async () => {
		setLoading(true);
		if (!password || !code) {
			setLoading(false);
			alert("All field are required ");
			return;
		}

		try {
			const { data } = await axios.post("/reset-password", {
				email,
				password,
				code,
			});
			if (data.error) {
				alert(data.error);
				setLoading(false);
			} else {
				setLoading(false);
				alert("You can now login with the new paasword");
				navigation.navigate("Sign in");
			}
		} catch (e) {
			alert(e.message);
			setLoading(false);
		}
	};

	return (
		<ScrollView style={styles.container}>
			<Logo />

			<Text style={styles.header}>Reset Password</Text>
			{visiable ? (
				<>
					<Text style={styles.text}>Welcome: {email}</Text>
					<UserInput
						name="RESET CODE"
						value={code}
						setValue={setCode}
						placeHolder="Enter the reset code"
					/>
					<UserInput
						name="NEW PASSWORD"
						value={password}
						setValue={setPassword}
						secureTextEntry={true}
						placeHolder="Enter the new password"
					/>
				</>
			) : (
				<UserInput
					name="EMAIL"
					value={email}
					setValue={setEmail}
					keyboardType="email-address"
					placeHolder="Enter your email:"
				/>
			)}

			<SubmitButton
				name={visiable ? "Update password" : "Request reset code"}
				handleSubmit={visiable ? handleUpdate : handleRequest}
				loading={loading}
			/>
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
		marginTop: 30,
		marginBottom: 20,
	},
	text: {
		alignSelf: "center",
		fontSize: 14,
		marginBottom: 20,
	},
	text2: {
		alignSelf: "center",
		marginTop: 10,
		fontSize: 12,
		color: "#00CCFF",
		shadow: 10,
	},
});

export default ForgotPassword;
