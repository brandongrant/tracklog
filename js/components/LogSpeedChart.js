"use strict";

import React from "react";
import Highcharts from "highcharts";
import Leaflet from "leaflet";

export default class LogSpeedChart extends React.Component {
  _createChart(container) {
    if (container == null) {
      return;
    }
    Highcharts.chart(container, {
      chart: {
        animation: false,
        style: {
          fontFamily: `"Helvetica Neue", Helvetica, Arial, sans-serif`,
          fontSize: "12px",
        },
      },
      title: {
        text: null,
      },
      tooltip: {
        formatter: function() { return `<b>${this.y} km/h</b>`; },
      },
      xAxis: {
        title: {
          text: "Distance",
        },
        labels: {
          formatter: function() { return `${this.value / 1000} km`; },
        },
      },
      yAxis: {
        title: {
          text: "Speed"
        },
        labels: {
          format: "{value} km/h"
        },
      },
      legend: {
        enabled: false,
      },
      series: [
        {
          name: "Speed",
          color: "rgb(30, 179, 0)",
          data: this._dataFromLog(this.props.log),
          animation: false,
        },
      ],
    });
  }

  _dataFromLog(log) {
    let data = [];

    log.get("tracks").forEach((track) => {
      track.forEach((point, i) => {
        const speed = point.get("speed");
        if (speed !== null) {
          const distance = point.get("cumulated_distance");
          const kmh = speed / 1000 * 3600;
          data.push([Math.round(distance), Math.round(kmh * 10) / 10]);
        }
      });
    });

    return data;
  }

  render() {
    return (
      <div className="log-chart-chart log-chart-speed" ref={this._createChart.bind(this)}></div>
    );
  }
}
