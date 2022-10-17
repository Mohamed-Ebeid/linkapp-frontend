import React, { useContext } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome5";
import IconSet from "./IconSet";
import { LinkContext } from "../context/link";
import { AuthContext } from "../context/auth";

const PreviewCard = ({
	ogTitle,
	ogDescription,
	ogImage = { url: "https://via.placeholder.com/500x500.png?text=No Image" },
	handlePress = (f) => f,
	link = {},
	showDetails = false,
}) => {
	const [state, setState] = useContext(AuthContext);
	const [links, setLinks] = useContext(LinkContext);

	const handleLike = async (link) => {
		let token = state && state.token ? state.token : "";
		const { data } = await axios.put(
			"/like",
			{ linkId: link._id },
			{ headers: { Authorization: `Bearer ${token}` } }
		);
		setLinks((links) => {
			const index = links.findIndex((l) => l._id === link._id);
			links[index] = data;
			return [...links];
		});
	};

	const handleUnLike = async (link) => {
		let token = state && state.token ? state.token : "";
		const { data } = await axios.put(
			"/unlike",
			{ linkId: link._id },
			{ headers: { Authorization: `Bearer ${token}` } }
		);
		setLinks((links) => {
			const index = links.findIndex((l) => l._id === link._id);
			//data.postedBy = state.user;
			links[index] = data;
			return [...links];
		});
	};

	const ogImageUrl = (ogImage) => {
		if (ogImage?.url) {
			return ogImage.url;
		} else if (ogImage?.url > 0) {
			return ogImage[0].url;
		} else {
			return "https://via.placeholder.com/500x500.png?text=No Image";
		}
	};

	return (
		<View style={styles.container}>
			<Image style={styles.image} source={{ uri: ogImageUrl(ogImage) }} />

			<IconSet
				handleLike={handleLike}
				handleUnLike={handleUnLike}
				showDetails={showDetails}
				link={link}
				auth={state}
			/>

			<TouchableOpacity
				style={styles.container2}
				onPress={() => handlePress(link)}
			>
				<Text style={{ fontWeight: "bold", fontSize: 14 }}>{ogTitle}</Text>
				<Text style={{ fontSize: 12 }}>{ogDescription?.substring(0, 150)}</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff",
		marginHorizontal: 30,
		height: 280,
		borderRadius: 40,
		marginBottom: 30,
	},
	container2: {
		padding: 3,
		margin: 2,
	},
	image: {
		height: "65%",
		width: "100%",
		alignSelf: "center",
		borderRadius: 20,
		resizeMode: "center",
		//backgroundColor: "black",
	},
});

export default PreviewCard;
