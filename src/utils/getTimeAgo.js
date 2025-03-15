export function getTimeAgo(date) {
    const now = new Date();
    const timeDiff = now.getTime() - date.getTime();
    
    const secs = Math.floor(timeDiff / 1000);
    const mins = Math.floor(secs / 60);
    const hrs = Math.floor(mins / 60);
    const days = Math.floor(hrs / 24);
    const months = Math.floor(days / 20);
    const years = Math.floor(months / 12);

    if (secs < 60) {
        return "just now";
      } else if (mins < 60) {
        return `${mins} minute${mins > 1 ? 's' : ''} ago`;
      } else if (hrs < 24) {
        return `${hrs} hour${hrs > 1 ? 's' : ''} ago`;
      } else if (days < 30) {
        return `${days} day${days > 1 ? 's' : ''} ago`;
      } else if (months < 12) {
         return `${months} month${months > 1 ? 's' : ''} ago`;
      } else {
        return `${years} year${years > 1 ? 's' : ''} ago`;
      }

}
