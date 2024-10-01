import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { EChartsOption } from 'echarts';
import { CommonModule } from '@angular/common'; // Import CommonModule
@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'] // Corrected from styleUrl to styleUrls
})
export class ChartComponent implements OnInit {
  
  chartOption: EChartsOption = {};
  jsonResponse: any; // Add this line to store the JSON response

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchChartData();
  }

  fetchChartData(): void {
    // Fetch data from the backend API
    this.http.get<any[]>('http://localhost:8080/api/ohlc-data').subscribe(
      (response) => {
        this.buildChart(response);
        this.jsonResponse = response; // Store the response
      },
      (error) => {
        console.error('Error fetching data', error);
      }
    );
  }

  buildChart(data: any[]): void {
    const ohlcData = data.map(item => [item.time, item.open, item.close, item.low, item.high]); // For OHLC
    const cprData = data.map(item => [item.time, item.cpr]);
    const pivotData = data.map(item => [item.time, item.pivot]);
    const pivotHighData = data.map(item => [item.time, item.pivotHigh]);
    const pivotLowData = data.map(item => [item.time, item.pivotLow]);
    const anchorVWAPData = data.map(item => [item.time, item.anchorVWAP]);

    this.chartOption = {
      title: {
        text: 'OHLC and Line Charts'
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        data: data.map(item => item.time), // X-axis will have the time values
        boundaryGap: false
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'OHLC',
          type: 'candlestick',
          data: ohlcData
        },
        {
          name: 'CPR',
          type: 'line',
          data: cprData,
          smooth: true,
          lineStyle: {
            color: 'orange'
          }
        },
        {
          name: 'Pivot',
          type: 'line',
          data: pivotData,
          smooth: true,
          lineStyle: {
            color: 'blue'
          }
        },
        {
          name: 'Pivot High',
          type: 'line',
          data: pivotHighData,
          smooth: true,
          lineStyle: {
            color: 'green'
          }
        },
        {
          name: 'Pivot Low',
          type: 'line',
          data: pivotLowData,
          smooth: true,
          lineStyle: {
            color: 'red'
          }
        },
        {
          name: 'AnchorVWAP',
          type: 'line',
          data: anchorVWAPData,
          smooth: true,
          lineStyle: {
            color: 'purple'
          }
        }
      ]
    };
  }
}
