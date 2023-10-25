import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createChatRoom, getChatRoomListByMember } from "../../apis/api/chat";
import { SocketContext } from "../../App";
import { Button, Card, Container, Placeholder } from "react-bootstrap";
import { Loading } from "../../component/Loading";
import { createChatRoomService } from "../../apis/services/chat";
import { CHAT_EVENT } from "../../apis/utils/socket";

export const ChatList = () => {
  // const socket = io("http://127.0.0.1:3003").connect();
  const { socket } = useContext(SocketContext);
  const navigator = useNavigate();
  const [roomList, setRoomList] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const addRoomHandler = () => {
    (async () => {
      await createChatRoom()
        .then(createChatRoomService)
        .then((res) => {
          if (res === null) {
            alert("접근 제한");
          } else {
            // socket.current.emit(CHAT_EVENT.JOIN_ROOM, {
            //   roomId: res,
            // });
            navigator(`/chat/${res}`);
          }
        })
        .catch((err) => console.log(err));
    })();
  };
  useEffect(() => {
    (async () => {
      await getChatRoomListByMember()
        .then((data) => setRoomList(data))
        .then(() => setisLoading(false))
        .catch((err) => console.log(err));
    })();
  }, []);
  return isLoading ? (
    <Loading />
  ) : (
    <Container>
      <br />
      <h3>문의 내역</h3>
      {roomList.length === 0 ? (
        <Button variant="primary" onClick={addRoomHandler}>
          채팅하기
        </Button>
      ) : (
        roomList.map((room, idx) => (
          <ChatThumbnail
            key={idx}
            roomId={room.roomId}
            regDate={room.registrationDate}
          />
        ))
      )}
    </Container>
  );
  //   return roomList.map((room, idx) => (
  //     <ChatThumbnail
  //       key={idx}
  //       roomId={room.roomId}
  //       regDate={room.registrationDate}
  //     />
  //   ));
};

const ChatThumbnail = ({ roomId, regDate }) => {
  const navigator = useNavigate();
  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const year = String(date.getFullYear()).padStart(4, "0"); // 년도를 네 자리 숫자로
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 월을 두 자리 숫자로
    const day = String(date.getDate()).padStart(2, "0"); // 일을 두 자리 숫자로
    const hours = String(date.getHours()).padStart(2, "0"); // 시를 두 자리 숫자로
    const minutes = String(date.getMinutes()).padStart(2, "0"); // 분을 두 자리 숫자로
    const seconds = String(date.getSeconds()).padStart(2, "0"); // 초를 두 자리 숫자로

    return `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`;
  };
  return (
    //   <div>
    //     <span>1대1 문의</span>
    //     <span>문의 날짜 : {regDate}</span>
    //     <Link to={`/chat/${roomId}`}>입장하기</Link>
    //   </div>
    <Card className="text-left">
      <Card.Body>
        <Card.Title>
          문의 ID - [{roomId}]{" "}
          <span style={{ color: "gray", fontSize: "11px" }}>
            - {formatDateTime(regDate)} 생성
          </span>{" "}
        </Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary" onClick={() => navigator(`/chat/${roomId}`)}>
          입장하기
        </Button>
      </Card.Body>
    </Card>
  );
};
