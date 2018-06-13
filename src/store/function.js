/**
 * Created by 凌翔 on 2018/6/11.
 */
// 引入 axios
import axios from 'axios';
axios.defaults.baseURL = 'http://api.sami.han-zi.cn';
axios.defaults.headers.post['content-Type'] = 'appliction/x-www-form-urlencoded';

const getJSON = function(url) {
    const promise = new Promise(function(resolve, reject){
        axios.get(url).then(function (response) {
            resolve(response.data)
        })
        .catch(function (err) {
            reject(err)
        })
    });

    return promise;
};

const localEvent = function (item) {
    this.get = function () {
        return localStorage.getItem(item) ? JSON.parse(localStorage.getItem(item)) : '';
    }
    this.set = function (obj) {
        localStorage.setItem(item, JSON.stringify(obj));
    }
    this.clear = function () {
        localStorage.removeItem(item);
    }
}

const serverEvent = function (item) {
    this.get = function () {
        return getJSON('/api/notepad');
    }
    this.set = function (obj) {
        axios.post('/api/notepad',{
            lx_notepad:JSON.stringify(obj)
        });
    }
    this.clear = function () {
        axios.delete('/api/delnotepad');
    }
}

//export const local = new localEvent('lx_notepad');
export const server = new serverEvent('lx_notepad');
export const theme_local = new localEvent('lx_theme');
export const getDate = () => { //获取当天日期
    const date = new Date(),
        mouth = parseInt(date.getMonth()) + 1;
    return date.getFullYear() + '-' + mouth + '-' + date.getDate();
}