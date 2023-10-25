import { defaultInstance } from "../utils/instance";

const CHAT_API_URI = "/chat";

export const getChatRoomListByMember = async () => {
  const token = localStorage.getItem("token");
  if (token === null) return [];
  const { data } = await defaultInstance.get(`${CHAT_API_URI}/getRoomList`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// export const createChatRoom = async () => {
//   const token = localStorage.getItem("token");
//   if (token === null) return {};
//   const { data } = await defaultInstance.post(`${CHAT_API_URI}`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       // "Content-type": "application/json;charset=UTF-8",
//     },
//   });
//   return data;
// };

export const createChatRoom = async () => {
  try {
    const token = localStorage.getItem("token");
    if (token === null) return null;
    const { data } = await defaultInstance.post(
      `${CHAT_API_URI}/addRoom`,
      {},
      {
        headers: {
          "Content-type": "application/json;charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getChatMessageListByRoomId = async (roomId) => {
  try {
    const token = localStorage.getItem("token");
    if (token === null) return [];
    const { data } = await defaultInstance.get(
      `${CHAT_API_URI}/getMessageList/${roomId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const addChatMessage = async (roomId, message) => {
  try {
    const token = localStorage.getItem("token");
    if (token === null) return [];
    const { data } = await defaultInstance.post(
      `${CHAT_API_URI}/addMessage`,
      {
        roomId: roomId,
        message: message,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};
