var d3 = require('d3');
var angular = require('angular');
var $ = require('jquery');
var ngMock = require('ngMock');
var expect = require('expect.js');

describe('Vislib Split Function Test Suite', function () {
  describe('Column Chart', function () {
    var chartSplit;
    var chartTitleSplit;
    var xAxisSplit;
    var yAxisSplit;
    var el;
    var data = {
      rows: [
        {
          hits      : 621,
          label     : '',
          ordered   : {
            date    : true,
            interval: 30000,
            max     : 1408734982458,
            min     : 1408734082458
          },
          series    : [
            {
              values: [
                {
                  x: 1408734060000,
                  y: 8
                },
                {
                  x: 1408734090000,
                  y: 23
                },
                {
                  x: 1408734120000,
                  y: 30
                },
                {
                  x: 1408734150000,
                  y: 28
                },
                {
                  x: 1408734180000,
                  y: 36
                },
                {
                  x: 1408734210000,
                  y: 30
                },
                {
                  x: 1408734240000,
                  y: 26
                },
                {
                  x: 1408734270000,
                  y: 22
                },
                {
                  x: 1408734300000,
                  y: 29
                },
                {
                  x: 1408734330000,
                  y: 24
                }
              ]
            }
          ],
          xAxisLabel: 'Date Histogram',
          yAxisLabel: 'Count'
        },
        {
          hits      : 621,
          label     : '',
          ordered   : {
            date    : true,
            interval: 30000,
            max     : 1408734982458,
            min     : 1408734082458
          },
          series    : [
            {
              values: [
                {
                  x: 1408734060000,
                  y: 8
                },
                {
                  x: 1408734090000,
                  y: 23
                },
                {
                  x: 1408734120000,
                  y: 30
                },
                {
                  x: 1408734150000,
                  y: 28
                },
                {
                  x: 1408734180000,
                  y: 36
                },
                {
                  x: 1408734210000,
                  y: 30
                },
                {
                  x: 1408734240000,
                  y: 26
                },
                {
                  x: 1408734270000,
                  y: 22
                },
                {
                  x: 1408734300000,
                  y: 29
                },
                {
                  x: 1408734330000,
                  y: 24
                }
              ]
            }
          ],
          xAxisLabel: 'Date Histogram',
          yAxisLabel: 'Count'
        }
      ]
    };

    beforeEach(ngMock.module('kibana'));
    beforeEach(ngMock.inject(function (Private) {
      chartSplit = Private(require('ui/vislib/lib/layout/splits/column_chart/chart_split'));
      chartTitleSplit = Private(require('ui/vislib/lib/layout/splits/column_chart/chart_title_split'));
      xAxisSplit = Private(require('ui/vislib/lib/layout/splits/column_chart/x_axis_split'));
      yAxisSplit = Private(require('ui/vislib/lib/layout/splits/column_chart/y_axis_split'));

      el = d3.select('body').append('div')
        .attr('class', 'visualization')
        .datum(data);
    }));

    afterEach(function () {
      el.remove();
    });

    describe('chart split function', function () {
      var fixture;

      beforeEach(ngMock.inject(function () {
        fixture = d3.select('.visualization').call(chartSplit);
      }));

      afterEach(function () {
        fixture.remove();
      });

      it('should append the correct number of divs', function () {
        expect($('.chart').length).to.be(2);
      });

      it('should add the correct class name', function () {
        expect(!!$('.chart-wrapper-row').length).to.be(true);
      });
    });

    describe('chart title split function', function () {
      var newEl;
      var fixture;

      beforeEach(ngMock.inject(function () {
        el.append('div').attr('class', 'x-axis-chart-title');
        el.append('div').attr('class', 'y-axis-chart-title');
        d3.select('.x-axis-chart-title').call(chartTitleSplit);
        d3.select('.y-axis-chart-title').call(chartTitleSplit);

        newEl = d3.select('body').append('div')
          .attr('class', 'series')
          .datum({ series: []});

        newEl.append('div').attr('class', 'x-axis-chart-title');
        newEl.append('div').attr('class', 'y-axis-chart-title');
        newEl.select('.x-axis-chart-title').call(chartTitleSplit);
        newEl.select('.y-axis-chart-title').call(chartTitleSplit);

        fixture = newEl.selectAll(this.childNodes)[0].length;
      }));

      afterEach(function () {
        newEl.remove();
      });

      it('should append the correct number of divs', function () {
        expect($('.chart-title').length).to.be(2);
      });

      it('should remove the correct div', function () {
        expect($('.y-axis-chart-title').length).to.be(1);
        expect($('.x-axis-chart-title').length).to.be(0);
      });

      it('should remove all chart title divs when only one chart is rendered', function () {
        expect(fixture).to.be(0);
      });
    });

    describe('x axis split function', function () {
      var fixture;
      var divs;

      beforeEach(ngMock.inject(function () {
        fixture = d3.select('body').append('div')
          .attr('class', 'columns')
          .datum({ columns: [{}, {}] });
        d3.select('.columns').call(xAxisSplit);
        divs = d3.selectAll('.x-axis-div')[0];
      }));

      afterEach(function () {
        fixture.remove();
        $(divs).remove();
      });

      it('should append the correct number of divs', function () {
        expect(divs.length).to.be(2);
      });
    });

    describe('y axis split function', function () {
      var fixture;
      var divs;

      beforeEach(ngMock.inject(function () {
        fixture = d3.select('body').append('div')
          .attr('class', 'rows')
          .datum({ rows: [{}, {}] });

        d3.select('.rows').call(yAxisSplit);

        divs = d3.selectAll('.y-axis-div')[0];
      }));

      afterEach(function () {
        fixture.remove();
        $(divs).remove();
      });

      it('should append the correct number of divs', function () {
        expect(divs.length).to.be(2);
      });
    });

  });
});
