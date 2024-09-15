import React from 'react';
import '../../css/NotFound.css';
import TruckLoader from '../components/TruckLoader';
import Switch from '../components/Switch';
import { useTheme } from '../utility/changeTheme'; // 引入自定义 Hook
import hashWarp from '../utility/hashWarp';
import classifyLink from '../utility/classfyLink'; // 引入 classifyLink 函数

function NotFound({ message, link = null }) {
    const [isDarkTheme, toggleTheme] = useTheme(); // 使用自定义 Hook

    // 默认 message 处理
    if (!message) {
        message = 'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.';
    }

    return (
        <div className={`notfound-container ${isDarkTheme ? 'dark' : 'light'}`}>
            <Switch toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
            <div className="notfound-content">
                <h1 className="notfound-title">404</h1>
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
