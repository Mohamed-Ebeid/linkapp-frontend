import React, { useState, useEffect, useContext } from "react";
import {
	Text,
	View,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	ImageBackground,
} from "react-native";
import axios from "axios";
import { AuthContext } from "../context/auth";
import { LinkContext } from "../context/link";
import FooterNav from "../components/nav/FooterNav";
import PreviewCard from "../components/PreviewCard";
import SubmitButton from "../components/SubmitButton";
import Search from "../components/Search";

const Dashboard = ({ navigation }) => {
	const [state, setState] = useContext(AuthContext);
	const [links, setLinks] = useContext(LinkContext);
	const [page, setPage] = useState(1);
	const [linksCount, setLinksCount] = useState(0);
	const [loading, setLoading] = useState(false);
	const [loading2, setLoading2] = useState(false);
	const [keyword, setKeyword] = useState("");

	useEffect(() => {
		setLoading2(true);
		fetchLinks();
	}, [page]);

	useEffect(() => {
		setLoading(true);
		fetchLinksCount();
	}, []);

	const fetchLinks = async () => {
		const { data } = await axios.get(`/all-links/${page}`);
		setLinks([...links, ...data]);
		setLoading(false);
		setLoading2(false);
	};

	const fetchLinksCount = async () => {
		const { data } = await axios.get("/links-count");
		setLinksCount(data);
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

	const searched = (keyword) => (item) => {
		return item.urlPreview.ogTitle
			.toLowerCase()
			.includes(keyword.toLowerCase());
	};

	return (
		<ImageBackground
			source={require("../assets/back01.jpg")}
			style={{ flex: 1, height: "100%" }}
			blurRadius={2}
			resizeMode="stretch"
		>
			<SafeAreaView style={{ flex: 1, justifyContent: "space-between" }}>
				<ScrollView showsVerticalScrollIndicator={false}>
					<Text style={styles.header}>Recent Links</Text>
					<Search value={keyword} setValue={setKeyword} />

					{loading ? (
						<Text style={styles.header}>Please wait...</Text>
					) : (
						links
							.filter(searched(keyword))
							.map((link) => (
								<PreviewCard
									key={link._id}
									{...link.urlPreview}
									handlePress={handleView}
									link={link}
									showDetails={true}
								/>
							))
					)}
					{linksCount > links?.length && (
						<View style={{ marginBottom: 20, marginTop: -10 }}>
							<SubmitButton
								name={loading2 ? "Please wait" : "Load more"}
								handleSubmit={() => setPage(page + 1)}
							/>
						</View>
					)}
				</ScrollView>
				<FooterNav />
			</SafeAreaView>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	header: {
		alignSelf: "center",
		margin: 20,
		fontSize: 18,
		fontWeight: "bold",
		color: "white",
	},
});

export default Dashboard;
