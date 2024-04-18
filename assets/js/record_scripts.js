document.addEventListener("DOMContentLoaded", async function() {
    const stockTable = document.getElementById('stock-table');
    const currentUser = localStorage.getItem('username');
    try {
        // 获取交易记录
        const tradeResponse = await fetch(`http://127.0.0.1:12345/getTradeRecord?username=${currentUser}`);
        const tradeData = await tradeResponse.json();

        // 获取大盘实时行情
        const marketResponse = await fetch(`http://127.0.0.1:12345/getMarketPrice`);
        const marketData = await marketResponse.json();

        if (tradeData && Array.isArray(tradeData)) {
            // 渲染表格并匹配股票名称
            renderStockTable(tradeData, marketData, stockTable);
        } else {
            stockTable.innerHTML = '未找到交易记录';
        }
    } catch (error) {
        console.error('获取交易记录失败:', error);
        stockTable.innerHTML = '获取交易记录失败';
    }
});

function renderStockTable(tradeData, marketData, stockTable) {
    tradeData.forEach(transaction => {
        const row = stockTable.insertRow();
        // 根据交易记录的股票代码匹配对应的股票名称
        const stockInfo = marketData.find(stock => stock.Code === transaction.Code);
        const stockName = stockInfo ? stockInfo.Name : '未知股票'; // 如果找不到匹配的股票名称，则使用默认值
        row.innerHTML = `<td>${transaction.TradeTime}</td><td>${transaction.Code}</td><td>${stockName}</td><td>${transaction.Direction === 0 ? '买入' : '卖出'}</td><td>${transaction.KnockPrice}</td><td>${transaction.Price}</td><td>${transaction.State === 0 ? '错误' : transaction.State === 1 ? '委托成功' : transaction.State === 2 ? '交易成功' : transaction.State === 3 ? '废单' : transaction.State === 4 ? '账户余额不足' : transaction.State === 5 ? '持仓余额不足' : '未知状态'}</td>`;
    });
}
