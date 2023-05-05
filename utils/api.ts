import axios from "axios";

const gameAPI = axios.create({
  baseURL: "http://localhost:9090/api",
});

export const createNewAccount = async (postedAccount) => {
  console.log(postedAccount);

  const response = await gameAPI.post("/auth/signup", postedAccount);
  return response.data;
};

export const createCharacter = async (postedCharacter) => {
  const response = await gameAPI.post("/characters/create", postedCharacter);
  return response.data;
};

export const login = async (account) => {
  // console.log(account);
  const response = await gameAPI.post("/login", account);
  return response.data;
};

export const getUsers = async () => {
  const response = await gameAPI.get("/characters");
  return response;
};
