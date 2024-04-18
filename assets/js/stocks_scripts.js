$(document).ready(function() {
    const countdownElement2 = $('#countdown2');
    const stockChartElement = $('#stock-chart');
    let countdownInterval2;
    let currentStockNum;

    // Handling search button click event
    $('#search-button').on('click', function() {
        const stockCode = $('#stock-search-input').val();
        if (stockCode.trim() === '') {
            alert('请输入股票代码');
            return;
        }
        currentStockNum = stockCode;
        fetchSpecifyStockData(stockCode);
    });

    // Function to fetch specific stock data
    function fetchSpecifyStockData(stockCode) {
        fetch(`http://127.0.0.1:12345/getStockPrice?code=${stockCode}`)
            .then(response => response.json())
            .then(data => {
                const startIndex = Math.max(0, data.length - 100);
                const latestData = data.slice(startIndex);

                const timeLabels = Array.from({ length: latestData.length }, (_, i) => i);
                const prices = latestData;

                stockChart.data.labels = timeLabels;
                stockChart.data.datasets[0].data = prices;

                stockChart.update();

                startCountdown2();
            })
            .catch(error => {
                console.error('Error fetching stock data:', error);
            });
    }

    // Function to start countdown timer
    function startCountdown2() {
        let timeLeft = 6;
        countdownInterval2 = setInterval(function() {
            countdownElement2.text(`个股走势${timeLeft} 秒后刷新`);
            timeLeft--;
            if (timeLeft < 0) {
                clearInterval(countdownInterval2);
                countdownElement2.text('Refreshing...');
                fetchSpecifyStockData(currentStockNum);
            }
        }, 1000);
    }

    // Initializing the stock chart
    const ctx = stockChartElement[0].getContext('2d');
    const stockChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: '股票价格',
                borderColor: 'rgb(75, 192, 192)',
                data: [],
                fill: false
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        displayFormats: {
                            minute: 'HH:mm'
                        }
                    }
                },
                y: {}
            }
        }
    });
});
