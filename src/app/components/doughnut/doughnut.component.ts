import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-doughnut',
  templateUrl: './doughnut.component.html',
  styleUrls: ['./doughnut.component.css'],
})
export class DoughnutComponent implements OnInit {

  @Input() title: string = 'Sin titulo';
  @Input() labels: string[] = [
    'Download Sales',
    'In-Store Sales',
    'Mail-Order Sales',
  ];
  @Input() data: number[] = [350, 450, 100];
  @Input() colors:string[] = ['#398Bf7', '#9DF3C4', '#F38181'];

  public doughnutChartData!: ChartData<'doughnut'>;
  public doughnutChartType: ChartType = 'doughnut';

  ngOnInit(): void {

    this.doughnutChartData = {
      labels: this.labels,
      datasets: [
        {
          data: this.data,
          backgroundColor: this.colors
        },        
      ]
    }
  }

  // Doughnut
  // public doughnutChartLabels: string[] = [
  //   'Download Sales',
  //   'In-Store Sales',
  //   'Mail-Order Sales',
  // ];


  // public doughnutChartData: ChartData<'doughnut'> = {
  //   labels: this.doughnutChartLabels,
  //   datasets: [
  //     {
  //       data: [350, 450, 100],
  //       backgroundColor: ['#398Bf7', '#9DF3C4', '#F38181'],
  //     },
  //   ],
    // { data: [50, 150, 120] },
    // { data: [250, 130, 70] },
  // };


  // public doughnutChartType: ChartType = 'doughnut';
}
