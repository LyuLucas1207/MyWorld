let isDragging = false;
let startY = 0;

let offsetY = 0; // 记录拖动的偏移量

const body = document.body;
const pullCord = document.getElementById('pull-cord');
const cord = document.getElementById('cord'); // 获取灯绳
const maxPull = 100; // 最大下拉距离
const initialY2 = 150; // 灯绳的初始长度

// 处理灯绳和灯泡的下拉和延伸
function updatePosition(newY) {
  // 使用 transform 平移整个 SVG，确保灯泡和绳子一起运动
  pullCord.style.transform = `translateY(${newY}px)`;

  // 增加灯绳的长度，使其向上延展
  const newCordLength = initialY2 + newY; // 动态更新灯绳长度
  cord.setAttribute('y2', newCordLength);
}

// 回弹效果，灯泡和绳子回到初始位置
function resetPosition() {
  updatePosition(0);
  toggleTheme();
}

// 开始拖动
pullCord.addEventListener('mousedown', (e) => {
  isDragging = true;
  startY = e.clientY;
});

// 停止拖动
document.addEventListener('mouseup', () => {
  if (isDragging) {
    isDragging = false;
    resetPosition(); // 回弹并切换主题
  }
});

// 拖动过程中
document.addEventListener('mousemove', (e) => {
  if (isDragging) {
    const deltaY = e.clientY - startY;
    let newY = offsetY + deltaY;

    // 限制下拉的最大距离
    if (newY > maxPull) newY = maxPull;
    if (newY < 0) newY = 0;

    // 更新位置和绳子的延展
    updatePosition(newY);
  }
});

// 切换主题
function toggleTheme() {
  if (body.classList.contains('light-theme')) {
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');
  } else {
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');
  }
}
