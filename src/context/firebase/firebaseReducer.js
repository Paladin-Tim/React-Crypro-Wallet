import { SHOW_LOADER, ADD_ASSET, FETCH_ASSETS, REMOVE_ASSET } from "../types";

const handlers = {
  [SHOW_LOADER]: (state) => ({ ...state, loading: true }),
  [ADD_ASSET]: (state, { payload }) => ({
    ...state,
    assets: [...state.assets, payload],
  }),
  [FETCH_ASSETS]: (state, { payload }) => ({
    ...state,
    assets: payload,
    loading: false,
  }),
  [REMOVE_ASSET]: (state, { payload }) => ({
    ...state,
    assets: state.assets.filter((asset) => asset.assetKey !== payload),
  }),
  DEFAULT: (state) => state,
};

export default function firebaseReducer(state, action) {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
}
