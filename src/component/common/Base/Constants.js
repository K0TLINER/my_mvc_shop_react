export const API_URL = "http://127.0.0.1:8080";
// export const

export const formatDateTime = (dateTimeString) => {
  const date = new Date(dateTimeString);
  const year = String(date.getFullYear()).padStart(4, "0"); // 년도를 네 자리 숫자로
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 월을 두 자리 숫자로
  const day = String(date.getDate()).padStart(2, "0"); // 일을 두 자리 숫자로
  const hours = String(date.getHours()).padStart(2, "0"); // 시를 두 자리 숫자로
  const minutes = String(date.getMinutes()).padStart(2, "0"); // 분을 두 자리 숫자로
  const seconds = String(date.getSeconds()).padStart(2, "0"); // 초를 두 자리 숫자로

  return `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`;
};
