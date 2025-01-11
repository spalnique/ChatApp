import type { Message } from '@types';

export default function getAuthor(message: Message): string | undefined {
  if (!message) return;

  return `${message.author.displayName.split(' ')[0] ?? message.author.username}: ${message.content}`;
}
