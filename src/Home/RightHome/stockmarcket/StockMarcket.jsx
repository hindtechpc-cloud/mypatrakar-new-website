import  { useEffect, useState } from 'react'
import Chart from 'react-apexcharts';
import Header from '../shared/Header';
export default function StockMarcket() {
    const [stockData, setStockData] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [isOpen,setIsOpen] = useState(false);
  
    useEffect(() => {
      fetch('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=RFFS2DAPKM7E0D04')
        .then(response => response.json())
        .then(data => {
          const timeSeries = data['Time Series (5min)'];
          if (timeSeries) {
            const chartData = Object.entries(timeSeries).map(([time, values]) => ({
              x: new Date(time),
              y: [
                parseFloat(values['1. open']),
                parseFloat(values['2. high']),
                parseFloat(values['3. low']),
                parseFloat(values['4. close'])
              ]
            }));
            setStockData(chartData.reverse());
            setLoading(false);
          }
        })
        .catch(error => console.error('Error fetching stock data:', error));
    }, []);
  
   
    return (
    <div className="my-2 mt-5 font-sans md:max-w-sm  w-[300px] mx-auto py-4">
        <Header text="Stock Market" />
          <div className="max-w-4xl mx-auto p-4 shadow-lg rounded-xl bg-gray-300" >
        
        {loading ? (
          <p className="text-center text-gray-600">Loading data...</p>
        ) : (
          <Chart
            options={{
              chart: { type: 'candlestick' },
              xaxis: { type: 'datetime' },
              title: { text: 'IBM Stock Price', align: 'center' },
            }}
            series={[{ data: stockData }]}
            type="candlestick"
            height={400}
          />
        )}
      </div>
    </div>
    );
}
