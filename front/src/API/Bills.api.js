import axios from "axios";

// Envia uma requisição post
async function postBill(payload) {
  const { data } = await axios({
    method: "post",
    url: "http://localhost:3004/bills",
    data: payload,
  });
  return data;
}

async function getBills() {
  const { data } = await axios({
    method: "get",
    url: "http://localhost:3004/bills",
  });
  return data;
}

async function deleteBill(id) {
  const { data } = await axios({
    method: "delete",
    url: `http://localhost:3004/bills/${id}`,
  });
  return data;
}
async function editBill(id, payload) {
  const { data } = await axios({
    method: "put",
    url: `http://localhost:3004/bills/${id}`,
    data: payload,
  });
  return data;
}

export { postBill, getBills, deleteBill, editBill };
