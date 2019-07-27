import { Component } from 'react';
import {
    PieChart,
    Pie,
    Cell,
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
    Tooltip,
} from 'recharts';
import CustomTooltip from '../Components/Tooltip';

export default class OffraceTab extends Component {
    static defaultProps = {
        data: {
            pie: { grandmaster: [{ name: 'Loading', value: 0 }] },
            radar: {
                data: [{
                    league: 'grandmaster',
                    protoss: 0,
                    zerg: 0,
                    terran: 0,
                    random: 0,
                }],
                raw: {
                    percentage: '0%',
                    fraction: '0/0',
                },
            },
        },
    }

    constructor(props) {
        super(props);

        this.state = {
            currentLeague: 'All',
        };

        this.isLeagueActive = this.isLeagueActive.bind(this);
        this.changeLeague = this.changeLeague.bind(this);
    }

    async changeLeague(selectedLeague) {
        await this.setState({
            currentLeague: selectedLeague,
        });
    }

    isLeagueActive(league) {
        if (this.state.currentLeague === league) {
            return 'active';
        }
        return '';
    }

    render() {
        const colours = {
            All: 'hsl(120, 100%, 45%)',
            Protoss: 'hsl(51, 100%, 50%)',
            Random: 'hsl(198, 71%, 73%)',
            Terran: 'red',
            Zerg: 'hsl(282, 100%, 30%)',
        };

        const coloursLight = {
            All: 'hsl(120, 100%, 65%)',
            Protoss: 'hsl(51, 100%, 70%)',
            Random: 'hsl(198, 71%, 93%)',
            Terran: 'hsl(0, 100%, 70%)',
            Zerg: 'hsl(282, 100%, 50%)',
        };

        const races = ['All', 'Protoss', 'Terran', 'Zerg', 'Random'];

        const sortedRaces = ['Protoss', 'Random', 'Terran', 'Zerg'];

        const radarRaces = ['Random', 'Zerg', 'Protoss', 'Terran'];

        const pieRaces = {
            Protoss: ['Zerg', 'Terran', 'Random'],
            Random: ['Protoss', 'Zerg', 'Terran'],
            Terran: ['Protoss', 'Zerg', 'Random'],
            Zerg: ['Protoss', 'Terran', 'Random'],
        };

        const tooltipStyle = {
            backgroundColor: 'none',
            border: 'none',
            width: 90,
            height: 25,
            whiteSpace: 'pre-line',
        };

        const data = this.props.data.pie[this.state.currentLeague.toLowerCase()];

        return (
            <section id="offrace">
                <div id="title">
                    <h2>All Leagues</h2>
                    <h2>League Breakdown</h2>
                </div>
                <div id="radar">
                    <ResponsiveContainer width={600} height={500}>
                        <RadarChart outerRadius={200} data={this.props.data.radar.data}>
                            <PolarGrid stroke="hsl(0, 0%, 47%)" />
                            <PolarAngleAxis
                                dataKey="league"
                                stroke="hsl(0, 0%, 47%)"
                                dy={5}
                            />
                            <PolarRadiusAxis
                                angle={90}
                                ticks={[10, 20, 30, 40, 50, 60, 70]}
                                domain={[0, 10]}
                                dx={4}
                                dy={25}
                                stroke="hsl(0, 0%, 47%)"
                            />
                            {radarRaces.map((race, index) => (
                                <Radar
                                    key={`radar-${index}`}
                                    name={race}
                                    dataKey={race.toLowerCase()}
                                    stroke={colours[race]}
                                    fill={colours[race]}
                                    fillOpacity={0.35}
                                    dot={{ stroke: colours[race], fill: 'transparent' }}
                                    activeDot={{
                                        stroke: 'none',
                                        strokeWidth: 1,
                                        fill: colours[race],
                                    }}
                                />
                            ))}
                            <Tooltip
                                content={
                                    <CustomTooltip
                                        chart="radar"
                                    />
                                }
                                cursor={{ stroke: 'white', strokeWidth: 1.2 }}
                                position={{ x: 130, y: 450 }}
                            />
                        </RadarChart>
                    </ResponsiveContainer>
                    <p style={{ marginTop: 0, marginBottom: 5 }}>
                        Total Players Off-Racing: {this.props.data.radar.raw.percentage}%
                    </p>
                    <p style={{ margin: 0 }}>
                        <small>({this.props.data.radar.raw.fraction})</small>
                    </p>
                </div>

                <div id="pie">
                    {sortedRaces.map((race, index) => (
                        <div key={`pie-wrapper-${index}`} id={`${race.toLowerCase()}`} className="pie-chart">
                            <PieChart width={200} height={200}>
                                <Pie
                                    key={`pie-${index}`}
                                    data={data[race.toLowerCase()]}
                                    dataKey="value"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={90}
                                    innerRadius={65}
                                    paddingAngle={0}
                                >
                                    {pieRaces[race].map(raceCell => (
                                        <Cell
                                            key={`cell-${index}`}
                                            stroke={colours[raceCell]}
                                            strokeWidth={1}
                                            fill={coloursLight[raceCell]}
                                            fillOpacity={0.2}
                                        />
                                    ))}
                                </Pie>

                                <Tooltip
                                    contentStyle={tooltipStyle}
                                    itemStyle={{ color: 'hsl(0, 0%, 47%)', fontWeight: 400 }}
                                    position={{ x: 46, y: 77 }}
                                    isAnimationActive={false}
                                    separator=""
                                    formatter={(value, name) => [
                                        `${value}%`, '', //  of ${race} Off-Race as ${name}
                                    ]}
                                />

                            </PieChart>

                            <svg height="20" width="20">
                                <circle cx="10" cy="10" r="10" fill={colours[race]} />
                            </svg>
                        </div>
                    ))}

                    <div id="league1">
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <button
                                            style={{
                                                borderRadius: '15px 0 0 0',
                                                borderTop: '1px solid white',
                                                borderLeft: '1px solid white',
                                            }}
                                            onClick={() => this.changeLeague('All')}
                                            className={`${this.isLeagueActive('All')}`}
                                        >
                                            All
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            style={{
                                                borderRadius: '0 15px 0 0',
                                                borderRight: '1px solid white',
                                                borderTop: '1px solid white',
                                            }}
                                            onClick={() => this.changeLeague('Grandmaster')}
                                            className={`${this.isLeagueActive('Grandmaster')}`}
                                        >
                                            GM
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <button
                                            style={{
                                                borderRadius: '0 0 0 15px',
                                                borderLeft: '1px solid white',
                                                borderBottom: '1px solid white',
                                            }}
                                            onClick={() => this.changeLeague('Master')}
                                            className={`${this.isLeagueActive('Master')}`}
                                        >
                                            M
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            style={{
                                                borderRadius: '0 0 15px 0',
                                                borderBottom: '1px solid white',
                                                borderRight: '1px solid white',
                                            }}
                                            onClick={() => this.changeLeague('Diamond')}
                                            className={`${this.isLeagueActive('Diamond')}`}
                                        >
                                            D
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div id="league2">
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <button
                                            style={{
                                                borderRadius: '15px 0 0 0',
                                                borderTop: '1px solid white',
                                                borderLeft: '1px solid white',
                                            }}
                                            onClick={() => this.changeLeague('Platinum')}
                                            className={`${this.isLeagueActive('Platinum')}`}
                                        >
                                            P
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            style={{
                                                borderRadius: '0 15px 0 0',
                                                borderRight: '1px solid white',
                                                borderTop: '1px solid white',
                                            }}
                                            onClick={() => this.changeLeague('Gold')}
                                            className={`${this.isLeagueActive('Gold')}`}
                                        >
                                            G
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <button
                                            style={{
                                                borderRadius: '0 0 0 15px',
                                                borderLeft: '1px solid white',
                                                borderBottom: '1px solid white',
                                            }}
                                            onClick={() => this.changeLeague('Silver')}
                                            className={`${this.isLeagueActive('Silver')}`}
                                        >
                                            S
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            style={{
                                                borderRadius: '0 0 15px 0',
                                                borderBottom: '1px solid white',
                                                borderRight: '1px solid white',
                                            }}
                                            onClick={() => this.changeLeague('Bronze')}
                                            className={`${this.isLeagueActive('Bronze')}`}
                                        >
                                            B
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        );
    }
}
