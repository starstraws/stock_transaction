document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // 阻止默认提交行为

    // 获取表单数据
    var formData = new FormData(this);
    var username = formData.get('username');
    var password = formData.get('password');

    // 构造登录请求的 URL
    var url = 'http://127.0.0.1:12345/login?username=' + encodeURIComponent(username) + '&pwd=' + encodeURIComponent(password);

    // 发送登录请求
    fetch(url)
        .then(response => response.text()) // 获取文本格式的响应数据
        .then(data => {
            // 根据服务器返回的结果进行处理
            if (data === 'true') {
                // 登录成功
                localStorage.setItem('username', username); // 将用户名保存到本地存储
                window.location.href = 'market.html';
            } else if (data === 'false') {
                // 登录失败
                document.getElementById('message').textContent = '登录失败：用户名或密码错误';
            } else {
                // 其他情况（可能是服务器错误）
                document.getElementById('message').textContent = '登录失败，请稍后再试';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('message').textContent = '登录失败，请稍后再试';
        });
});
