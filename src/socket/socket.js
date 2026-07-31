import { io } from "socket.io-client";

const socket = io("https://codesync-gmcm.onrender.com");

export default socket;