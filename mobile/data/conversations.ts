export type MessageType = {
	id: number;
	text: string;
	fromUser: boolean;
	timestamp: Date;
	time: string;
};

export type ConversationType = {
	id: number;
	user: {
			name: string;
			username: string;
			avatar: string;
			verified: boolean;
	};
	lastMessage: string;
	time: string;
	timestamp: Date;
	messages: MessageType[];
};

export const CONVERSATIONS: ConversationType[] = Array.from({ length: 20 }, (_, i) => {
  const id = i + 1;
  const name = `User ${id}`;
  const username = `user${id}`;
  const avatar = `https://testingbot.com/free-online-tools/random-avatar/200?img=${id+1}`;
  const verified = id % 5 === 0;
  const lastMessage = `This is a sample last message from ${name}`;
  const timestamp = new Date(Date.now() - id * 1000 * 60 * 5);
  const time = timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const messages = [
    {
      id: 1,
      text: `Hey, this is ${name}!`,
      fromUser: false,
      timestamp,
      time,
    },
    {
      id: 2,
      text: `Hello ${name}, nice to chat with you.`,
      fromUser: true,
      timestamp: new Date(timestamp.getTime() + 2 * 60000),
      time: new Date(timestamp.getTime() + 2 * 60000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
    {
      id: 3,
      text: "See you later!",
      fromUser: false,
      timestamp: new Date(timestamp.getTime() + 5 * 60000),
      time: new Date(timestamp.getTime() + 5 * 60000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ];

  return {
    id,
    user: { name, username, avatar, verified },
    lastMessage,
    time,
    timestamp,
    messages,
  };
});
