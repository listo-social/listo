import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { supabase } from "./utils/supabase";
import { AuthTokenResponse } from "@supabase/supabase-js";

async function signIn(
  email: string,
  password: string
): Promise<AuthTokenResponse> {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
}

export default function App() {
  const [userEmail, onChangeEmail] = useState("");
  const [userPassword, onChangePassword] = useState("");
  const [authResponse, setAuthResponse] = useState<AuthTokenResponse | null>(
    null
  );

  return (
    <View style={styles.container}>
      <Text>Welcome to Listo!</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeEmail}
        placeholder="Email"
        value={userEmail}
      />
      <TextInput
        secureTextEntry={true}
        style={styles.input}
        onChangeText={onChangePassword}
        value={userPassword}
        placeholder="Password"
      />
      <Button
        title="Sign In"
        onPress={async () =>
          setAuthResponse(await signIn(userEmail, userPassword))
        }
      />
      <Text>
        {authResponse == null
          ? ""
          : authResponse.error == null
          ? "Success"
          : authResponse.error.message}
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
    paddingHorizontal: 30,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: "100%",
    borderRadius: 10,
  },
});
