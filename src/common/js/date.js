/**
 * Created by buzha on 2017/7/25.
 */
export function formatDate (timeStamp) {
  return new Date(parseInt(timeStamp) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ')
}

