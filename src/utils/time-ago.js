const MinuteInSeconds = 60;
const HourInSeconds = MinuteInSeconds * 60;
const DayInSeconds = HourInSeconds * 24;
const MonthInSeconds = DayInSeconds * 30;
const YearInSeconds = DayInSeconds * 365;

function timeAgoOutput(interval, str) {
  const output = `${interval} ${str}`;

  if (interval < 1) {
    throw new Error(
      `timeAgoOutput: given interval of ${interval} which is below 1`
    );
  }

  if (interval === 1) {
    return output;
  }

  return `${output}s`;
}

/**
 * Time ago function.
 * Source: http://stackoverflow.com/a/3177838/1484318
 * @param {number} date UTC Time in seconds.
 * @return {string} Time ago string.
 */
export function timeAgo(date) {
  const timeAgoDate = new Date(date * 1000);
  const seconds = Math.floor((new Date() - timeAgoDate) / 1000);

  let interval = Math.floor(seconds / YearInSeconds);

  if (interval >= 1) {
    return timeAgoOutput(interval, 'year');
  }

  interval = Math.floor(seconds / MonthInSeconds);
  if (interval >= 1) {
    return timeAgoOutput(interval, 'month');
  }

  interval = Math.floor(seconds / DayInSeconds);
  if (interval >= 1) {
    return timeAgoOutput(interval, 'day');
  }

  interval = Math.floor(seconds / HourInSeconds);
  if (interval >= 1) {
    return timeAgoOutput(interval, 'hour');
  }

  interval = Math.floor(seconds / MinuteInSeconds);
  if (interval >= 1) {
    return timeAgoOutput(interval, 'minute');
  }

  return `${Math.floor(seconds)} seconds`;
}
