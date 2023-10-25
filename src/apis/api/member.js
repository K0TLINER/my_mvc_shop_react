import { defaultInstance } from "../utils/instance";

const MEMBER_API_URI = "/member";

export const checkToken = async () => {
  try {
    const token = localStorage.getItem("token");
    if (token === null) return null;
    const { data } = await defaultInstance.get(`${MEMBER_API_URI}/checkToken`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (err) {
    console.log("checkToken Error: " + err);
    return null;
  }
};

export const login = async (email, password) => {
  try {
    const { data } = await defaultInstance.post(
      `${MEMBER_API_URI}/login`,
      JSON.stringify({
        email: email,
        password: password,
      }),
      {
        headers: {
          "Content-type": "application/json;charset=UTF-8",
        },
      }
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};
