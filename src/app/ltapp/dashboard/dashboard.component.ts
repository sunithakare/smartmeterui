import { Component, OnInit, ViewChild } from '@angular/core';

import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ApexFill,
  ChartComponent,
  ApexStroke
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  stroke: ApexStroke;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild("radialchart") radialchart: ChartComponent;
  @ViewChild("barchart") barchart: ChartComponent;
  public radialChartOptions: Partial<ChartOptions>| any;
  public barChartOptions: Partial<ChartOptions>| any;

  totalMeterInstalled:number=0;
  totalConsumers:number=0;
  revenueVal:number=59.6;
  billGenVal:number[]=[580, 630, 601, 661];
todayDate:Date=new Date();

state:string='UP'

  constructor() {

    this.totalMeterInstalled=this.stateDetails['UP'].totalMeterInstalled;
    this.totalConsumers=this.stateDetails['UP'].totalConsumers;
    this.radialChartOptions = {
      series: [this.stateDetails['UP'].revenueVal],
      chart: {
        height: 350,
        type: "radialBar",
        offsetY: -10
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 135,
          dataLabels: {
            name: {
              fontSize: "16px",
              color: undefined,
              offsetY: 120
            },
            value: {
              offsetY: 76,
              fontSize: "22px",
              color: undefined,
              formatter: function(val:number) {
                return val + "M";
              }
            }
          }
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          shadeIntensity: 0.15,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 10, 50, 91]
        }
      },
      stroke: {
        dashArray: 4
      },
      labels: ["RC/DC in Dec'21"]
    };

    this.barChartOptions = {
      series: [
        {
          name: "Bill Generated ",
          data: this.stateDetails['UP'].billGenVal
        }
      ],
      chart: {
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded"
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories: [
          "Oct'21",
          "Nov'21",
          "Dec'21",
          "Jan'22",
        ]
      },
      yaxis: {
        title: {
          text: "Count "
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function(val:any) {
            return  + val ;
          }
        }
      }
    };
  }



  ngOnInit(): void {
  }
  report(stateCode: string) {
    this.totalMeterInstalled=this.stateDetails[stateCode].totalMeterInstalled;
    this.totalConsumers=this.stateDetails[stateCode].totalConsumers;
    this.revenueVal=this.stateDetails[stateCode].revenueVal;
    this.billGenVal=this.stateDetails[stateCode].billGenVal;
    this.barchart.updateSeries([    {
      name: "Bill Generated ",
      data: this.billGenVal
    }]);
    this.state=stateCode;
    this.radialchart.updateSeries([this.revenueVal]);
  }


  stateDetails:any={
    UP:{
      totalMeterInstalled:1041677,
      totalConsumers:1022585,
      revenueVal:12.61,
      billGenVal:[98.66,98.7,99.41,98.51],
    },
    HR:{
      totalMeterInstalled:387766,
      totalConsumers:382749,
      revenueVal:5.96,
      billGenVal:[96.09,96.50,97.76,97.07],
    },
    NDMC:{
      totalMeterInstalled:63119,
      totalConsumers:62.14,
      revenueVal:0,
      billGenVal:[96.63,97.06,97.12,96.75],
    },
    KESCO:{
      totalMeterInstalled:106233,
      totalConsumers:102524,
      revenueVal:7.88,
      billGenVal:[98.5,98.3,99.3,98.52],
    }
  }
}
