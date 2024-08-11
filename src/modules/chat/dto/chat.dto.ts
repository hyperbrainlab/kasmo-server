export interface Message {
  roomId: number;
  text: string;
  timestamp: number;
  senderId: number;
  readBy: {
    [userId: string]: boolean; // 각 사용자가 메시지를 읽었는지 여부를 나타냄
  };
}
