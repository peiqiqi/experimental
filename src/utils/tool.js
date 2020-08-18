//时间格式化
export const formatTime = (time, type = "ymdhms") => {
  const _formatFn = unit => (unit < 10 ? "0" + unit : "" + unit);
  if (time.toString().includes("-")) {
    time = time.replace(/-/g, "/");
  }
  let t = new Date(time);
  const y = t.getFullYear();
  let month = t.getMonth() + 1;
  month = _formatFn(month);
  let d = t.getDate();
  d = _formatFn(d);
  let h = t.getHours();
  h = _formatFn(h);
  let min = t.getMinutes();
  min = _formatFn(min);
  let s = t.getSeconds();
  s = _formatFn(s);
  let day = t.getDay();
  // console.log('tool time %c'+t+","+y+','+month+','+d+','+h+','+min+','+s,'color:#ff0000')
  const op = {
    timeStamp: t.getTime(),
    ymdhms: `${y}-${month}-${d} ${h}:${min}:${s}`,
    ymdhm: `${y}-${month}-${d} ${h}:${min}`,
    ymdh: `${y}-${month}-${d} ${h}`,
    ymd: `${y}-${month}-${d}`,
    _mdhm: `${month}:${d}:${h}:${min}`,
    hmin: `${h}:${min}`,
    ymd_zn: `${y}年${month}月${d}日`,
    ym_zn: `${y}年${month}月`,
    ymdhms_ios: `${y}/${month}/${d} ${h}:${min}:${s}`,
    ymdhm_ios: `${y}/${month}/${d} ${h}:${min}`,
    ymdh_ios: `${y}/${month}/${d} ${h}`,
    ymd_ios: `${y}/${month}/${d}`,
    timeObj: {
      timeStamp: t,
      year: y,
      month,
      date: d,
      hour: h,
      min,
      day
    }
  };
  try {
    return op[type];
  } catch (err) {
    throw new Error("时间格式化类型不对");
  }
};
