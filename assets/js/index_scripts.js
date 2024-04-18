$(document).ready(function() {
    const countdownElement = $('#countdown');
    const stockTable = $('#stock-table');
    $('#stock-chart');
    let countdownInterval1;
    let initialPrices = {};
    let category_choice;

    // Function to fetch initial stock data from the backend and update the data grid
    function fetchInitialStockData() {
        $.ajax({
            url: 'http://127.0.0.1:12345/getMarketPrice',
            type: 'GET',
            success: function(response) {
                response.forEach(stock => {
                    initialPrices[stock.Code] = stock.Price;
                });

                fetchStockData();
            },
            error: function(xhr, status, error) {
                console.error('Error fetching initial stock data:', error);
            }
        });
    }

    // Function to fetch stock data from the backend and update the data grid
    function fetchStockData(category) {
        clearInterval(countdownInterval1);

        $.ajax({
            url: 'http://127.0.0.1:12345/getMarketPrice',
            type: 'GET',
            success: function(response) {
                $('#stock-table').empty();

                const shanghaiStocks = [];
                const shenzhenStocks = [];
                const gemStocks = [];

                response.forEach(stock => {
                    if (stock.Code.startsWith('6')) {
                        shanghaiStocks.push(stock);
                    } else if (stock.Code.startsWith('3')) {
                        shenzhenStocks.push(stock);
                    } else if (stock.Code.startsWith('0')) {
                        gemStocks.push(stock);
                    }
                });

                let stocksToShow;
                if (category === 'shanghai') {
                    stocksToShow = shanghaiStocks;
                } else if (category === 'shenzhen') {
                    stocksToShow = shenzhenStocks;
                } else if (category === 'gem') {
                    stocksToShow = gemStocks;
                } else {
                    stocksToShow = response;
                }

                const tableHeader = '<table class="table table-bordered">' +
                    '<thead><tr><th class="text-center font-weight-bold">股票代码</th>' +
                    '<th class="text-center font-weight-bold">名称</th>' +
                    '<th class="text-center font-weight-bold">基础价格</th>' +
                    '<th class="text-center font-weight-bold">最新价格</th>' +
                    '<th class="text-center font-weight-bold">当日涨跌幅</th>' +
                    '<th class="text-center font-weight-bold">当日涨跌价</th></tr></thead><tbody>';

                function generateRows(stocks) {
                    let rows = '';
                    stocks.forEach(stock => {
                        const initialPrice = initialPrices[stock.Code];
                        const changePercent = ((stock.Price - initialPrice) / initialPrice) * 100;
                        const changeAmount = stock.Price - initialPrice;

                        const formattedPrice = stock.Price.toFixed(2);
                        const formattedInitialPrice = initialPrice.toFixed(2);
                        const formattedChangePercent = changePercent.toFixed(2);
                        const formattedChangeAmount = changeAmount.toFixed(2);

                        rows += `<tr><td>${stock.Code}</td>
                                <td>${stock.Name}</td>
                                <td>${formattedInitialPrice}</td>
                                <td>${formattedPrice}</td>
                                <td>${formattedChangePercent}%</td>
                                <td>${formattedChangeAmount}</td></tr>`;
                    });
                    return rows;
                }

                const selectedRows = generateRows(stocksToShow);
                const tableFooter = '</tbody></table>';

                stockTable.append(tableHeader + selectedRows + tableFooter);

                startCountdown();
            },
            error: function(xhr, status, error) {
                console.error('Error fetching stock data:', error);
            }
        });
    }

    // Function to start countdown timer
    function startCountdown() {
        let timeLeft = 6;
        countdownInterval1 = setInterval(function() {
            countdownElement.text(`大盘行情${timeLeft} 秒后刷新`);
            timeLeft--;
            if (timeLeft < 0) {
                clearInterval(countdownInterval1);
                countdownElement.text('Refreshing...');
                fetchStockData(category_choice);
            }
        }, 1000);
    }

    // Using event delegation to handle click events
    $('.nav-link').on('click', function(event) {
        event.preventDefault();

        const categoryId = $(this).attr('id');
        const categoryMap = {
            'shanghaiStocksTrigger': 'shanghai',
            'shenzhenStocksTrigger': 'shenzhen',
            'gemStocksTrigger': 'gem',
            'showStockTableButton': 'all'
        };

        category_choice = categoryMap[categoryId] || 'all';
        clearInterval(countdownInterval1);
        fetchStockData(category_choice);
    });

    // Function to fetch initial stock data initially
    fetchInitialStockData();
});
