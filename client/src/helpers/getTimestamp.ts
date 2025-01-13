const transformMonth = (value: Date): string => {
  switch (value.getMonth()) {
    case 1:
      return 'January';
    case 2:
      return 'February';
    case 3:
      return 'March';
    case 4:
      return 'April';
    case 5:
      return 'May';
    case 6:
      return 'June';
    case 7:
      return 'July';
    case 8:
      return 'August';
    case 9:
      return 'September';
    case 10:
      return 'October';
    case 11:
      return 'November';
    default:
      return 'December';
  }
};

export default function getMessageTimestamp(rawDate: string): string {
  try {
    const today = new Date(Date.now());
    const fullDate = new Date(rawDate);
    const day = fullDate.getDate();
    const month = transformMonth(fullDate);
    const year = fullDate.getFullYear();
    const hours = fullDate.getHours();
    const minutes = fullDate.getMinutes();

    const date = `${day} ${month} ${year}`;
    const time = `${hours}:${minutes > 9 ? minutes : `0${minutes}`}`;

    if (today.toLocaleDateString('fr') > fullDate.toLocaleDateString('fr')) {
      if (today.getDate() - day === 1) {
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
