import axios from 'axios';

// 定义一个通用的函数，用于发送 POST 请求获取项目数据
const getDatas = async () => {
    try {
        const response = await axios.post('http://192.168.1.68:9999', {
            action: 'getProjects' // 发送的数据
        }, { timeout: 5000 }); // 设置超时时间为 5 秒

        console.log('返回的数据:', response.data);
        return { data: response.data.ProJs, error: null };
    } catch (error) {
        if (error.response) {
            // 服务器响应错误（例如 4xx 或 5xx）
            return { data: null, error: `服务器响应错误: ${error.response.status} - ${error.response.statusText}` };
        } else if (error.request) {
            return { data: null, error: `无法连接到服务器，请检查您的网络连接或稍后重试: ${error.message}` };
        } else {
            // 处理客户端错误
            return { data: null, error: `请求出错: ${error.message}` };
        }
    }
};

export default getDatas;