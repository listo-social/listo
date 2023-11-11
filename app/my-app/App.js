import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { supabase } from "./utils/supabase";

export default function App() {

  useEffect(() => {
    supabase.auth.signInWithPassword({
      email: 'contato@manacespereira.com.br',
      password: 'mana'
    }).then(response => {
      console.log(response)
      alert('Welcome, ' + response.data.user.email)

      supabase.from('recommendation').select('*').then(res => {console.log('RES: ', res)})
    })
  }, [])

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
