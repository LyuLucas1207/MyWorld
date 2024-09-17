import { useEffect } from 'react';

function validateUrl(Component) {
    const HashWrapper = (props) => {
        useEffect(() => {
            if (!window.location.hash) {
                window.location.hash = "/#/";
            }
        }, []);

        // 渲染传递进来的组件，并传递所有 props
        return <Component {...props} />;
    }

    return HashWrapper;
}


function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email); // 返回 true 表示合法邮箱
}

function validatePassword(password) {
    // 密码至少 6 个字符，且不含空格
    const passwordRegex = /^\S{6,}$/;
    return passwordRegex.test(password);
}


export { validateEmail, validatePassword, validateUrl };