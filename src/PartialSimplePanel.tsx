import React, { PureComponent } from 'react';
import { withTheme } from '@grafana/ui';
import { PanelProps, GrafanaTheme } from '@grafana/data';

import { SimpleOptions } from 'types';
import { select } from 'd3';

interface Props extends PanelProps<SimpleOptions> {
  theme: GrafanaTheme;
}

class PartialSimplePanel extends PureComponent<Props> {
  containerElement: any;

  componentDidMount() {
    this.draw();
  }

  componentDidUpdate() {
    this.draw();
  }

  draw() {
    const { width, height, theme } = this.props;

    const data = [4, 8, 15, 16, 23, 42];

    const maxValue = Math.max.apply(
      Math,
      data.map(o => o)
    );

    const chart = select(this.containerElement)
      .html('')
      .attr('width', width)
      .attr('height', height);

    chart
      .selectAll('div')
      .data(data)
      .enter()
      .append('div')
      .style('height', height / data.length + 'px')
      .style('width', d => (d * width) / maxValue + 'px')
      .style('background-color', theme.colors.red);
  }

  render() {
    return <div ref={element => (this.containerElement = element)}></div>;
  }
}

export const SimplePanel = withTheme(PartialSimplePanel);
