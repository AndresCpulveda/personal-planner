export function timeFormatter(timer) {
  let hours = `${Math.floor(timer / 3600)}`
  let minutes = `${Math.floor(timer / 60)}`;
  let seconds = `0${timer % 60}`.slice(-2);
  if(timer < 599) {
    return `0${hours}:0${minutes}:${seconds}`;
  }
  return `0${hours}:${minutes}:${seconds}`
}

export function timeDeFormatter(timer) {
  const seconds = Number(timer.split(':')[2])
  const minutes = Number(timer.split(':')[1])
  const hours = Number(timer.split(':')[0])
  return hours * 3600 + minutes * 60 + seconds
}