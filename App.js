import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import Signup from "./screens/Signup";
import Signin from "./screens/Signin";
import Dashboard from "./screens/Dashboard";
import { AuthProvider } from "./context/auth";
import RootNavigation from "./config/navigation";

const Stack = createNativeStackNavigator();
export default function App() {
  return <RootNavigation />;
}
