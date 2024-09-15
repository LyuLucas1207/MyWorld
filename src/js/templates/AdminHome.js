
import React, { useState, useEffect } from 'react';
import NotFound from './NotFound';
import getDatas from '../utility/getDatas'; // 引入工具函数
import TentLoader from '../components/TentLoader';

function Admin() {
    const [projects, setProjects] = useState(null); // 项目数据
    const [loading, setLoading] = useState(true);   // 加载状态
    const [error, setError] = useState(null);       // 错误状态

    useEffect(() => {
        const fetchData = async () => {
            const result = await getDatas(); // 调用工具函数获取数据
            if (result.error) {
                setError(result.error);
            } else {
                setProjects(result.data);
            }

            setLoading(false); // 请求结束后关闭加载状态
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <TentLoader />
        );  
    }

    if (error) {
        return <NotFound message={error} />;
    }

    return (
        <div>
            <h1>项目列表</h1>
            {projects ? (
                <ul>
                    {Object.keys(projects).map((key) => (
                        <li key={key}>
                            <h2>{projects[key].name}</h2>
                            <p>{projects[key].description}</p>
                            <p>状态: {projects[key].status}</p>
                            <a href={projects[key].url} target="_blank" rel="noopener noreferrer">
                                查看详情
                            </a>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>没有项目数据。</p>
            )}
        </div>
    );
}

export default Admin;







// import React, { useState, useEffect } from 'react';
// import NotFound from './NotFound';
// import axios from 'axios'; // 引入 axios

// function Admin() {
//     const [projects, setProjects] = useState(null); // 项目数据
//     const [loading, setLoading] = useState(true);   // 加载状态
//     const [error, setError] = useState(null);       // 错误状态

// useEffect(() => {
//     const fetchData = async () => {
//         try {
//             const response = await axios.post('http://192.168.1.68:9999', {
//                 action: 'getProjects' // 发送的数据
//             }, { timeout: 5000 }); // 设置超时时间为 5 秒

//             console.log('返回的数据:', response.data);
//             setProjects(response.data.ProJs); // 设置返回的项目数据
//         } catch (error) {
//             // 检查 error 对象是否具有 response，判断是网络错误还是服务器错误
//             if (error.response) {
//                 // 服务器响应错误（例如 4xx 或 5xx）
//                 setError(`服务器响应错误: ${error.response.status} - ${error.response.statusText}`);
//             } else if (error.request) {
//                 setError(`无法连接到服务器，请检查您的网络连接或稍后重试: ${error.message}`);
        
//             }  else {
//                 // 处理客户端错误
//                 setError(`请求出错: ${error.message}`);
//             }
//             console.error('请求失败:', error);
//         } finally {
//             setLoading(false); // 请求结束后关闭加载状态
//         }
//     };

//     fetchData();
// }, []);


//     if (loading) {
//         return <p>加载中...</p>;
//     }

//     if (error) {
//         return (
//             <NotFound message={error} />
//         )
//     }

//     return (
//         <div>
//             <h1>项目列表</h1>
//             {projects ? (
//                 <ul>
//                     {Object.keys(projects).map((key) => (
//                         <li key={key}>
//                             <h2>{projects[key].name}</h2>
//                             <p>{projects[key].description}</p>
//                             <p>状态: {projects[key].status}</p>
//                             <a href={projects[key].url} target="_blank" rel="noopener noreferrer">
//                                 查看详情
//                             </a>
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 <p>没有项目数据。</p>
//             )}
//         </div>
//     );
// }

// export default Admin;



// import React, { useState, useEffect } from 'react';

// function Admin() {
//     const [projects, setProjects] = useState(null); // 项目数据
//     const [loading, setLoading] = useState(true);   // 加载状态
//     const [error, setError] = useState(null);       // 错误状态

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch('http://192.168.1.68:9999', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({
//                         action: 'getProjects', // 模拟的发送数据
//                     }),
//                 });

//                 if (response.ok) {
//                     const data = await response.json();
//                     console.log('返回的数据:', data);
//                     setProjects(data.ProJs); // 设置返回的项目数据
//                 } else {
//                     setError(`请求失败: ${response.statusText}`);
//                 }
//             } catch (error) {
//                 setError(`请求出错: ${error.message}`);
//             } finally {
//                 setLoading(false); // 请求结束，关闭加载状态
//             }
//         };

//         fetchData();
//     }, []);

//     if (loading) {
//         return <p>加载中...</p>;
//     }

//     if (error) {
//         return <p>{error}</p>; // 显示错误信息
//     }

//     return (
//         <div>
//             <h1>项目列表</h1>
//             {projects ? (
//                 <ul>
//                     {Object.keys(projects).map((key) => (
//                         <li key={key}>
//                             <h2>{projects[key].name}</h2>
//                             <p>{projects[key].description}</p>
//                             <p>状态: {projects[key].status}</p>
//                             <a href={projects[key].url} target="_blank" rel="noopener noreferrer">
//                                 查看详情
//                             </a>
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 <p>没有项目数据。</p>
//             )}
//         </div>
//     );
// }

// export default Admin;

