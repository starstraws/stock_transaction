document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault(); // 阻止默认提交行为

    // 获取表单数据
    var formData = new FormData(this);
    var username = formData.get('username');
    var password = formData.get('password');
    var confirmPassword = formData.get('confirmPassword');

    // 检查密码和确认密码是否相同
    if (password !== confirmPassword) {
        // 更新消息
        document.getElementById('message').textContent = '密码不一致,请刷新后重试';
        return; // 阻止继续执行注册请求
    }

    // 构造 GET 请求的 URL
    var url = 'http://127.0.0.1:12345/regist?username=' + encodeURIComponent(username) + '&pwd=' + encodeURIComponent(password);

    // 发送注册请求
    fetch(url)
    .then(response => response.text()) // 获取文本格式的响应数据
    .then(data => {
        // 根据服务器返回的结果进行处理
        if (data === 'true') {
            // 注册成功
            document.getElementById('message').textContent = '注册成功';
            window.location.href = '../templates/login.html';
        } else if (data === 'false') {
            // 注册失败
            document.getElementById('message').textContent = '注册失败';
        } else {
            // 其他情况（可能是服务器错误）
            document.getElementById('message').textContent = '注册失败，请稍后再试';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('message').textContent = '注册失败，请稍后再试';
    });
});
