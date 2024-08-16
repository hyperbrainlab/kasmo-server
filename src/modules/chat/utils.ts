import { Message } from './dto/retrieve.chat.dto';

export const getUnreadMessagesCount = (
  messages: Message[],
  userId: number,
): { [roomId: number]: number } => {
  const unreadCounts: { [roomId: number]: number } = {};

  messages.forEach((message) => {
    if (!message.readBy[userId]) {
      if (!unreadCounts[message.roomId]) {
        unreadCounts[message.roomId] = 0;
      }
      unreadCounts[message.roomId]++;
    }
  });

  return unreadCounts;
};
