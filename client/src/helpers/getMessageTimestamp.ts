export default function getMessageTimestamp(rawDate: string): string {
  try {
    const today = new Date(Date.now());
    const fullDate = new Date(rawDate);

    const [month, day, year, time] = fullDate
      .toLocaleString('en', {
        dateStyle: 'medium',
        timeStyle: 'short',
        hour12: false,
      })
      .replaceAll(',', '')
      .split(' ');

    const date = `${day} ${month} ${year}`;

    if (today.getDate() > fullDate.getDate()) {
      if (today.getDate() - fullDate.getDate() === 1) {
        return `Yesterday at ${time}`;
      }
      return `${date} at ${time}`;
    }

    return time;
  } catch (error) {
    console.error('Error transforming date:', error);

    throw new Error('Error transforming date:');
  }
}
