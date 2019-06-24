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
                <div className="tooltip">
                    <p>Loading...</p>
                </div>
            );
        }

        if ('names' in this.props) {
            // const colours = {
            //     All: 'hsl(120, 100%, 45%)',
            //     Protoss: 'hsl(51, 100%, 50%)',
            //     Terran: 'red',
            //     Zerg: 'hsl(282, 100%, 30%)',
            //     Random: 'hsl(198, 71%, 73%)',
            // };
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
        }
        return (
            <div id="tooltip">
                <p><b>{`${this.props.payload[0].value}%`}</b> of the Population played <b>{`<${this.props.label + 1}`}</b> Games</p>
            </div>
        );
    }
}

export default class App extends Component {
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

            active: 'mmr',
            currentLeague: 'all',
            allRace: 1,
            protoss: 0,
            terran: 0,
            zerg: 0,
            random: 0,

            strokeSize: {
                all: 22,
                grandmaster: 82,
                masters: 33,
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
        const xmlhttp = new XMLHttpRequest();
        let mmr;
        let activity;
        let offraceRadar;
        let offracePie;

        xmlhttp.open('GET', 'mmr-dist.json', false);
        xmlhttp.onload = () => {
            if (xmlhttp.status === 200) {
                mmr = JSON.parse(xmlhttp.responseText);
                // console.log('read player-dist file');
            }
        };
        xmlhttp.send();

        xmlhttp.open('GET', 'games-played-dist.json', false);
        xmlhttp.onload = () => {
            if (xmlhttp.status === 200) {
                activity = JSON.parse(xmlhttp.responseText);
                // console.log('read games-played-dist file');
            }
        };
        xmlhttp.send();

        xmlhttp.open('GET', 'offrace-pie-dist.json', false);
        xmlhttp.onload = () => {
            if (xmlhttp.status === 200) {
                offracePie = JSON.parse(xmlhttp.responseText);
                // console.log('read games-played-dist file');
            }
        };
        xmlhttp.send();

        xmlhttp.open('GET', 'offrace-radar-dist.json', false);
        xmlhttp.onload = () => {
            if (xmlhttp.status === 200) {
                offraceRadar = JSON.parse(xmlhttp.responseText);
                // console.log('read games-played-dist file');
            }
        };
        xmlhttp.send();

        await this.setState({
            mmrData: mmr,
            activityData: activity.data,
            offracePieData: offracePie,
            offraceRadarData: offraceRadar.data,
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

    async changeLeague(selectedLeague) {
        await this.setState({
            // raceData: this.state.data,
            currentLeague: selectedLeague,
        }, () => {
            // console.log('new league set');
        });
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
            if (this.state.currentLeague === line) {
                if (type === 'btn') {
                    return 'active';
                }
                return '';
            } else if (this.state[line] === 1) {
                if (type === 'btn') {
                    return 'active';
                }
                return { stroke: 'transparent', r: 4 };
            } else if (this.state[line] === 0) {
                return false;
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
                            <button onClick={() => this.changeLeague('all')} className={`first ${ifActive('all', 'btn')}`}>
                                All
                            </button>

                            {leagues.map(league => (
                                <button onClick={() => this.changeLeague(league)} className={`${ifActive(league, 'btn')}`}>
                                    {league.charAt(0).toUpperCase() + league.slice(1)}
                                </button>
                            ))}

                            <button onClick={() => this.changeLeague('bronze')} className={`last ${ifActive('bronze', 'btn')}`}>
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
                            <Area type="monotone" dataKey="proportion" stroke="hsl(120, 100%, 45%)" strokeWidth={2} fill="hsla(120, 100%, 55%, 0.35)" activeDot={{ stroke: 'black', strokeWidth: 3, r: 6 }} />
                        </AreaChart>
                    </ResponsiveContainer>
                </section>
            );
        } else if (this.state.active === 'offrace') {
            title = (
                <h1>Off-Race Distribution</h1>
            );

            const pieData = this.state.offracePieData.master;
            const tooltipStyle = {
                backgroundColor: 'none',
                border: 'none',
                width: 90,
                height: 25,
            };

            section = (
                <section id="offrace">
                    <div id="radar">
                        <ResponsiveContainer width={600} height={500}>
                            <RadarChart outerRadius={200} data={this.state.offraceRadarData}>
                                <PolarGrid stroke="hsl(0, 0%, 47%)" />
                                <PolarAngleAxis dataKey="league" stroke="hsl(0, 0%, 47%)" dy={5} />
                                <PolarRadiusAxis angle={90} domain={[0, 0.7]} dy={25} stroke="hsl(0, 0%, 47%)" />
                                {races.map(race => (
                                    <Radar
                                        name={race.charAt(0).toUpperCase() + race.slice(1)}
                                        dataKey={race}
                                        stroke={colours[race]}
                                        fill={colours[race]}
                                        fillOpacity={0.3}
                                    />
                                ))}
                                <Tooltip />
                            </RadarChart>
                        </ResponsiveContainer>
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
                                        position={{ x: 44, y: 76.5 }}
                                        isAnimationActive={false}
                                        separator=""
                                        formatter={(value, name) => [value, '']}
                                    />
                                </PieChart>

                                <svg height="25" width="25">
                                    <circle cx="12.5" cy="12.5" r="12.5" fill={colours[race]} />
                                </svg>
                            </div>
                        ))}

                        <div id="league" className="controls">
                            <button onClick={() => this.changeLeague('all')} className={`first ${ifActive('all', 'btn')}`}>
                                All
                            </button>

                            {leagues.map(league => (
                                <button onClick={() => this.changeLeague(league)} className={`${ifActive(league, 'btn')}`}>
                                    {league.charAt(0).toUpperCase() + league.slice(1)}
                                </button>
                            ))}

                            <button onClick={() => this.changeLeague('bronze')} className={`last ${ifActive('bronze', 'btn')}`}>
                                Bronze
                            </button>
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
