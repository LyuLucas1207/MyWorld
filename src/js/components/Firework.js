import React, { useRef } from 'react';
import { useFireworkEffect } from '../utility/myUse';

const FireworkComponent = () => {
    const canvasRef = useRef(null); // 获取 canvas 引用

    // 调用自定义 Hook，实现烟花效果
    useFireworkEffect(canvasRef);

    return (
        <canvas
            ref={canvasRef}
            style={{ display: 'block', background: 'black', width: '100vw', height: '100vh' }}
        />
    );
};

export default FireworkComponent;
