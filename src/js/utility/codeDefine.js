function codeDefine(status = 999, code = 999, data = null) {
    switch (status) {
        case 200:
            return status_200(code, data);
        case 500:
            return status_500(code, data);
        case 400:
            return status_400(code, data);
        case 401:
            return status_401(code, data);
        case 403:
            return status_403(code, data);
        default:
            return status_default();
    }
}

function status_200(code, data) {
    switch (code) {
        case 0:
            alert("登录成功！" + data.msg);
            localStorage.setItem('token', data.data.token);
            window.location.href = '/admin_home.html';
            break;
        case 1:
            alert("信息请求成功！" + data.msg);
            break;
        case 2:
            alert("密码错误，请重试！" + data.msg);
            break;
        case 3:
            alert("邮箱不存在，请检查输入！" + data.msg);
            break;
        case 4:
            alert("你在瞎搞什么？" + data.msg);
            break;
        case 5:
            console.log("身份验证成功！" + data.msg);
            break;
        default:
            alert("未知错误，请重试！" + data.msg);
            break;
    }
    return { status: 200, code: code, data: data.data, msg: data.msg };
}

function status_500(code, data) {
    switch (code) {
        case 1:
            alert("服务器错误，请稍后重试！" + data.msg);
            break;
        case 2:
            alert("无法读取用户数据，服务器文件可能损坏或者格式失败！" + data.msg);
            break;
        default:
            alert("未知错误，请重试！" + data.msg);
            break;
    }
    return { status: 500 ,code: code, data: data.data, msg: data.msg };
}

function status_400(code, data) {
    switch (code) {
        case 1:
            alert("请求错误，请检查参数！" + data.msg);
            break;
        default:
            alert("未知错误，请重试！" + data.msg);
            break;
    }
    return { status: 400, code: code, data: data.data, msg: data.msg };
}

function status_401(code, data) {
    switch (code) {
        case 1:
            alert("未登录，请先登录！" + data.msg);
            break;
        default:
            alert("未知错误，请重试！" + data.msg);
            break;
    }
    return { status: 401, code: code, data: data.data, msg: data.msg };
}

function status_403(code, data) {
    switch (code) {
        case 1:
            alert("无权访问，请联系管理员！" + (data && data.msg ? data.msg : ''));
            break;
        default:
            alert("未知错误，请重试！" + (data && data.msg ? data.msg : ''));
            break;
    }
    return { status: 403, code: code, data: data.data, msg: data.msg };
}


function status_default() {
    alert("未知错误，请重试！");
    return { status: 999, code: 999, data: null, msg: '未知错误，请重试！' };
}

export default codeDefine;