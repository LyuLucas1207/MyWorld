import axios from 'axios'; // 引入 axios
import codeDefine from './codeDefine';

async function checkIdentity() {
    const token = localStorage.getItem('token');
    if (!token) {
        return codeDefine(401, 1, { msg: '未登录，请先登录！' });
    }
    try {
        const response = await axios.post('http://192.168.1.68:9999', {
            action: 'checkIdentity' // 发送的数据
        }, {
            headers: {
                'Authorization': `Bearer ${token}`, // 设置请求头
                'Content-Type': 'application/json'
            },
            timeout: 5000
        }); // 设置超时时间为 5 秒
        return codeDefine(response.status, response.data.code, response.data);
    } catch (error) {
        if (error.response) {
            return codeDefine(error.response.status, error.response.data.code, error.response.data);
        }
        return codeDefine(500, 1, { msg: error.message });
    }
};

// 定义一个通用的函数，用于发送 POST 请求获取项目数据
async function getDatas(action) {
    const token = localStorage.getItem('token');
    if (!token) {
        return { status : 401, code: 1, data: null, msg: '未登录，请先登录！' };
    }

    try {
        const response = await axios.post('http://192.168.1.68:9999', {
            action: action // 发送的数据 'getProjects'
        }, {
            headers: {
                'Authorization': `Bearer ${token}`, // 设置请求头
                'Content-Type': 'application/json'
            },
            timeout: 5000
        }); // 设置超时时间为 5 秒
        return codeDefine(response.status, response.data.code, response.data);
    } catch (error) {
        if (error.response) {
            return codeDefine(error.response.status, error.response.data.code, error.response.data);
        }
    }
};

async function sendLoginRequest(email, password) {
    try {
        const response = await axios.post('http://192.168.1.68:9999', {
            action: 'login', // 定义 action 为 login
            email,
            password,
        });

        if (response.status === 200) {
            codeDefine(response.status, response.data.code, response.data);
        }


    } catch (error) {
        // 这里处理网络请求失败或其他错误
        if (error.response) {
            codeDefine(error.response.status, error.response.data.code, error.response.data);
        }
    }
}


export { checkIdentity, getDatas, sendLoginRequest };



/*  //!         200 OK    response
{
    "status": 401,          // HTTP 状态码
    "statusText": "Unauthorized", // HTTP 状态描述
    "headers": {            // 响应头
        "content-type": "application/json"
    },
    "data": {               // 实际的错误响应内容（服务器返回的内容）
        "code": 1,
        "msg": "some message"
        "data": {
            "token": "wdksdkn...sdf"
        }
        or===========
        "data": null
        or===========
        "data": {
            "ProJ1": {
                "name": "Project 1",
                "desc": "This is project 1"
            },
            "ProJ2": {
                "name": "Project 2",
                "desc": "This is project 2"
            }
        }
    }
}
*/

/*  //!         Not 200 OK    error.response
{
    "status": 500,
    "statusText": "Internal Server Error",
    "data": {
        "code": 1,
        "msg": "some message"
        "data": null
    }
}



*/