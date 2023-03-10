export function timeFormatter(timer) {
  let minutes = `0${Math.floor(timer / 60)}`;
  let seconds = `0${timer % 60}`.slice(-2);
  return `${minutes}:${seconds}`;
}

export function timeDeFormatter(timer) {
  const seconds = Number(timer.split(':')[1])
  const minutes = Number(timer.split(':')[0])
  return minutes * 60 + seconds
}