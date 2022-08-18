function toDate(unixTimestamp) {
  return new Date(unixTimestamp * 1000);
}
const a = toDate(1660802311) + '';
console.log(typeof a);
export default toDate;
