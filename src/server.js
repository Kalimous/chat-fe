import { io } from "socket.io-client";
const BACKEND_API = "https://port-0-chat-be-1272llwqg7kzu.sel5.cloudtype.app";
const socket = io(`${BACKEND_API}`);

export default socket;
