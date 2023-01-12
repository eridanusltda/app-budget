import axios from "axios";

async function getHistory() {
  const { data } = await axios({
    method: "get",
    url: "http://localhost:3004/history",
  });
  return data;
}

async function getSavings() {
  const { data } = await axios({
    method: "get",
    url: "http://localhost:3004/savings",
  });
  return data;
}

async function changeSavings(payload) {
  const { data } = await axios({
    method: "put",
    url: `http://localhost:3004/savings`,
    data: payload,
  });
  return data;
}

export { getHistory, getSavings, changeSavings };
