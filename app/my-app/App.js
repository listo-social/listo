import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { supabase } from "/utils/supabase";
import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  "https://xyzcompany.supabase.co",
  "public-anon-key",
);

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app! foo llaaa</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
