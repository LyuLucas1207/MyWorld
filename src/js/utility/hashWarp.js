import { useEffect } from 'react';

function hashWarp(Component) {
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

export default hashWarp;
