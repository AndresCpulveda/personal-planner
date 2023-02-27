export function timeFormatter(timer) {
  let minutes = `0${Math.floor(timer / 60)}`;
  let seconds = `0${timer % 60}`.slice(-2);
  return `${minutes}.${seconds}`;
}
