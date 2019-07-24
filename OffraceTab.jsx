import { Component } from 'react';
import Controls from './Components/Controls';
import CustomTooltip from './Components/Tooltip';
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

export default class OffraceTab extends Component {
    render() {
        return (
            <section id="offrace">
                <div id="title">
                    <h2>All Leagues</h2>
                    <h2>League Breakdown</h2>
                </div>
                <div id="radar">
                    <ResponsiveContainer width={600} height={500}>
                        <RadarChart outerRadius={200} data={this.state.offraceRadarData}>
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
                            {races.map(race => (
                                <Radar
                                    name={race.charAt(0).toUpperCase() + race.slice(1)}
                                    dataKey={race}
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
                                        totalOffrace={this.state.offraceRadarTotal}
                                    />
                                }
                                cursor={{ stroke: 'white', strokeWidth: 1.2 }}
                                position={{ x: 130, y: 450 }}
                            />
                        </RadarChart>
                    </ResponsiveContainer>
                    <p style={{ marginTop: 0, marginBottom: 5 }}>
                        Total Players Off-Racing: {this.state.offraceRadarTotal.percentage}%
                    </p>
                    <p style={{ margin: 0 }}>
                        <small>({this.state.offraceRadarTotal.fraction})</small>
                    </p>
                </div>

                <div id="pie">
                    {sortedRaces.map(race => (
                        <div id={`${race}`} className="pie-chart">
                            <PieChart width={200} height={200}>
                                <Pie
                                    data={pieData[race]}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={90}
                                    innerRadius={65}
                                    paddingAngle={0}
                                >
                                    {pieRaces[race].map(raceCell => (
                                        <Cell stroke={colours[raceCell]} strokeWidth={1} fill={coloursLight[raceCell]} fillOpacity={0.2} />
                                    ))}
                                </Pie>

                                <Tooltip
                                    contentStyle={tooltipStyle}
                                    itemStyle={{ color: 'hsl(0, 0%, 47%)', fontWeight: 400 }}
                                    position={{ x: 46, y: 77 }}
                                    isAnimationActive={false}
                                    separator=""
                                    formatter={(value, name) => [
                                        `${value}% of ${race} Off-Race as ${name}`, '',
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
                            <tr>
                                <td>
                                    <button
                                        style={{
                                            borderRadius: '15px 0 0 0',
                                            borderTop: '1px solid white',
                                            borderLeft: '1px solid white',
                                        }}
                                        onClick={() => this.changeLeague('all', 'pie')}
                                        className={`${ifActive('all', 'pie')}`}
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
                                        onClick={() => this.changeLeague('grandmaster', 'pie')}
                                        className={`${ifActive('grandmaster', 'pie')}`}
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
                                        onClick={() => this.changeLeague('master', 'pie')}
                                        className={`${ifActive('master', 'pie')}`}
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
                                        onClick={() => this.changeLeague('diamond', 'pie')}
                                        className={`${ifActive('diamond', 'pie')}`}
                                    >
                                        D
                                    </button>
                                </td>
                            </tr>
                        </table>
                    </div>

                    <div id="league2">
                        <table>
                            <tr>
                                <td>
                                    <button
                                        style={{
                                            borderRadius: '15px 0 0 0',
                                            borderTop: '1px solid white',
                                            borderLeft: '1px solid white',
                                        }}
                                        onClick={() => this.changeLeague('platinum', 'pie')}
                                        className={`${ifActive('platinum', 'pie')}`}
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
                                        onClick={() => this.changeLeague('gold', 'pie')}
                                        className={`${ifActive('gold', 'pie')}`}
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
                                        onClick={() => this.changeLeague('silver', 'pie')}
                                        className={`${ifActive('silver', 'pie')}`}
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
                                        onClick={() => this.changeLeague('bronze', 'pie')}
                                        className={`${ifActive('bronze', 'pie')}`}
                                    >
                                        B
                                    </button>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </section>
        );  
    }
}
