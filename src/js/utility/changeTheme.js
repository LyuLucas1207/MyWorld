import { useState, useEffect } from 'react';

export const useTheme = () => {
    // 从 localStorage 获取主题（防止刷新丢失）
    const savedTheme = localStorage.getItem('theme') === 'dark';
    const [isDarkTheme, setIsDarkTheme] = useState(savedTheme);

    // 切换主题函数
    const toggleTheme = () => {
        setIsDarkTheme((prevTheme) => {
            const newTheme = !prevTheme;
            localStorage.setItem('theme', newTheme ? 'dark' : 'light'); // 保存主题到 localStorage
            return newTheme;
        });
    };

    // 监听主题变化，动态修改 body 类
    useEffect(() => {
        if (isDarkTheme) {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
    }, [isDarkTheme]);

    return [isDarkTheme, toggleTheme];
};
