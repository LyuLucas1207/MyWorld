function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email); // 返回 true 表示合法邮箱
}

function validatePassword(password) {
    // 密码至少 6 个字符，且不含空格
    const passwordRegex = /^\S{6,}$/;
    return passwordRegex.test(password);
}


export { validateEmail, validatePassword };