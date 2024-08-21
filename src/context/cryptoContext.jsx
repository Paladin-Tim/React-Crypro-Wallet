import { createContext, useEffect, useState, useContext } from "react";
import { fetchCrypto } from "../api";

const CryptoContext = createContext({
  crypto: [],
});

export function CryptoContextProvider({ children }) {
  const [crypto, setCrypto] = useState([]);

  useEffect(() => {
    async function preload() {
      const { result } = await fetchCrypto();
      setCrypto(result);
    }
    preload();

    // eslint-disable-next-line
  }, []);

  return (
    <CryptoContext.Provider value={{ crypto }}>
      {children}
    </CryptoContext.Provider>
  );
}

export default CryptoContext;

export function useCrypto() {
  return useContext(CryptoContext);
}
