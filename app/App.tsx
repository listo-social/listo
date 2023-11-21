import React from "react";
import { GluestackUIProvider, Text, Box, Button, ButtonText, ButtonIcon, AddIcon } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config"; // Optional if you want to use default theme
import LoginPage from "./LoginPage";

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <LoginPage />
    </GluestackUIProvider>
  );
}
