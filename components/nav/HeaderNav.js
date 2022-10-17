import React, { useContext } from "react";
import { Text, View, TouchableOpacity, SafeAreaView } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../context/auth";
import { useNavigation } from "@react-navigation/native";

const HeaderNav = () => {
	const [state, setState] = useContext(AuthContext);
	const navigation = useNavigation();

	return (
		<View>
			<TouchableOpacity onPress={() => navigation.navigate("TrendingLinks")}>
				<Icon name="bell" size={25} color="#6666ff" />
			</TouchableOpacity>
		</View>
	);
};

export default HeaderNav;
