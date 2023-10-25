// import { useContext, useEffect, useRef, useState } from "react";
// import { Button, Card, Container, Form, InputGroup } from "react-bootstrap";
// import {
//   createChatRoom,
//   getChatMessageListByRoomId,
//   getChatRoomListByMember,
// } from "../../apis/api/chat";
// import {
//   createChatRoomService,
//   getChatMessageListByRoomIdService,
//   getChatRoomListByMemberService,
// } from "../../apis/services/chat";
// import { AuthContext } from "../../App";

import { useContext, useEffect, useState } from "react";
import { AuthContext, SocketContext } from "../../App";
import { CHAT_EVENT } from "../../apis/utils/socket";
import { useParams } from "react-router-dom";
import {
  addChatMessage,
  getChatMessageListByRoomId,
  getChatRoomListByMember,
} from "../../apis/api/chat";
import {
  addChatMessageService,
  getChatMessageListByRoomIdService,
} from "../../apis/services/chat";
import { Form, Button, Card, Container, InputGroup } from "react-bootstrap";

// export const ChatForm = () => {
//   const socket = useRef();
//   const { profile } = useContext(AuthContext);
//   const [message, setMessage] = useState("");
//   const [roomId, setRoomId] = useState("");
//   const [chatMessages, setChatMessages] = useState([]);
//   const handleSendMessage = () => {
//     if (message.trim() !== "") {
//       socket.current.send(
//         JSON.stringify({
//           roomId: roomId,
//           message: message,
//           token: `${localStorage.getItem("token")}`,
//         })
//       );
//       // setChatMessages((prevMessages) => [...prevMessages, message]);
//       setMessage("");
//     }
//   };
//   const formatDateTime = (dateTimeString) => {
//     const date = new Date(dateTimeString);
//     const year = String(date.getFullYear()).padStart(4, "0"); // 년도를 네 자리 숫자로
//     const month = String(date.getMonth() + 1).padStart(2, "0"); // 월을 두 자리 숫자로
//     const day = String(date.getDate()).padStart(2, "0"); // 일을 두 자리 숫자로
//     const hours = String(date.getHours()).padStart(2, "0"); // 시를 두 자리 숫자로
//     const minutes = String(date.getMinutes()).padStart(2, "0"); // 분을 두 자리 숫자로
//     const seconds = String(date.getSeconds()).padStart(2, "0"); // 초를 두 자리 숫자로

//     return `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`;
//   };
//   const handleInputKeyDown = (e) => {
//     // console.log(e.nativeEvent.isComposing);
//     if (e.key === "Enter" && !e.nativeEvent.isComposing) {
//       // if (e.nativeEvent.isComposing) setMessage((prev) => prev + " ");
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };
//   useEffect(() => {
//     const _socket = new WebSocket("ws://127.0.0.1:8080/ws/chat");
//     socket.current = _socket;

//     _socket.onopen = () => {
//       (async () => {
//         await getChatRoomListByMember()
//           .then(getChatRoomListByMemberService)
//           .then((res) => {
//             if (res) {
//               setRoomId(res);
//               (async () => {
//                 await getChatMessageListByRoomId(res)
//                   .then(getChatMessageListByRoomIdService)
//                   .then((res) => setChatMessages(res))
//                   .catch((err) => console.log(err));
//               })();
//             } else {
//               (async () => {
//                 await createChatRoom()
//                   .then(createChatRoomService)
//                   .then((res) => setRoomId(res))
//                   .catch((err) => console.log(err));
//               })();
//             }
//           })
//           .catch((err) => console.log(err));
//       })();
//     };

//     _socket.onmessage = (e) => {
//       const data = e.data.replace(/"/g, "");
//       console.log(data.split("/")[2]);
//       console.log(data.split("/")[2] === profile.nickname);
//       setChatMessages((prev) => [
//         ...prev,
//         {
//           content: data.split("/")[0],
//           regDate: data.split("/")[1],
//           nickname: data.split("/")[2],
//         },
//       ]);
//       // console.log("Received message: " + e.data);
//     };

//     _socket.onclose = (event) => {
//       if (event.wasClean) {
//         console.log(
//           "Connection closed cleanly, code=" +
//             event.code +
//             ", reason=" +
//             event.reason
//         );
//       } else {
//         console.error("Connection died");
//       }
//     };

//     return () => {
//       // Clean up the WebSocket when the component unmounts.
//       _socket.close();
//     };
//   }, []);
//   return (
//     <Container>
//       <Card className="text-center">
//         <Card.Header>1:1 채팅</Card.Header>
//         <Card.Body>
//           {/* <Card.Title>Special title treatment</Card.Title> */}
//           {chatMessages.map((message, idx) => {
//             return (
//               <Card.Text
//                 key={idx}
//                 className={
//                   message.nickname === profile.nickname
//                     ? "text-left"
//                     : "text-right"
//                 }
//               >
//                 <div>{message.nickname}</div>
//                 <span
//                   style={{
//                     backgroundColor: "yellow",
//                     display: "inline-block",
//                     padding: "10px",
//                     borderRadius: "10px",
//                   }}
//                 >
//                   {message.content}
//                   <br />
//                   <span style={{ color: "gray", fontSize: "11px" }}>
//                     - {formatDateTime(message.regDate)}
//                   </span>
//                 </span>
//               </Card.Text>
//             );
//           })}
//           {/* <Card.Text className="text-left">
//             <span
//               style={{
//                 backgroundColor: "yellow",
//                 display: "inline-block",
//                 padding: "10px",
//                 borderRadius: "10px",
//               }}
//             >
//               message 1
//             </span>
//           </Card.Text>
//           <Card.Text className="text-right">
//             <span
//               style={{
//                 backgroundColor: "yellow",
//                 display: "inline-block",
//                 padding: "10px",
//                 borderRadius: "10px",
//               }}
//             >
//               message 2
//             </span>
//           </Card.Text>
//           <Card.Text className="text-right">
//             <span
//               style={{
//                 backgroundColor: "yellow",
//                 display: "inline-block",
//                 padding: "10px",
//                 borderRadius: "10px",
//               }}
//             >
//               message 3
//             </span>
//           </Card.Text> */}
//           {/* <Button variant="primary">Go somewhere</Button> */}
//         </Card.Body>

//         {/* <Card.Footer className="text-muted">2 days ago</Card.Footer> */}
//         <InputGroup className="mb-3">
//           <Form.Control
//             placeholder="채팅을 입력하세요."
//             value={message}
//             onChange={(e) => {
//               setMessage(e.target.value);
//             }}
//             onKeyDown={handleInputKeyDown}
//           />
//           <Button
//             variant="outline-secondary"
//             id="button-addon2"
//             className="bg-primary text-dark"
//             onClick={handleSendMessage}
//           >
//             전송
//           </Button>
//         </InputGroup>
//       </Card>
//     </Container>
//   );
// };
export const ChatForm = () => {
  const { socket } = useContext(SocketContext);
  const { roomId } = useParams();
  const { profile } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  useEffect(() => {
    socket.current.emit(CHAT_EVENT.JOIN_ROOM, {
      roomId: roomId,
    });
    return () => {
      socket.current.emit(CHAT_EVENT.LEAVE_ROOM, {
        roomId: roomId,
      });
    };
  }, [roomId]);
  const handleSendMessage = () => {
    if (text.trim() !== "") {
      (async () => {
        await addChatMessage(roomId, text)
          .then(addChatMessageService)
          .then((data) => socket.current.emit(CHAT_EVENT.SEND_MESSAGE, data))
          .catch((err) => console.log(err));
      })();
      setText("");
    }
  };

  const handleInputKeyDown = (e) => {
    // console.log(e.nativeEvent.isComposing);
    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
      // if (e.nativeEvent.isComposing) setMessage((prev) => prev + " ");
      e.preventDefault();
      handleSendMessage();
    }
  };
  function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);
    const year = String(date.getFullYear()).padStart(4, "0"); // 년도를 네 자리 숫자로
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 월을 두 자리 숫자로
    const day = String(date.getDate()).padStart(2, "0"); // 일을 두 자리 숫자로
    const hours = String(date.getHours()).padStart(2, "0"); // 시를 두 자리 숫자로
    const minutes = String(date.getMinutes()).padStart(2, "0"); // 분을 두 자리 숫자로
    const seconds = String(date.getSeconds()).padStart(2, "0"); // 초를 두 자리 숫자로

    return `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`;
  }
  useEffect(() => {
    alert("ChatForm useEffect");
    (async () => {
      await getChatMessageListByRoomId(roomId)
        .then(getChatMessageListByRoomIdService)
        .then((res) => setMessages(res))
        .catch((err) => console.log(err));
      socket.current.on(CHAT_EVENT.RECEIVED_MESSAGE, (msg) => {
        console.log(msg);
        setMessages((prev) => [...prev, msg]);
      });
    })();
  }, [roomId]);

  return (
    <Container>
      {profile.nickname}
      <Card className="text-center">
        <Card.Header>1:1 채팅</Card.Header>
        <Card.Body style={{ overflowY: "scroll", maxHeight: "500px" }}>
          {/* <Card.Title>Special title treatment</Card.Title> */}
          {messages.map((message, idx) => {
            return (
              <Card.Text
                key={idx}
                className={
                  message.nickname === profile.nickname
                    ? "text-left"
                    : "text-right"
                }
              >
                <span>{message.nickname}</span>
                <br />
                <span
                  style={{
                    backgroundColor: "yellow",
                    display: "inline-block",
                    padding: "10px",
                    borderRadius: "10px",
                  }}
                >
                  {message.content}
                  <br />
                  <span style={{ color: "gray", fontSize: "11px" }}>
                    - {formatDateTime(message.regDate)}
                  </span>
                </span>
              </Card.Text>
            );
          })}
          {/* <Card.Text className="text-left">
            <span
              style={{
                backgroundColor: "yellow",
                display: "inline-block",
                padding: "10px",
                borderRadius: "10px",
              }}
            >
              message 1
            </span>
          </Card.Text>
          <Card.Text className="text-right">
            <span
              style={{
                backgroundColor: "yellow",
                display: "inline-block",
                padding: "10px",
                borderRadius: "10px",
              }}
            >
              message 2
            </span>
          </Card.Text>
          <Card.Text className="text-right">
            <span
              style={{
                backgroundColor: "yellow",
                display: "inline-block",
                padding: "10px",
                borderRadius: "10px",
              }}
            >
              message 3
            </span>
          </Card.Text> */}
          {/* <Button variant="primary">Go somewhere</Button> */}
        </Card.Body>

        {/* <Card.Footer className="text-muted">2 days ago</Card.Footer> */}
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="채팅을 입력하세요."
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            onKeyDown={handleInputKeyDown}
          />
          <Button
            variant="outline-secondary"
            id="button-addon2"
            className="bg-primary text-dark"
            onClick={handleSendMessage}
          >
            전송
          </Button>
        </InputGroup>
      </Card>
    </Container>
  );
};
