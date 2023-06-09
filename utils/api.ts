import axios from "axios";

const gameAPI = axios.create({
  baseURL: "https://cosmic-conflict-api.onrender.com/api",
});

interface NewAccount {
  username: string;
  password: string;
  email: string;
}

export const createNewAccount = async (postedAccount: NewAccount) => {
  try {
    const response = await gameAPI.post("/auth/signup", postedAccount);
    return response.data;
    console.log(response);
  } catch (err) {
    console.log(err);
    throw err.response.data;
  }
};

interface Account {
  username: string;
  password: string;
}

export const login = async (account: Account) => {
  console.log(account);
  try {
    const response = await gameAPI.post("/auth/login", account);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const logout = async () => {
  try {
    const response = await gameAPI.post("/auth/logout");
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

export const getAllCharacters = async () => {
  try {
    const response = await gameAPI.get("/characters");
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

interface Character {
  race: string;
  characterName: string;
  username: string;
}

export const createNewCharacter = async (newCharacter: Character) => {
  try {
    const response = await gameAPI.post("/characters", newCharacter);
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

export const getUserCharacter = async (queryKey, queryValue) => {
  try {
    const response = await gameAPI.get(
      `/characters/single?${queryKey}=${queryValue}`
    );
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

export const attackCharacter = async (enemy) => {
  const character = enemy.characterName;
  try {
    const response = await gameAPI.post(`/battle/attack/${character}`);
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

export const getBattleLog = async () => {
  try {
    const response = await gameAPI.get(`/battle/log`);
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

export const getAllItems = async () => {
  try {
    const response = await gameAPI.get("/shop");
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

export const getSingleItem = async (itemId) => {
  try {
    const response = await gameAPI.get(`/shop/${itemId}`);
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

export const buyItem = async (itemId) => {
  try {
    const response = await gameAPI.patch(`/shop/${itemId}/purchase`);
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};
