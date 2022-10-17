import React, { useEffect, useState } from "react";
import { Text, View, SafeAreaView } from "react-native";
import FooterNav from "../components/nav/FooterNav";
import { WebView } from "react-native-webview";

const LinkView = ({ route }) => {
	const [web, setWeb] = useState("");

	useEffect(() => {
		if (route.params?.link) {
			if (route.params.link.link.includes("http" || "https")) {
				setWeb(route.params.link.link);
			} else {
				setWeb(`http://${route.params.link.link}`);
			}
		}
	}, []);
	return <WebView startInLoadingState source={{ uri: web }} />;
};

export default LinkView;
