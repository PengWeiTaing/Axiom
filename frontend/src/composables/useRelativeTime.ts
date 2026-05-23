/*
 * 相对时间显示
 *   - 1 分钟内：刚刚
 *   - 1 小时内：N 分钟前
 *   - 今天：HH:MM
 *   - 昨天：昨天 HH:MM
 *   - 一周内：周X HH:MM
 *   - 其余：MM/DD
 *   - 跨年：YYYY/MM/DD
 */

export function formatRelative(iso: string, now = new Date()): string {
  const t = new Date(iso);
  if (Number.isNaN(t.getTime())) return '';
  const diff = (now.getTime() - t.getTime()) / 1000;

  if (diff < 60) return '刚刚';
  if (diff < 3600) return Math.floor(diff / 60) + ' 分钟前';

  const sameDay = sameYMD(t, now);
  if (sameDay) return hhmm(t);

  const y = new Date(now);
  y.setDate(now.getDate() - 1);
  if (sameYMD(t, y)) return '昨天 ' + hhmm(t);

  if (diff < 7 * 86400) {
    const weekday = ['日', '一', '二', '三', '四', '五', '六'][t.getDay()];
    return `周${weekday} ${hhmm(t)}`;
  }

  if (t.getFullYear() === now.getFullYear()) {
    return `${pad(t.getMonth() + 1)}/${pad(t.getDate())}`;
  }
  return `${t.getFullYear()}/${pad(t.getMonth() + 1)}/${pad(t.getDate())}`;
}

function sameYMD(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function hhmm(t: Date): string {
  return pad(t.getHours()) + ':' + pad(t.getMinutes());
}

function pad(n: number): string {
  return n < 10 ? '0' + n : String(n);
}
