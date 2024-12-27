import { Chat } from '../../db/model/chat.model';

export const getChatById = (id: string) => Chat.findById(id);
