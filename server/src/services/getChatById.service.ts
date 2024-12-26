import { Chat } from '../db/models/chat.model';

export const getChatById = (id: string) => Chat.findById(id);
