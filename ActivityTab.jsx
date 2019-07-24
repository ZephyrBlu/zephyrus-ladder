import { Component } from 'react';
import Controls from './Components/Controls';
import CustomTooltip from './Components/Tooltip';
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from 'recharts';

export default class ActivityTab extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: props.data,
        };
    }

    render() {
        const ticks = [0, 5, 10, 15, 20, 25, 50,
            75, 100, 150, 200, 300, 400, 573,
        ];

        return (
            <section id="activity">
                <ResponsiveContainer width="100%" height={640}>
                    <AreaChart data={this.state.data}>
                        <XAxis
                            stroke="hsl(0, 0%, 47%)"
                            label={{ 
                                value: 'Games Played',
                                dy: 14,
                                fill: 'hsl(0, 0%, 47%)'
                            }}
                            dataKey="games"
                            ticks={ticks}
                        />
                        <YAxis
                            stroke="hsl(0, 0%, 47%)"
                            label={{
                                value: 'Percentage of Population (%)',
                                angle: -90, dx: -10,
                                fill: 'hsl(0, 0%, 47%)',
                            }}
                        />
                        <CartesianGrid horizontal={false} vertical={false} />
                        <Tooltip content={<CustomTooltip chart="activity" />} />
                        <Area
                            type="monotone"
                            dataKey="proportion"
                            stroke="hsl(120, 100%, 45%)"
                            strokeWidth={1}
                            fill="hsla(120, 100%, 55%, 0.3)"
                            activeDot={{ stroke: 'black', strokeWidth: 3, r: 6 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </section>
        );  
    }
}