import React from "react";
import { CryptoContextProvider } from "./context/cryptoContext";
import AppLayout from "./components/layout/AppLayout";
import FirebaseState from "./context/firebase/FirebaseState";
import "./App.css";

export default function App() {
  return (
    <FirebaseState>
      <CryptoContextProvider>
        <AppLayout />
      </CryptoContextProvider>
    </FirebaseState>
  );
}
