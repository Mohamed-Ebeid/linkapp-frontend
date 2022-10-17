import React, { useState, useEffect, useContext } from "react";
import {
	Text,
	View,
	SafeAreaView,
	ScrollView,
	ImageBackground,
	StyleSheet,
} from "react-native";
import axios from "axios";
import { AuthContext } from "../context/auth";
import { LinkContext } from "../context/link";
import FooterNav from "../components/nav/FooterNav";
import PreviewCard from "../components/PreviewCard";

const TrendingLinks = ({ navigation }) => {
	const [state, setState] = useContext(AuthContext);
	const [links, setLinks] = useContext(LinkContext);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		fetchLinks();
	}, []);

	const fetchLinks = async () => {
		try {
			const { data } = await axios.get("/all-links");
			setLinks(data);
			setLoading(false);
		} catch (err) {
			console.log(err);
		}
	};

	const handleView = async (link) => {
		await axios.put(`/view-count/${link._id}`);
		navigation.navigate("Link View", { link });
		setLinks(() => {
			const index = links.findIndex((l) => l._id === link._id);
			links[index] = { ...link, views: link.views + 1 };
			return [...links];
		});
	};

	return (
		<ImageBackground
			source={require("../assets/back03.png")}
			style={{ flex: 1, height: "100%" }}
			blurRadius={2}
			resizeMode="stretch"
		>
			<View style={{ alignItems: "center" }}>
				<Text style={styles.header}>Top 3 Links:</Text>
			</View>
			<RenderLinks
				links={
					links &&
					links.sort((a, b) => (a.views < b.views ? 1 : -1)).slice(0, 3)
				}
				handleView={handleView}
			/>

			<SafeAreaView
				style={{ flex: 1, justifyContent: "space-between", marginTop: 15 }}
			>
				<View style={{ flex: 1, justifyContent: "flex-end" }}>
					<FooterNav />
				</View>
			</SafeAreaView>
		</ImageBackground>
	);
};

const RenderLinks = ({ links, handleView }) => (
	<ScrollView
		horizontal
		showVerticalScrollIndicator={false}
		contentContainerStyle={{ flexGrow: 1 }}
	>
		{links.map((link) => (
			<View key={link._id} style={styles.container}>
				<PreviewCard
					{...link.urlPreview}
					handleView={handleView}
					link={link}
					showDetails={true}
				/>
			</View>
		))}
	</ScrollView>
);

const styles = StyleSheet.create({
	container: {
		marginTop: 100,
		width: 420,
		height: 350,
		alignSelf: "center",
	},
	header: {
		// alignSelf: "center",
		marginTop: 40,
		fontSize: 24,
		fontWeight: "bold",
		color: "white",
	},
});

export default TrendingLinks;
