import { useReducer } from "react";
import axios from "axios";
import { FirebaseContext } from "./firebaseContext";
import firebaseReducer from "./firebaseReducer";
import { fetchCrypto } from "../../api";
import { percentDifference } from "../../utils";
import { SHOW_LOADER, ADD_ASSET, FETCH_ASSETS, REMOVE_ASSET } from "../types";

const url = process.env.REACT_APP_DB_URL;

export default function FirebaseState({ children }) {
  const initialState = {
    assets: [],
    loading: false,
  };
  const [state, dispatch] = useReducer(firebaseReducer, initialState);
  const showLoader = () => dispatch({ type: SHOW_LOADER });

  function mapAssets(assets, result) {
    return assets.map((asset) => {
      const coin = result.find((c) => c.id === asset.id);
      return {
        grow: asset.price < coin.price,
        growPercent: percentDifference(asset.price, coin.price),
        totalAmount: asset.amount * coin.price,
        totalProfit: asset.amount * coin.price - asset.amount * asset.price,
        ...asset,
      };
    });
  }

  async function fetchAssets() {
    showLoader();
    const response = await axios.get(`${url}/assets.json`);
    const { result } = await fetchCrypto();
    const assets = Object.keys(response.data || []).map((key) => {
      return {
        ...response.data[key],
        assetKey: key,
      };
    });
    const payload = mapAssets(assets, result);
    dispatch({ type: FETCH_ASSETS, payload });
  }

  async function addAsset(newAsset) {
    const res = await axios.get(`${url}/assets.json`);

    const payload = { ...newAsset };

    try {
      if (!res.data) {
        await axios
          .post(`${url}/assets.json`, newAsset, {
            transformResponse: function (response) {
              return response;
            },
          })
          .then((response) => {
            newAsset.assetKey = response.data.slice(9, 29);
            dispatch({
              type: ADD_ASSET,
              payload,
            });
            fetchAssets();
          });
      } else {
        const match = Object.entries(res.data).find((el) =>
          el.find((e) => e.id === newAsset.id)
        );

        !match
          ? await axios
              .post(`${url}/assets.json`, newAsset, {
                transformResponse: function (response) {
                  return response;
                },
              })
              .then((response) => {
                newAsset.assetKey = response.data.slice(9, 29);
                dispatch({
                  type: ADD_ASSET,
                  payload,
                });
                fetchAssets();
              })
          : await axios
              .patch(
                `${url}/assets/${match[0]}.json`,
                {
                  ...match[1],
                  amount: match[1].amount + newAsset.amount,
                },
                {
                  transformResponse: function (response) {
                    return response;
                  },
                }
              )
              .then((response) => {
                match[1].assetKey = response.data.slice(9, 29);
                fetchAssets();
              });
      }
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async function removeAsset(asset) {
    await axios.delete(`${url}/assets/${asset.assetKey}.json`);

    dispatch({
      type: REMOVE_ASSET,
      payload: asset.assetKey,
    });
  }

  return (
    <FirebaseContext.Provider
      value={{
        addAsset,
        removeAsset,
        fetchAssets,
        showLoader,
        wallet: state.assets,
        loading: state.loading,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
}
