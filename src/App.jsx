import React, { createContext, useEffect, useRef, useState } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Header from "./component/Header";
import { Router } from "./component/Router";
import { checkToken } from "./apis/api/member";
import { AdminApp } from "./pages/admin/AdminApp";
import { memberFromTokenService } from "./apis/services/member";
import { io } from "socket.io-client";
import { CHAT_EVENT } from "./apis/utils/socket";
import { getChatRoomListByMember } from "./apis/api/chat";
import { getChatRoomListByMemberService } from "./apis/services/chat";
import { Loading } from "./component/Loading";
// import { Redis } from "ioredis";

export const AuthContext = createContext();
export const SocketContext = createContext();
const _socket = io("http://127.0.0.1:3001");
function App() {
  const socket = useRef();
  const redis = useRef();
  socket.current = _socket;
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState({});
  useEffect(() => {
    if (Object.keys(profile).length !== 0) {
      socket.current.emit(CHAT_EVENT.SEND_PROFILE, profile);
    }
  }, [profile]);
  useEffect(() => {
    if (isLogin) {
      (async () => {
        await getChatRoomListByMember()
          // .then(
          //   (data) =>
          //     data.length !== 0 &&
          //     data.map((room) =>
          //       socket.current.emit(CHAT_EVENT.JOIN_ROOM, {
          //         roomId: room.roomId,
          //       })
          //     )
          // )
          .catch((err) => console.log(err));
      })();
    }
  }, [isLogin]);
  useEffect(() => {
    (async () => {
      await checkToken()
        .then(memberFromTokenService)
        .then((res) => {
          if (res) {
            setIsLogin(true);
            setProfile(res);
            setIsLoading(false);
          } else {
            setProfile({});
            setIsLoading(false);
            socket.current.off();
          }
        })
        .catch((err) => {
          setIsLoading(false);
        });
    })();
    return () => {
      socket.current.off();
    };
  }, [isLogin]);
  return (
    <BrowserRouter>
      <SocketContext.Provider value={{ socket }}>
        <AuthContext.Provider
          value={{ isLogin, setIsLogin, profile, setProfile }}
        >
          {isLoading ? (
            <Loading />
          ) : (
            <div className="App">
              <>
                <Header />
                <Router />
              </>
              {/* {profile.role === "ADMIN" ? (
                <AdminApp />
              ) : (
                <>
                  <Header />
                  <Router />
                </>
              )} */}
            </div>
          )}
        </AuthContext.Provider>
      </SocketContext.Provider>
    </BrowserRouter>
  );
}

export default App;
