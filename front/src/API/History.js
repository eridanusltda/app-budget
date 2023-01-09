import axios from "axios";

async function getHistory() {
  const { data } = await axios({
    method: "get",
    url: "http://localhost:3004/history",
  });
  return data;
}

export { getHistory };
