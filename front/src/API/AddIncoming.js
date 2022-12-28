import axios from "axios";

// Envia uma requisição post
async function postRow(payload) {
  const { data } = await axios({
    method: "post",
    url: "http://localhost:3004/rows",
    data: payload,
  });
  return data;
}

async function getRows() {
  const { data } = await axios({
    method: "get",
    url: "http://localhost:3004/rows",
  });
  return data;
}

async function deleteRow(id) {
  const { data } = await axios({
    method: "delete",
    url: `http://localhost:3004/rows/${id}`,
  });
  return data;
}

export { postRow, getRows, deleteRow };
