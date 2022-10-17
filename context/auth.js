import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API } from "../config/config";
import { useNavigation } from "@react-navigation/native";

export const AuthContext = createContext();

//App wrapper
export const AuthProvider = ({ children }) => {
	const [state, setState] = useState({
		user: null,
		token: "",
	});
	const navigation = useNavigation();
	axios.defaults.baseURL = API;

	//Expired token
	axios.interceptors.response.use(
		async function (response) {
			return response;
		},
		async function (err) {
			let res = err.response;
			//console.log(res);
			if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
				await AsyncStorage.removeItem("@auth");
				setState({ user: null, token: "" });
				console.log("JWT expired");
				navigation.navigate("Sign in");
			}
		}
	);

	useEffect(() => {
		const gettingAuth = async () => {
			let data = await AsyncStorage.getItem("@auth");
			//console.log("Data=>", data)
			const as = JSON.parse(data);
			if (as !== null) {
				setState({ ...state, user: as.user, token: as.token });
			}
		};
		gettingAuth();
	}, []);

	return (
		<AuthContext.Provider value={[state, setState]}>
			{children}
		</AuthContext.Provider>
	);
};
