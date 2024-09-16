import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

function classifyLink(link) {
    switch (link) {
        case '/login':
            return <RouterLink to={link} className="notfound-link">Go to Login</RouterLink>;
        case '/admin.html':
            return <a href="admin.html" className="notfound-link">Go to Admin Page</a>;
        default:
            // 默认返回首页链接
            return <RouterLink to="/" className="notfound-link">Go Back to Home</RouterLink>;
    }
}

export default classifyLink;