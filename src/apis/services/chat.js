export const createChatRoomService = (data) => {
  if (data === null) return null;
  const { roomId } = data;
  return roomId;
};

export const getChatMessageListByRoomIdService = (data) => {
  return data.map((chat, inx) => {
    const { message, member, registrationDate } = chat;
    return {
      content: message,
      nickname: member.role === "ADMIN" ? "관리자" : member.nickname,
      regDate: registrationDate,
    };
  });
};

export const addChatMessageService = (data) => {
  const { message, chatRoom, member, registrationDate } = data;
  return {
    roomId: chatRoom.roomId,
    content: message,
    nickname: member.role === "ADMIN" ? "관리자" : member.nickname,
    regDate: registrationDate,
  };
};
