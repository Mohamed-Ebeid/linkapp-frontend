import React, { useState, useContext } from "react";
import {
	Text,
	TextInput,
	View,
	ScrollView,
	SafeAreaView,
	StyleSheet,
	ImageBackground,
} from "react-native";
import axios from "axios";
import { AuthContext } from "../context/auth";
import { LinkContext } from "../context/link";
import FooterNav from "../components/nav/FooterNav";
import SubmitButton from "../components/SubmitButton";
import PreviewCard from "../components/PreviewCard";
import ogs from "@uehreka/open-graph-scraper-react-native";
import urlReggex from "url-regex";

const Post = ({ navigation }) => {
	const [state, setState] = useContext(AuthContext);
	const [links, setLinks] = useContext(LinkContext);
	const [link, setLink] = useState("");
	const [title, setTitle] = useState("");
	const [loading, setLoading] = useState(false);
	const [urlPreview, setUrlPreview] = useState({});

	const handleChange = async (text) => {
		try {
			setLoading(true);
			setLink(text);
			if (urlReggex({ strict: false }).test(text)) {
				ogs({ url: text }, (error, results, response) => {
					if (results.success) {
						setUrlPreview(results);
					}
					setLoading(false);
				});
			} else {
				setLoading(false);
			}
		} catch (err) {
			console.log(err.message);
			setLoading(false);
		}
	};

	const handleSubmit = async () => {
		if (!link || !title) {
			alert("Enter a link and a title!");
			return;
		}
		try {
			let token = state && state.token ? state.token : "";
			const { data } = await axios.post(
				"post-link",
				{
					link,
					title,
					urlPreview,
				},
				{ headers: { Authorization: `Bearer ${token}` } }
			);
			//console.log(data);
			setLinks([data, ...links]);
			setTimeout(() => {
				alert("Added seccessfully!!");
				navigation.navigate("Dashboard");
			}, 500);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<ImageBackground
			source={require("../assets/back05.jpg")}
			style={{ flex: 1, height: "100%" }}
			blurRadius={2}
			resizeMode="stretch"
		>
			<ScrollView>
				<View style={{ flex: 1 }}>
					<View style={styles.container}>
						<Text style={styles.text}>Link:</Text>
						<TextInput
							style={styles.input}
							value={link}
							placeholder="Enter a link"
							onChangeText={(text) => handleChange(text)}
						/>
						<Text style={styles.text}>Title:</Text>
						<TextInput
							style={styles.input}
							value={title}
							placeholder="Enter a title"
							onChangeText={(text) => setTitle(text)}
						/>
					</View>
					{urlPreview.requestUrl && <PreviewCard {...urlPreview} />}

					<SubmitButton
						name="Post"
						handleSubmit={handleSubmit}
						loading={loading}
					/>
				</View>
			</ScrollView>
			<View style={styles.container2}>
				<FooterNav />
			</View>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		marginBottom: 10,
		borderRadius: 50,
	},
	container2: {
		flex: 1,
		justifyContent: "flex-end",
	},
	text: {
		margin: 15,
		fontSize: 18,
		marginHorizontal: 24,
		color: "black",
		fontWeight: "bold",
	},
	input: {
		marginHorizontal: 24,
		padding: 20,
		borderWidth: 0.8,
		height: 40,
		borderColor: "grey",
		marginBottom: 10,
		borderRadius: 30,
		height: 60,
	},
});

export default Post;
