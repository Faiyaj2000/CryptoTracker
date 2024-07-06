document.getElementById('searchForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const coinType = document.getElementById('coinType').value;
    fetchPrice(coinType);
});

async function fetchPrice(coinType) {
    const loading = document.getElementById('loading');
    const tableResult = document.getElementById('tableResult');
    tableResult.innerHTML = '';
    loading.style.display = 'block';

    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${coinType}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true`);
        const data = response.data[coinType];
        const price = data.usd;
        const marketCap = data.usd_market_cap;
        const volume = data.usd_24h_vol;
        const change = data.usd_24h_change;

        tableResult.innerHTML = `
            <thead>
                <tr>
                    <th>Property</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Price (USD)</td>
                    <td>${price}</td>
                </tr>
                <tr>
                    <td>Market Cap</td>
                    <td>${marketCap}</td>
                </tr>
                <tr>
                    <td>24h Volume</td>
                    <td>${volume}</td>
                </tr>
                <tr>
                    <td>24h Change</td>
                    <td>${change.toFixed(2)}%</td>
                </tr>
            </tbody>`;
    } catch (error) {
        console.error("Error fetching the price data:", error);
        tableResult.innerHTML = `<tr><td colspan="2">Error fetching data. Please try again later.</td></tr>`;
    } finally {
        loading.style.display = 'none';
    }
}
