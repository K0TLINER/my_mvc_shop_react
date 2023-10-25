export const loginService = (data) => {
  const { token } = data;
  localStorage.setItem("token", token);
  return true;
};

export const memberFromTokenService = (data) => {
  if (!data) return null;
  const { email, nickname, role } = data;
  return {
    email,
    nickname,
    role: role === "ROLE_USER" ? "USER" : "ADMIN",
  };
};
