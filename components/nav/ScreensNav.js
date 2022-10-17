import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Signup from "../../screens/Signup";
import Signin from "../../screens/Signin";
import Dashboard from "../../screens/Dashboard";
import Account from "../../screens/Account";
import Post from "../../screens/Post";
import Links from "../../screens/Links";
import ForgotPassword from "../../screens/ForgotPassword";
import LinkView from "../../screens/LinkView";
import Profile from "../../screens/Profile";
import TrendingLinks from "../../screens/TrendingLinks";
import { AuthContext } from "../../context/auth";
import HeaderNav from "./HeaderNav";

const Stack = createNativeStackNavigator();

const ScreensNav = () => {
	const [state, setState] = useContext(AuthContext);

	const isLogged = state && state.user !== null && state.token !== "";
	//console.log(state.user.name);
	return (
		<Stack.Navigator intialRouteName="Dashboard">
			{isLogged ? (
				<>
					<Stack.Screen
						name="Dashboard"
						component={Dashboard}
						options={{
							headerRight: () => <HeaderNav />,
						}}
					/>
					<Stack.Screen
						name="Account"
						component={Account}
						options={{ headerRight: () => <HeaderNav /> }}
					/>
					<Stack.Screen name="Post" component={Post} />
					<Stack.Screen name="Link View" component={LinkView} />
					<Stack.Screen
						name="Profile"
						component={Profile}
						options={({ route }) => ({
							title: route?.params?.name
								? state.user.name === route.params.name
									? "Your Links"
									: `${route.params.name}'s Links`
								: "Your Links",

							// headerTransparent: true,
							headerBackTitle: "",
						})}
					/>
					<Stack.Screen
						name="TrendingLinks"
						component={TrendingLinks}
						options={{}}
					/>
				</>
			) : (
				<>
					<Stack.Screen
						name="Sign in"
						component={Signin}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="Sign up"
						component={Signup}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="Forgot Password"
						component={ForgotPassword}
						options={{ title: "" }}
					/>
				</>
			)}
		</Stack.Navigator>
	);
};

export default ScreensNav;
