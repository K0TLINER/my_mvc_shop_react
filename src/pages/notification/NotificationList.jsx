import { useContext, useEffect, useState } from "react";
import { AuthContext, SocketContext } from "../../App";
import { CHAT_EVENT } from "../../apis/utils/socket";
import { Container, Toast } from "react-bootstrap";
import { Loading } from "../../component/Loading";
import { Link } from "react-router-dom";

export const NotificationList = () => {
  const { socket } = useContext(SocketContext);
  const { profile } = useContext(AuthContext);
  const [alerts, setAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    socket.current.on(CHAT_EVENT.SEND_ALERT, (data) => {
      setAlerts(data);
      setIsLoading(false);
    });
    socket.current.emit(CHAT_EVENT.READ_ALERT, {
      nickname: profile.nickname,
    });
  }, []);
  return (
    <Container>
      <h3>알림 보드</h3>
      <br />
      {isLoading ? (
        <Loading />
      ) : (
        alerts.map((alert, idx) => <AlertThumbnail alert={alert} key={idx} />)
      )}
    </Container>
  );
};

const AlertThumbnail = ({ alert }) => {
  console.log(alert);
  return (
    <Toast>
      <Toast.Header closeButton={false}>
        {/* <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" /> */}
        <strong className="mr-auto">{alert.sender}님의 메세지 알림</strong>
        <small>{alert.regDate}</small>
      </Toast.Header>

      <Toast.Body>
        <Link to={`/chat/${alert.roomId}`}>{alert.message}</Link>
      </Toast.Body>
    </Toast>
  );
};
