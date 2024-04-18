$(document).ready(function() {
    // 页面加载完成后立即获取账户余额和持仓信息
    updateAccountInfo();



    function updateAccountInfo() {
        const currentUser = localStorage.getItem('username');
        // 获取账户余额
        fetchAccountBalance(currentUser);
        // 获取持仓信息并匹配大盘实时行情
        fetchPortfolio(currentUser);
        // 启动倒计时
        startCountdown();
    }

    function fetchAccountBalance(username) {
        fetch(`http://127.0.0.1:12345/getBalance?username=${username}`)
            .then(response => response.json())
            .then(data => {
                if (data === -1) {
                    $('#user-balance').text('用户不存在或出现异常');
                } else {
                    $('#user-balance').text(data.toFixed(2));
                }
            })
            .catch(error => {
                console.error('Error fetching account balance:', error);
                $('#user-balance').text('获取账户余额失败');
            });
    }

    function fetchPortfolio(username) {
        fetch(`http://127.0.0.1:12345/getInventory?username=${username}`)
            .then(response => response.json())
            .then(data => {
                // 清空表格内容
                $('#stock-table-body').empty();

                // 调用大盘实时行情接口，获取股票的最新价格和名称
                fetch(`http://127.0.0.1:12345/getMarketPrice`)
                    .then(response => response.json())
                    .then(marketData => {
                        // 遍历持仓信息并动态添加到表格中
                        data.forEach(stock => {
                            const code = stock.Code;
                            const stockInfo = marketData.find(item => item.Code === code);
                            const currentPrice = stockInfo ? stockInfo.Price : '未知'; // 如果找不到对应的股票信息，则显示为'未知'
                            const name = stockInfo ? stockInfo.Name : '未知'; // 如果找不到对应的股票信息，则显示为'未知'
                            const profitLoss = calculateProfitLoss(stock, currentPrice);
                            const row = `<tr>
                                            <td>${stock.Code}</td>
                                            <td>${stock.Amount}</td>
                                            <td>${name}</td>
                                            <td>${stock.AVG_Cost}</td>
                                            <td>${currentPrice}</td>
                                            <td>${profitLoss}</td>
                                        </tr>`;
                            $('#stock-table-body').append(row);
                        });
                    })
                    .catch(error => {
                        console.error('Error fetching market price:', error);
                    });
            })
            .catch(error => {
                console.error('Error fetching portfolio:', error);
            });
    }

    function calculateProfitLoss(stock, currentPrice) {
        // 计算盈亏金额
        const profitLoss = (currentPrice - stock.AVG_Cost) * stock.Amount;
        return profitLoss.toFixed(2);
    }

    function startCountdown() {
        let timeLeft = 6; // 倒计时时间，单位为秒
        const countdownElement = $('#countdown'); // 倒计时展示的元素
        countdownElement.text(`更新倒计时：${timeLeft} 秒`);

        const countdownInterval = setInterval(function() {
            timeLeft--;
            countdownElement.text(`更新倒计时：${timeLeft} 秒`);
            if (timeLeft === 0) {
                clearInterval(countdownInterval);
                updateAccountInfo(); // 当倒计时结束时重新获取账户信息
            }
        }, 1000); // 每秒钟更新一次倒计时
    }
});
