import { Component, Input, AfterViewInit, OnChanges, OnDestroy } from '@angular/core';
import { lightningChart, ChartXY, Point } from '@arction/lcjs';

@Component({
  selector: 'app-chart',
  template: '<div [id]="this.chartId"></div>',
  styles: ['div { height: 100% }']
})

export class ChartComponent implements OnChanges, OnDestroy, AfterViewInit {
  chart: ChartXY;
  chartId: number;

  @Input() points: Point[];

  constructor() {}

  ngOnChanges() {
    // Generate random ID to us as the containerId for the chart and the target div id
    this.chartId = Math.trunc(Math.random() * 1000000);
  }

  ngAfterViewInit() {
    // Create chartXY
    this.chart = lightningChart().ChartXY({container: `${this.chartId}`});
    // Set chart title
    this.chart.setTitle('Getting Started');
    // Add line series to the chart
    const lineSeries = this.chart.addLineSeries();
    // Set stroke style of the line
    lineSeries.setStrokeStyle((style) => style.setThickness(5));
    // Add data point to the line series
    lineSeries.add(this.points);
  }

  ngOnDestroy() {
    // "dispose" should be called when the component is unmounted to free all the resources used by the chart
    this.chart.dispose();
  }
}
