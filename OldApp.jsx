import { Component } from 'react';
import {
    AreaChart,
    Area,
    PieChart,
    Pie,
    Cell,
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from 'recharts';
import './App.css';

// customized tooltip
class CustomTooltip extends Component {
    render() {
        if (this.props.label === undefined || this.props.payload.length === 0) {
            return (
                <div id="tooltip">
                    <p>Loading...</p>
                </div>
            );
        }

        if ('names' in this.props) {
            const active = {
                'all.value': false,
                'protoss.value': false,
                'terran.value': false,
                'zerg.value': false,
                'random.value': false,
            };
            this.props.names.forEach((name) => {
                active[`${name.toLowerCase()}.value`] = true;
            });

            const activePayload = [];
            this.props.payload.forEach((payload) => {
                if (active[payload.name]) {
                    activePayload.push(payload);
                }
            });
            return (
                <div id="tooltip">
                    <p><b>{`${Number(this.props.label) - 50}-${Number(this.props.label) + 50}`}</b></p>
                    {this.props.names.map((name, index) => (
                        <p><span>{`${activePayload[index].value}%`}</span> of <span style={{ color: activePayload[index].color }}>{`${name}`}</span> players</p>
                    ))}
                </div>
            );
        } else if (this.props.payload.length > 1) {
            return (
                <div id="tooltip">
                    <ul>
                        {this.props.payload.map(info => (
                            <li>
                                <svg height="10" width="10">
                                    <circle cx="5" cy="5" r="5" fill={info.color} />
                                </svg>
                                &nbsp; {info.value}%
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
        return (
            <div id="tooltip">
                <p><b>{`${this.props.payload[0].value}%`}</b> of the Population played <b>{`<${this.props.label + 1}`}</b> Games</p>
            </div>
        );
    }
}

export default class OldApp extends Component {
    constructor() {
        super();
        this.state = {
            mmrData: {
                all: [
                    { all: { value: 0 }, bin: 0 },
                ],
            },
            offracePieData: { grandmaster: [{ name: 'Loading', value: 0 }] },
            activityData: [{ games: 0, proportion: 0 }],
            offraceRadarData: [{
                league: 'grandmaster',
                protoss: 0,
                zerg: 0,
                terran: 0,
                random: 0,
            }],

            offraceRadarTotal: 0,
            active: 'mmr',
            currentLeaguePie: 'all',
            currentLeague: 'all',
            allRace: 1,
            protoss: 0,
            terran: 0,
            zerg: 0,
            random: 0,

            strokeSize: {
                all: 22,
                grandmaster: 82,
                master: 33,
                diamond: 39,
                platinum: 48,
                gold: 57,
                silver: 49,
                bronze: 58,
            },

            activeCell: 'allRace',
        };
        this.changeRace = this.changeRace.bind(this);
        this.changeChart = this.changeChart.bind(this);
    }

    componentDidMount() {
        this.parseFiles();
        document.title = 'StarCraft II Ladder';
    }

    async parseFiles() {
        // console.log('parsing file');
        const responses = [];
        const files = [
            'mmr-dist.json',
            'games-played-dist.json',
            'offrace-pie-dist.json',
            'offrace-radar-dist.json',
        ];
        let mmr;
        let activity;
        let offraceRadar;
        let offracePie;

        const getFiles = (fileList) => {
            files.forEach((file) => {
                const xmlhttp = new XMLHttpRequest();
                xmlhttp.open('GET', file, false);
                xmlhttp.onload = () => {
                    if (xmlhttp.status === 200) {
                        const response = JSON.parse(xmlhttp.responseText);
                        responses.push(response);
                    }
                };
                xmlhttp.send();
            });
        };

        await getFiles(files);

        await this.setState({
            mmrData: responses[0],
            activityData: responses[1].data,
            offracePieData: responses[2],
            offraceRadarData: responses[3].data,
            offraceRadarTotal: responses[3].raw,
        }, () => {
            // console.log('file reads complete');
            // console.log(this.state.mmrData);
            // console.log(this.state.activityData);
            // console.log(this.state.offracePieData);
            // console.log(this.state.offraceRadarData);
        });
    }

    changeRace(selectedRace) {
        if (this.state[selectedRace] === 1) {
            this.setState({
                [selectedRace]: 0,
            });
        } else {
            this.setState({
                [selectedRace]: 1,
            });
        }
    }

    async changeChart(name) {
        await this.setState({
            active: name,
        });
    }

    async changeLeague(selectedLeague, type = null) {
        if (type === 'pie') {
            await this.setState({
                currentLeaguePie: selectedLeague,
            }, () => {
                // console.log('new league set');
            });
        } else {
            await this.setState({
                currentLeague: selectedLeague,
            }, () => {
                // console.log('new league set');
            });
        }
    }

    render() {
        // console.log('render called');
        // console.log(this.state.offracePieData);
        // console.log(this.state.offraceRadarData);

        const allStyle = { opacity: this.state.allRace, transition: 'opacity 0.8s' };
        const protossStyle = { opacity: this.state.protoss, transition: 'opacity 0.8s' };
        const zergStyle = { opacity: this.state.zerg, transition: 'opacity 0.8s' };
        const terranStyle = { opacity: this.state.terran, transition: 'opacity 0.8s' };
        const randomStyle = { opacity: this.state.random, transition: 'opacity 0.8s' };

        let title;
        let section;

        const races = ['random', 'zerg', 'protoss', 'terran'];
        const sortedRaces = ['protoss', 'random', 'terran', 'zerg'];
        const pieRaces = {
            protoss: ['zerg', 'terran', 'random'],
            random: ['protoss', 'zerg', 'terran'],
            terran: ['protoss', 'zerg', 'random'],
            zerg: ['protoss', 'terran', 'random'],
        };

        const leagues = Object.keys(this.state.strokeSize).slice(1, -1);
        const colours = {
            allRace: 'hsl(120, 100%, 45%)',
            protoss: 'hsl(51, 100%, 50%)',
            random: 'hsl(198, 71%, 73%)',
            terran: 'red',
            zerg: 'hsl(282, 100%, 30%)',
        };

        const coloursLight = {
            allRace: 'hsl(120, 100%, 65%)',
            protoss: 'hsl(51, 100%, 70%)',
            random: 'hsl(198, 71%, 93%)',
            terran: 'hsl(0, 100%, 70%)',
            zerg: 'hsl(282, 100%, 50%)',
        };

        const ticks = [0, 5, 10, 15, 20, 25, 50,
            75, 100, 150, 200, 300, 400, 573,
        ];

        const ifActive = (line, type = null) => {
            if (this.state.currentLeaguePie === line && type === 'pie') {
                return 'active';
            } else if (this.state.currentLeague === line && type === null) {
                return 'active';
            } else if (this.state[line] === 1 && type === null) {
                return { stroke: colours[line] };
            } else if (this.state[line] === 1 && type === 'btn') {
                return 'active';
            } else if (this.state[line] === 0) {
                return '';
            }
            return '';
        };

        const getActive = () => {
            const names = [];
            Object.keys(this.state).forEach((stateName) => {
                if (this.state[stateName] === 1) {
                    if (stateName === 'allRace') {
                        names.push('All');
                    } else {
                        names.push(stateName.charAt(0).toUpperCase() + stateName.slice(1));
                    }
                }
                names.sort();
            });
            return names;
        };

        const setChart = (name) => {
            if (this.state.active === name) {
                return 'active';
            }
            return '';
        };

        if (this.state.active === 'mmr') {
            title = (
                <h1>MMR Distribution</h1>
            );

            section = (
                <section id="mmr">
                    <div id="chart">
                        <ResponsiveContainer width="99%" height={640}>
                            <LineChart data={this.state.mmrData[this.state.currentLeague]}>
                                <XAxis stroke="hsl(0, 0%, 47%)" dataKey="bin" label={{ value: 'MMR', dy: 14, fill: 'hsl(0, 0%, 47%)' }} />
                                <YAxis
                                    stroke="hsl(0, 0%, 47%)"
                                    label={{
                                        value: 'Percentage of Selected Population (%)', angle: -90, dx: -10, fill: 'hsl(0, 0%, 47%)',
                                    }}
                                />
                                <CartesianGrid horizontal={false} vertical={false} />
                                <Tooltip content={<CustomTooltip names={getActive()} />} cursor={{ stroke: 'hsla(0, 0%, 0%, 0.8)', strokeWidth: this.state.strokeSize[this.state.currentLeague] }} />

                                <Line type="monotone" dataKey="all.value" stroke={colours.allRace} strokeWidth={2} style={allStyle} dot={false} activeDot={ifActive('allRace')} />
                                <Line type="monotone" dataKey="protoss.value" stroke={colours.protoss} strokeWidth={2} style={protossStyle} dot={false} activeDot={ifActive('protoss')} />
                                <Line type="monotone" dataKey="random.value" stroke={colours.random} strokeWidth={2} style={randomStyle} dot={false} activeDot={ifActive('random')} />
                                <Line type="monotone" dataKey="terran.value" stroke={colours.terran} strokeWidth={2} style={terranStyle} dot={false} activeDot={ifActive('terran')} />
                                <Line type="monotone" dataKey="zerg.value" stroke={colours.zerg} strokeWidth={2} style={zergStyle} dot={false} activeDot={ifActive('zerg')} />
                            </LineChart>
                        </ResponsiveContainer>

                        <div id="race" className="controls">
                            <button onClick={() => this.changeRace('allRace')} className={`${ifActive('allRace', 'btn')}`}>
                                All
                            </button>

                            {races.map(race => (
                                <button onClick={() => this.changeRace(race)} className={`${ifActive(race, 'btn')}`}>
                                    {race.charAt(0).toUpperCase() + race.slice(1)}
                                </button>
                            ))}
                        </div>

                        <div id="league" className="controls">
                            <button onClick={() => this.changeLeague('all')} className={`${ifActive('all')}`}>
                                All
                            </button>

                            {leagues.map(league => (
                                <button onClick={() => this.changeLeague(league)} className={`${ifActive(league)}`}>
                                    {league.charAt(0).toUpperCase() + league.slice(1)}
                                </button>
                            ))}

                            <button onClick={() => this.changeLeague('bronze')} className={`${ifActive('bronze')}`}>
                                Bronze
                            </button>
                        </div>
                    </div>
                </section>
            );
        } else if (this.state.active === 'activity') {
            title = (
                <h1>Population Activity</h1>
            );

            section = (
                <section id="activity">
                    <ResponsiveContainer width="100%" height={640}>
                        <AreaChart data={this.state.activityData}>
                            <XAxis stroke="hsl(0, 0%, 47%)" label={{ value: 'Games Played', dy: 14, fill: 'hsl(0, 0%, 47%)' }} dataKey="games" ticks={ticks} />
                            <YAxis
                                stroke="hsl(0, 0%, 47%)"
                                label={{
                                    value: 'Percentage of Population (%)', angle: -90, dx: -10, fill: 'hsl(0, 0%, 47%)',
                                }}
                            />
                            <CartesianGrid horizontal={false} vertical={false} />
                            <Tooltip content={<CustomTooltip />} />
                            <Area type="monotone" dataKey="proportion" stroke="hsl(120, 100%, 45%)" strokeWidth={1} fill="hsla(120, 100%, 55%, 0.3)" activeDot={{ stroke: 'black', strokeWidth: 3, r: 6 }} />
                        </AreaChart>
                    </ResponsiveContainer>
                </section>
            );
        } else if (this.state.active === 'offrace') {
            title = (
                <h1>Off-Race Distribution</h1>
            );

            const pieData = this.state.offracePieData[this.state.currentLeaguePie];
            const tooltipStyle = {
                backgroundColor: 'none',
                border: 'none',
                width: 90,
                height: 25,
                whiteSpace: 'pre-line',
            };

            section = (
                <section id="offrace">
                    <div id="title">
                        <h2>All Leagues</h2>
                        <h2>League Breakdown</h2>
                    </div>
                    <div id="radar">
                        <ResponsiveContainer width={600} height={500}>
                            <RadarChart outerRadius={200} data={this.state.offraceRadarData}>
                                <PolarGrid stroke="hsl(0, 0%, 47%)" />
                                <PolarAngleAxis dataKey="league" stroke="hsl(0, 0%, 47%)" dy={5} />
                                <PolarRadiusAxis angle={90} ticks={[10, 20, 30, 40, 50, 60, 70]} domain={[0, 10]} dx={4} dy={25} stroke="hsl(0, 0%, 47%)" />
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
                                    content={<CustomTooltip totalOffrace={this.state.offraceRadarTotal} />}
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

        return (
            <div className="container">
                <header>
                    <h2>zephyrus</h2>
                    <h3>StarCraft II &nbsp;/&nbsp; Season 39 &nbsp;/&nbsp; NA Ladder</h3>
                    {title}
                    <nav>
                        <button onClick={() => this.changeChart('mmr')} className={`${setChart('mmr')}`}>MMR</button>
                        <button onClick={() => this.changeChart('activity')} className={`${setChart('activity')}`}>Activity</button>
                        <button onClick={() => this.changeChart('offrace')} className={`${setChart('offrace')}`}>Off-Racing</button>
                    </nav>
                </header>
                {section}
                <footer>
                    <p>Created by Luke Holroyd/ZephyrBlu</p>
                </footer>
            </div>
        );
    }
}
