export type Message = {
  _id: string;
  author: { displayName: string; username: string };
  content: string;
  createdAt: string;
  updatedAt: string;
};
