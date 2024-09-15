import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function useValidRoute(validPaths) {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const path = location.pathname;
        if (!validPaths.includes(path)) {
            // 如果当前路径不在有效路径列表中，重定向到 NotFound 页面
            navigate('/not-found', { replace: true });
        }
    }, [location, navigate, validPaths]);
}

export default useValidRoute;