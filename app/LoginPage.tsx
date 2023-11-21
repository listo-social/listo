import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Button,
  Text,
  Input,
  AlertCircleIcon,
  Box,
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
  InputField,
  AddIcon,
  Alert,
  AlertIcon,
  AlertText,
  ButtonIcon,
  ButtonText,
  InfoIcon,
  VStack,
  PlayIcon,
  Spinner,
} from "@gluestack-ui/themed";
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
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [authResponse, setAuthResponse] = useState<AuthTokenResponse | null>(
    null
  );

  async function handleSignIn() {
    try {
      setLoading(true);
      const response = await signIn(userEmail, userPassword);
      setAuthResponse(response);
    } catch (error) {
      setAuthResponse(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box h="100%" justifyContent="center" alignItems="center">
      <VStack space="lg" reversed={false} width="100%" paddingHorizontal={30}>
        <Text color="green" fontSize={20} textAlign="center">
          Welcome to Listo!
        </Text>

        <FormControl isRequired isDisabled={loading}>
          <FormControlLabel mb="$1">
            <FormControlLabelText>Email</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <InputField
              type="text"
              placeholder="Email"
              defaultValue={userEmail}
              onChangeText={setUserEmail}
            />
          </Input>
        </FormControl>

        <FormControl isRequired isDisabled={loading}>
          <FormControlLabel mb="$1">
            <FormControlLabelText>Password</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <InputField
              type="text"
              placeholder="Password"
              defaultValue={userPassword}
              onChangeText={setUserPassword}
            />
          </Input>
        </FormControl>

        <Button
          size="lg"
          variant="solid"
          action="primary"
          isDisabled={loading}
          isFocusVisible={false}
          onPress={handleSignIn}
        >
          <ButtonText>Sign In! </ButtonText>
          {loading && <Spinner color="yellow" size="small" />}
        </Button>

        {!!authResponse && (
          <Alert mx="$2.5" action="error" variant="accent">
            <AlertIcon as={InfoIcon} mr="$3" />
            <AlertText>
              {authResponse == null
                ? ""
                : authResponse.error == null
                ? "Success"
                : authResponse.error.message}
            </AlertText>
          </Alert>
        )}
        <StatusBar style="auto" />
      </VStack>
    </Box>
  );
}
