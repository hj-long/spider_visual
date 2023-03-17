export default function getTime() {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    let second = date.getSeconds()
    if(second < 10) {
        second = '0' + second
    }
    let time = `${year}年${month}月${day}日 ${hour}:${minute}:${second}`
    return time
}