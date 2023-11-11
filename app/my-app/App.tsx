import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { supabase } from "./utils/supabase";
import React from "react";
import { AuthTokenResponse } from "@supabase/supabase-js";

async function signIn(
  email: string,
  password: string,
): Promise<AuthTokenResponse> {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
}

export default function App() {
  const [userEmail, onChangeEmail] = React.useState("");
  const [userPassword, onChangePassword] = React.useState("");
  const [authResponse, setAuthResponse] = React.useState<
    AuthTokenResponse | null
  >(null);

  useEffect(() => {
    supabase.auth.signInWithPassword({
      email: "contato@manacespereira.com.br",
      password: "mana",
    }).then((response) => {
      console.log(response);

      supabase.from("recommendation").select("*").then((res) => {
        console.log("RES: ", res);
      });
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Welcome to Listo!</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeEmail}
        placeholder="email"
        value={userEmail}
      />
      <TextInput
        secureTextEntry={true}
        style={styles.input}
        onChangeText={onChangePassword}
        value={userPassword}
        placeholder="password"
      />
      <Button
        title="Sign In"
        onPress={async () =>
          setAuthResponse(await (signIn(userEmail, userPassword)))}
      />
      <Text>
        {authResponse == null
          ? ""
          : (authResponse.error == null
            ? "Success"
            : authResponse.error.message)}
      </Text>
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
