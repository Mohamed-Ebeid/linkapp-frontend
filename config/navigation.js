import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "../context/auth";
import { LinkProvider } from "../context/link";
import ScreenNav from "../components/nav/ScreensNav";

const RootNavigation = () => {
	return (
		<NavigationContainer>
			<AuthProvider>
				<LinkProvider>
					<ScreenNav />
				</LinkProvider>
			</AuthProvider>
		</NavigationContainer>
	);
};

export default RootNavigation;
