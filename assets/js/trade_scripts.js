// 获取交易提交按钮
const submitButton = document.getElementById('submit');
// 监听交易提交按钮的点击事件
submitButton.addEventListener('click', async () => {
    // 获取表单数据
    const formData = new FormData(tradeForm);
    const tradeData = Object.fromEntries(formData.entries());
    // 获取当前用户
    const currentUser = localStorage.getItem('username');
    // 构建交易请求的 URL
    const url = `http://127.0.0.1:12345/trade?username=${currentUser}&code=${tradeData.stock}&direction=${tradeData.type}&price=${tradeData.price}&amount=${tradeData.quantity}`;
    try {
        // 发送交易请求
        const response = await fetch(url);
        const responseData = await response.json();
        handleMessage(responseData);
    } catch (error) {
        console.error('交易请求失败:', error);
        alert('交易请求失败');
    }
});


// 处理交易结果
function handleMessage(responseData) {
    console.log(responseData)
    switch (responseData) {
        case 0:
            alert('系统无用户/用户名不存在/股票代码不存在等情况');
            break;
        case 1:
            alert('委托成功');
            break;
        case 2:
            alert('交易成功');
            break;
        case 3:
            alert('废单');
            break;
        case 4:
            alert('账户余额不足');
            break;
        case 5:
            alert('持仓余额不足');
            break;
        default:
            alert('未知错误');
            break;
    }
}



// 获取板块和股票选择框
const blockSelect = document.getElementById('block');
const stockSelect = document.getElementById('stock');

// 监听板块选择变化事件
blockSelect.addEventListener('change', () => {
    const selectedBlock = blockSelect.value;

    // 清空股票选择框
    stockSelect.innerHTML = '';
    show(selectedBlock)
});

// 添加股票选项到股票选择框
function addStockOptions(stocks) {
    stocks.forEach(stock => {
        const option = document.createElement('option');
        option.value = stock.code;
        option.textContent = `${stock.name} (${stock.code})`;
        stockSelect.appendChild(option);
    });
}
function show(selectedBlock){
    // 根据选择的板块动态添加股票选项
    switch (selectedBlock) {
        case '6': // 沪市股票
            addStockOptions([
                { code: '601398', name: '工商银行' },
                { code: '600519', name: '贵州茅台' },
                { code: '600276', name: '恒瑞医药' },
                { code: '600309', name: '万华化学' },
                { code: '600009', name: '上海机场' },
                { code: '603288', name: '海天味业' },
                { code: '600048', name: '保利发展' },
                { code: '600585', name: '海螺水泥' },
                { code: '600028', name: '中国石化' },
                { code: '600588', name: '用友网络' }
                // 添加更多沪市股票
            ]);
            break;
        case '3': // 创业板股票
            addStockOptions([
                { code: '300347', name: '泰格医药' },
                { code: '300750', name: '宁德时代' },
                { code: '300059', name: '东方财富' },
                { code: '300024', name: '机器人' },
                { code: '300498', name: '温氏股份' },
                { code: '300760', name: '迈瑞医疗' },
                { code: '300015', name: '爱尔眼科' },
                { code: '300295', name: '三六五网' },
                { code: '300288', name: '朗玛信息' },
                { code: '300002', name: '神州泰岳' }
                // 添加更多创业板股票
            ]);
            break;
        case '0': // 深市股票
            addStockOptions([
                { code: '000069', name: '华侨城A' },
                { code: '002507', name: '涪陵榨菜' },
                { code: '002714', name: '牧原股份' },
                { code: '000651', name: '格力电器' },
                { code: '000858', name: '五粮液' },
                { code: '002415', name: '海康威视' },
                { code: '002179', name: '中航光电' },
                { code: '000776', name: '广发证券' },
                { code: '002511', name: '中顺洁柔' }
                // 添加更多深市股票
            ]);
            break;
        default:
            break;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    show('6')
});
