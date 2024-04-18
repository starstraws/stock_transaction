$(document).ready(function() {

    window.currentUser = localStorage.getItem('username');
    const userPanel = $('.user-panel .info a');
    userPanel.text(window.currentUser ? window.currentUser : '游客');

    // 登录按钮点击事件
    $('#loginButton').on('click', function(event) {
        event.preventDefault(); // 阻止默认行为
        window.location.href = '../templates/login.html'; // 跳转到登录页面
    });

    // 注册按钮点击事件
    $('#registerButton').on('click', function(event) {
        event.preventDefault(); // 阻止默认行为
        window.location.href = '../templates/register.html'; // 跳转到注册页面
    });

    // 注销按钮点击事件
    $('#logoutButton').on('click', function(event) {
        event.preventDefault(); // 阻止默认行为
        // 执行注销操作，例如清除本地存储中的用户信息等
        localStorage.removeItem('username');
        // 然后跳转到游客页面或其他页面
        window.location.href = '../templates/tmp_index.html'; // 假设跳转到游客页面
    });

    $('#marketButton').on('click', function(event) {
        event.preventDefault(); // 阻止默认行为
        if (window.currentUser) {
            window.location.href = 'market.html'; // 跳转到大盘页面
        } else {
            // 如果用户未登录，则跳转到游客页面
            window.location.href = '../templates/tmp_index.html';
        }
    });

    $('#registerMain').on('click', function(event) {
        event.preventDefault(); // 阻止默认行为
        if (window.currentUser) {
            window.location.href = '../templates/market.html'; // 跳转到大盘页面
        } else {
            // 如果用户未登录，则跳转到游客页面
            window.location.href = '../templates/tmp_index.html';
        }
    });

    $('#loginMain').on('click', function(event) {
        event.preventDefault(); // 阻止默认行为
        if (window.currentUser) {
            window.location.href = '../templates/market.html'; // 跳转到大盘页面
        } else {
            // 如果用户未登录，则跳转到游客页面
            window.location.href = '../templates/tmp_index.html';
        }
    });

    $('#stocksButton').on('click', function(event) {
        event.preventDefault(); // 阻止默认行为
        if (window.currentUser) {
            window.location.href = '../templates/stocks.html'; // 跳转到大盘页面
        } else {
            // 如果用户未登录，则跳转到游客页面
            window.location.href = '../templates/tmp_stocks.html';
        }
    });


    // 交易按钮点击事件
    $('#tradeButton').on('click', function() {
        window.location.href = 'trade.html'; // 重定向到 trade.html 页面
    });

    // 持仓情况按钮点击事件
    $('#accountButton').on('click', function() {
        window.location.href = 'account.html'; // 重定向到 account.html 页面
    });

    // 交易记录按钮点击事件
    $('#recordButton').on('click', function() {
        window.location.href = 'record.html'; // 重定向到 record.html 页面
    });

});
