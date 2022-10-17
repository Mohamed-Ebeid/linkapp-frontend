import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome5";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useNavigation } from "@react-navigation/native";

const IconSet = ({ handleLike, handleUnLike, showDetails, link, auth }) => {
	const navigation = useNavigation();
	const [realUser, setRealUser] = useState("");
	useEffect(() => {}, []);

	return (
		<>
			{showDetails && (
				<>
					<View style={styles.icon}>
						<Icon name="eye" size={25} color="#ff9900" />
						<Text style={styles.text}>{link?.views}</Text>
					</View>

					{link?.likes?.includes(auth?.user?._id) ? (
						<TouchableOpacity
							style={styles.icon2}
							onPress={() => handleUnLike(link)}
						>
							<Icon name="heartbeat" size={25} color="#ff9900" />
							<Text style={styles.text}>{link?.likes.length}</Text>
						</TouchableOpacity>
					) : (
						<TouchableOpacity
							style={styles.icon2}
							onPress={() => handleLike(link)}
						>
							<Icon
								name="heart"
								size={25}
								color="#ff9900"
								style={{ alignSelf: "center" }}
							/>
							<Text style={styles.text}>{link?.likes.length}</Text>
						</TouchableOpacity>
					)}
					<TouchableOpacity
						style={styles.icon3}
						onPress={() =>
							navigation.navigate("Profile", {
								name: link?.postedBy?.name,
								_id: link?.postedBy?._id,
							})
						}
					>
						<Icon
							name="user"
							size={25}
							color="#ff9900"
							style={{ alignSelf: "center" }}
						/>
						<Text style={styles.text}>
							{link?.postedBy?.name?.substr(0, 3)}
						</Text>
					</TouchableOpacity>
					<View style={styles.icon4}>
						<Icon
							name="clock"
							size={25}
							color="#ff9900"
							style={{ alignSelf: "center" }}
						/>
						<Text style={styles.text}>
							{dayjs(link.createdAt).format("DD/MM/YY")}
						</Text>
					</View>
				</>
			)}
		</>
	);
};

const styles = StyleSheet.create({
	icon: {
		padding: 2,
		position: "absolute",
		right: 20,
		top: 5,
		backgroundColor: "grey",
		borderRadius: 50,
	},
	icon2: {
		padding: 2,
		position: "absolute",
		right: 70,
		top: 5,
		backgroundColor: "grey",
		borderRadius: 50,
	},
	icon3: {
		padding: 2,
		position: "absolute",
		left: 20,
		top: 5,
		backgroundColor: "grey",
		borderRadius: 50,
	},
	icon4: {
		padding: 2,
		position: "absolute",
		left: 70,
		top: 5,
		backgroundColor: "grey",
		borderRadius: 10,
	},
	text: {
		alignSelf: "center",
		color: "#ff9900",
		alignItems: "center",
	},
});

export default IconSet;
