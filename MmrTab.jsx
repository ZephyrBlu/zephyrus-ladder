import { Component } from 'react';
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from 'recharts';
import Controls from './Components/Controls';
import CustomTooltip from './Components/Tooltip';

export default class MmrTab extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: props.data,
            lineState: {
                All: 0,
                Protoss: 0,
                Terran: 0,
                Zerg: 0,
                Random: 0,
            },
            currentLeague: 'all',
        };

        this.isLineActive = this.isLineActive.bind(this);
    }

    isLineActive(line, returnType = null) {
        if (this.state.lineState[line]) {
            if (returnType === 'bool') {
                return 1;
            }
            return 'active';
        }

        if (returnType === 'bool') {
            return 0;
        }
        return '';
    }

    async changeLeague(selectedLeague) {
        await this.setState({
            currentLeague: selectedLeague,
        });
    }

    render() {
        const baseLineStyle = {
            opacity: null,
            transition: 'opacity 0.8s',
        };

        const strokeSize = {
            all: 22,
            grandmaster: 82,
            master: 33,
            diamond: 39,
            platinum: 48,
            gold: 57,
            silver: 49,
            bronze: 58,
        };

        const colours = {
            allRace: 'hsl(120, 100%, 45%)',
            protoss: 'hsl(51, 100%, 50%)',
            random: 'hsl(198, 71%, 73%)',
            terran: 'red',
            zerg: 'hsl(282, 100%, 30%)',
        };

        const races = [
            'All',
            'Protoss',
            'Terran',
            'Zerg',
            'Random',
        ];

        const createStyle = (line) => {
            const lineStyle = Object.assign({}, baseLineStyle);
            lineStyle.opacity = this.state.lineState[line];
            return lineStyle;
        };

        const getActiveLines = () => {
            const active = [];
            Object.keys(this.state.lineState).forEach((line) => {
                if (this.isLineActive(line, 'bool')) {
                    active.push(line);
                }
            });
            return active;
        };

        return (
            <section id="mmr">
                <div id="chart">
                    <ResponsiveContainer width="99%" height={640}>
                        <LineChart data={this.state.data[this.state.currentLeague]}>
                            <XAxis
                                stroke="hsl(0, 0%, 47%)"
                                dataKey="bin"
                                label={{ value: 'MMR', dy: 14, fill: 'hsl(0, 0%, 47%)' }}
                            />
                            <YAxis
                                stroke="hsl(0, 0%, 47%)"
                                label={{
                                    value: 'Percentage of Selected Population (%)',
                                    angle: -90,
                                    dx: -10,
                                    fill: 'hsl(0, 0%, 47%)',
                                }}
                            />
                            <CartesianGrid horizontal={false} vertical={false} />
                            <Tooltip
                                content={
                                    <CustomTooltip
                                        chart="mmr"
                                        names={getActiveLines()}
                                    />
                                }
                                cursor={{
                                    stroke: 'hsla(0, 0%, 0%, 0.8)',
                                    strokeWidth: strokeSize[this.state.currentLeague],
                                }}
                            />

                            {races.map(race => (
                                <Line
                                    type="monotone"
                                    dataKey={`${race}.value`}
                                    stroke={colours[race]}
                                    strokeWidth={2}
                                    style={createStyle(race)}
                                    dot={false}
                                    activeDot={this.isLineActive(race)}
                                />
                            ))}
                        </LineChart>
                    </ResponsiveContainer>

                    <Controls chart="mmr" type="race" />

                    <Controls chart="mmr" type="league" />
                </div>
            </section>
        );
    }
}
