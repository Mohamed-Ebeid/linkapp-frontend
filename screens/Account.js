import React, { useState, useEffect, useContext } from "react";
import {
	ScrollView,
	Text,
	View,
	Image,
	TouchableOpacity,
	StyleSheet,
	ImageBackground,
} from "react-native";
import axios from "axios";
import UserInput from "../components/UserInput";
import SubmitButton from "../components/SubmitButton";
import Logo from "../components/Logo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/auth";
import { LinkContext } from "../context/link";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import * as ImagePicker from "expo-image-picker";

const Account = ({ navigation }) => {
	const [state, setState] = useContext(AuthContext);
	const [links, setLinks] = useContext(LinkContext);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [role, setRole] = useState("");
	const [image, setImage] = useState({
		url: "",
		public_id: "",
	});
	const [viewImage, setViewImage] = useState("");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (state) {
			const { name, email, role, image } = state.user;
			setName(name);
			setEmail(email);
			setRole(role);
			setImage(image);
		}
	}, [state]);

	const handleChange = async () => {
		setLoading(true);
		if (!password || password.length < 6) {
			setLoading(false);
			alert("Password is required, must be more than 6 characters");
			return;
		}
		try {
			let token = state && state.token ? state.token : "";
			const { data } = await axios.post(
				"/update-password",
				{ password },
				{ headers: { Authorization: `Bearer ${token}` } }
			);
			if (data.error) {
				alert(data.error);
				setLoading(false);
			} else {
				alert("Password updated successfully!");
				setLoading(false);
				setPassword("");
			}
		} catch (err) {
			alert("Something is wrong! Try again later");
			setLoading(false);
		}
	};

	const handleUpload = async () => {
		//Opening gallary
		let permission = await ImagePicker.requestCameraPermissionsAsync();
		if (permission.granted === false) {
			alert("You need to allowe camera access");
			return;
		}
		let result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
			base64: true,
		});
		//console.log(result);
		if (result.cancelled === true) {
			return;
		}
		let token = state && state.token ? state.token : "";
		//View the image
		let b64Image = `data:image/jpg;base64,${result.base64}`;
		setViewImage(b64Image);
		//Send to the server
		const { data } = await axios.post(
			"/image-upload",
			{
				image: b64Image,
			},
			{ headers: { Authorization: `Bearer ${token}` } }
		);
		//console.log("Result =>", data);
		setState({ ...state, user: data });
		setImage(data.image);
		const as = JSON.parse(await AsyncStorage.getItem("@auth"));
		as.user = data;
		await AsyncStorage.setItem("@auth", JSON.stringify(as));
		alert("Updated successfully!");
	};

	const signOut = async () => {
		setState({ token: "", user: null });
		setLinks([]);
		await AsyncStorage.removeItem("@auth");
		alert("See you soon :(");
	};
	return (
		<ImageBackground
			source={require("../assets/back02.jpg")}
			style={{ flex: 1, height: "100%" }}
			blurRadius={2}
			resizeMode="stretch"
		>
			<ScrollView style={styles.container}>
				<Logo>
					{image && image.url ? ( //for exsiting image
						<>
							<Image source={{ uri: image.url }} style={styles.image} />
							<TouchableOpacity
								onPress={() => handleUpload()}
								style={{
									marginTop: -26,
								}}
							>
								<FontAwesome5 name="camera" size={25} color="skyblue" />
							</TouchableOpacity>
						</>
					) : viewImage ? ( //to view an uploaded image
						<>
							<Image source={{ uri: viewImage }} style={styles.image} />
							<TouchableOpacity
								onPress={() => handleUpload()}
								style={{
									marginTop: -26,
								}}
							>
								<FontAwesome5 name="camera" size={25} color="skyblue" />
							</TouchableOpacity>
						</>
					) : (
						//No image
						<TouchableOpacity onPress={() => handleUpload()}>
							<FontAwesome5 name="camera" size={25} color="skyblue" />
						</TouchableOpacity>
					)}
				</Logo>
				<Text style={styles.header}>{name}</Text>
				<Text style={styles.header}>{email}</Text>
				<Text style={styles.header}>{role}</Text>
				<View
					style={{
						backgroundColor: "white",
						marginHorizontal: 30,
						borderRadius: 40,
					}}
				>
					<UserInput
						name="PASSWORD"
						value={password}
						setValue={setPassword}
						secureTextEntry={true}
					/>
				</View>

				<View style={{ marginTop: 10 }}>
					<SubmitButton
						name="Update password"
						handleSubmit={handleChange}
						loading={loading}
					/>
					<SubmitButton
						name="Sign Out"
						handleSubmit={signOut}
						loading={loading}
					/>
				</View>
			</ScrollView>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 50,
	},
	header: {
		alignSelf: "center",
		fontWeight: "bold",
		fontSize: 18,
		color: "white",
		margin: 10,
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
		color: "grey",
	},
	image: {
		height: 150,
		width: 150,
		borderRadius: 100,
	},
});

export default Account;
