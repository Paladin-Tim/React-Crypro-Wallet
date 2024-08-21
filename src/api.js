const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    "X-API-KEY": "ACJTj3VY1oEchj6McggDfR6kyipe7avG7lmOmhE/zGs=",
  },
};

export async function fetchCrypto() {
  const data = await fetch("https://openapiv1.coinstats.app/coins", options);
  return new Promise((resolve, reject) => {
    resolve(data.json());
    reject((err) => console.error(err));
  });
}
