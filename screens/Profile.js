import React, { useState, useEffect, useContext } from "react";
import {
	View,
	Text,
	ScrollView,
	Image,
	StyleSheet,
	SafeAreaView,
	TouchableOpacity,
	ImageBackground,
} from "react-native";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import { LinkContext } from "../context/link";
import { AuthContext } from "../context/auth";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Divider } from "@rneui/base";
import Icon from "react-native-vector-icons/FontAwesome5";

dayjs.extend(relativeTime);

export default function Profile({ navigation }) {
	const [auth, setAuth] = useContext(AuthContext);
	const [links, setLinks] = useContext(LinkContext);
	const [userProfile, setUserProfile] = useState({});
	const [userLinks, setUserLinks] = useState([]);
	const [loading, setLoading] = useState(false);
	const route = useRoute();
	const routeParamsId = route?.params?._id;

	useEffect(() => {
		setLoading(true);
		const fetchUserLinks = async (userId) => {
			try {
				const { data } = await axios.get(`/user-profile/${userId}`);
				//console.log("User and Links =>", data);
				setUserProfile(data.profile);
				setUserLinks(data.links);
				setLoading(false);
			} catch (err) {
				console.log(err);
			}
		};
		routeParamsId
			? fetchUserLinks(routeParamsId)
			: fetchUserLinks(auth.user._id);
	}, []);

	const handleDelete = async (id) => {
		let token = auth && auth.token ? auth.token : "";
		setLoading(true);
		try {
			const { data } = await axios.delete(`/link-delete/${id}`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			if (data.error) {
				alert(data.error);
				setLoading(false);
				return;
			}
			setUserLinks((links) => {
				const index = links.findIndex((l) => l._id === id);
				userLinks.splice(index, 1);
				return [...links];
			});
			setLinks((links) => {
				const index = links.findIndex((l) => l._id === id);
				links.splice(index, 1);
				return [...links];
			});
			setLoading(false);
			alert("Deleted Successfully!");
		} catch (err) {
			console.log(err);
			setLoading(false);
			alert("Deleted Failed!");
		}
	};
	return (
		<ImageBackground
			source={require("../assets/background.jpg")}
			style={{ flex: 1, height: "100%" }}
			blurRadius={2}
			resizeMode="stretch"
		>
			{loading ? (
				<View style={{ alignItems: "center", marginTop: 50 }}>
					<Text style={styles.text}>Please Wait ...</Text>
				</View>
			) : (
				<SafeAreaView style={styles.container}>
					<ScrollView>
						<View style={{ alignItems: "center", marginTop: 50 }}>
							<Image
								source={{
									uri: userProfile?.image?.url
										? userProfile.image.url
										: "https://via.placeholder.com/500x500.png?text=No image",
								}}
								style={styles.img}
							/>
							<Text style={styles.text}>{userProfile.name}</Text>
							<Text style={styles.text}>{userProfile.role}</Text>
							<Text style={styles.text}>
								Joined {dayjs(userProfile.createdAt).fromNow()}
							</Text>
							<Divider
								orientation="vertical"
								width={7}
								style={{ marginTop: 10 }}
							/>
							<Text style={styles.text}> {userLinks?.length} Links </Text>
						</View>
						{userLinks.map((l) => (
							<View key={l._id} style={styles.container2}>
								<Text style={styles.text2}>{l.urlPreview?.ogTitle}</Text>
								<Text style={styles.text2}>{l.views} views</Text>
								{auth?.user._id === l?.postedBy?._id && (
									<TouchableOpacity
										onPress={() => handleDelete(l._id)}
										style={{ marginBottom: 10 }}
									>
										<Icon name="trash" color="red" />
									</TouchableOpacity>
								)}
							</View>
						))}
					</ScrollView>
				</SafeAreaView>
			)}
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingTop: 10,
		paddingHorizontal: 30,
	},
	container2: {
		borderWidth: 1,
		borderColor: "thistle",
		borderRadius: 50,
		alignItems: "center",
		marginBottom: 10,
		marginTop: 5,
	},
	text: {
		fontWeight: "bold",
		fontSize: 18,
		color: "white",
		marginTop: 15,
	},
	text2: {
		fontWeight: "bold",
		fontSize: 18,
		color: "white",
		margin: 2,
	},
	img: {
		height: 120,
		width: 120,
		borderRadius: 80,
	},
});
