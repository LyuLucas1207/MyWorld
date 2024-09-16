// 引入组件
import React, { useEffect } from 'react';
import TruckLoader from '../components/TruckLoader';
import Switch from '../components/Switch';

// 引入样式文件
import '../../css/NotFound.css';
import '../../css/EarthStar.css';

// 引入自定义 Hook 和工具函数
import { useTheme } from '../utility/changeTheme';
import hashWarp from '../utility/hashWarp';
import classifyLink from '../utility/classfyLink';
import { Star, generateStar } from '../utility/generateStar';


function NotFound({ message, link = null, status = 404 }) {
    const [isDarkTheme, toggleTheme] = useTheme(); // 使用自定义 Hook

    // 默认 message 处理
    if (!message) {
        message = 'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.';
    }

    useEffect(() => {
        const starInstance = new Star('.star', 30, 100); // 创建 Star 实例
        generateStar(starInstance); // 调用 generateStar 生成星星效果
    }, []); // 仅在组件挂载时执行一次

    return (
        <div className={`notfound-container ${isDarkTheme ? 'dark' : 'light'}`}>
            <div className="star"></div>
            <Switch toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
            <div className="notfound-content">
                <h1 className="notfound-title">{status}</h1>
                <p className="notfound-subtitle">Oops! Page Not Found</p>
                <p className="notfound-message">
                    {message}
                </p>
                <div className='truckcar'>
                    <TruckLoader />
                </div>
                <div className="link">
                    {classifyLink(link)} {/* 调用 classifyLink 函数 */}
                </div>
            </div>
        </div>
    );
}

export default hashWarp(NotFound);









// import React from 'react';
// import '../../css/NotFound.css';
// import TruckLoader from '../components/TruckLoader';
// import Switch from '../components/Switch';
// import { Link as RouterLink } from 'react-router-dom';
// import { useTheme } from '../utility/changeTheme'; // 引入自定义 Hook
// import hashWarp from '../utility/hashWarp';

// function NotFound({ message , link = null }) {
//     const [isDarkTheme, toggleTheme] = useTheme(); // 使用自定义 Hook

//     if (!message) {
//         message = 'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.';
//     }

//     return (
//         <div className={`notfound-container ${isDarkTheme ? 'dark' : 'light'}`}>
//             <Switch toggleTheme={toggleTheme} />
//             <div className="notfound-content">
//                 <h1 className="notfound-title">404</h1>
//                 <p className="notfound-subtitle">Oops! Page Not Found</p>
//                 <p className="notfound-message">
//                     {message}
//                 </p>
//                 <div className='truckcar'>
//                     <TruckLoader />
//                 </div>
//                 <div className="link">
//                     {link ? (
//                         <RouterLink to={link} className="notfound-link">Go to {link}</RouterLink>
//                     ) : (
//                         <RouterLink to="/" className="notfound-link">Go Back to Home</RouterLink>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default hashWarp(NotFound);
