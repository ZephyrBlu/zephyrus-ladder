import { useState } from 'react';
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from 'recharts';
import Tippy from '@tippy.js/react';
import CustomTooltip from '../Components/Tooltip';
import LeagueControls from '../Components/Controls/LeagueControls';
import './CSS/WinrateTab.css';
import './CSS/WinrateTab-Grid.css';
import './CSS/WinrateTab-Weekly.css';

const WinrateTab = (props) => {
    const [dataType, setDataType] = useState({
        grid: 'all',
        chart: 'all',
    });
    const [currentLeague, setCurrentLeague] = useState({
        grid: 'All',
        chart: 'Grandmaster',
    });
    const [matchupState, setMatchupState] = useState({
        PvP: 1,
        PvT: 0,
        PvZ: 0,
        PvR: 0,
        TvP: 0,
        TvT: 1,
        TvZ: 0,
        TvR: 0,
        ZvP: 0,
        ZvT: 0,
        ZvZ: 1,
        ZvR: 0,
        RvP: 0,
        RvT: 0,
        RvZ: 0,
        RvR: 0,
    });
    const [activeChart, setActiveChart] = useState('grid');

    const handleLeagueChange = (selectedLeague, type) => {
        setCurrentLeague(prevState => ({
            ...prevState,
            [type]: selectedLeague,
        }));
    };

    const changeDataType = (type) => {
        if (dataType[type] === 'all') {
            setDataType(prevState => ({
                ...prevState,
                [type]: 'league',
            }));
        } else {
            setDataType(prevState => ({
                ...prevState,
                [type]: 'all',
            }));
        }
    };

    const changeMatchupState = (selectedMatchup) => {
        if (matchupState[selectedMatchup]) {
            setMatchupState(prevState => ({
                ...prevState,
                [selectedMatchup]: 0,
            }));
        } else {
            setMatchupState(prevState => ({
                ...prevState,
                [selectedMatchup]: 1,
            }));
        }
    };

    const changeChart = (chart) => {
        setActiveChart(chart);
    };

    const isChartActive = (chart) => {
        if (chart === activeChart) {
            return 'active';
        }
        return '';
    };

    const races = ['Protoss', 'Terran', 'Zerg', 'Random'];
    const currentWeeklyData = props.data.weekly[dataType.chart][currentLeague.chart];
    const currentAllData = props.data.all[dataType.grid][currentLeague.grid];
    const monthlyContent = `Match-up winrates from the most recent month.
    Match-ups are read left-to-right, with the winrate being based on
    the performance of the left race`;

    // change to dynamically creating
    // colours based on key * 5
    const colours = {
        '-10': 'hsl(0, 100%, 30%)',
        '-9': 'hsl(0, 100%, 40%)',
        '-8': 'hsl(0, 100%, 45%)',
        '-7': 'hsl(0, 100%, 50%)',
        '-6': 'hsl(0, 100%, 55%)',
        '-5': 'hsl(0, 100%, 60%)',
        '-4': 'hsl(0, 100%, 65%)',
        '-3': 'hsl(0, 100%, 70%)',
        '-2': 'hsl(0, 100%, 75%)',
        '-1': 'hsl(0, 100%, 80%)',
        0: 'hsl(0, 0%, 85%)',
        1: 'hsl(120, 100%, 80%)',
        2: 'hsl(120, 100%, 75%)',
        3: 'hsl(120, 100%, 70%)',
        4: 'hsl(120, 100%, 65%)',
        5: 'hsl(120, 100%, 60%)',
        6: 'hsl(120, 100%, 55%)',
        7: 'hsl(120, 100%, 50%)',
        8: 'hsl(120, 100%, 45%)',
        9: 'hsl(120, 100%, 40%)',
        10: 'hsl(120, 100%, 30%)',
    };

    const raceColours = {
        All: 'hsl(120, 100%, 45%)',
        Protoss: 'hsl(51, 100%, 50%)',
        Random: 'hsl(198, 71%, 73%)',
        Terran: 'red',
        Zerg: 'hsl(282, 100%, 30%)',
    };

    const baseLineStyle = {
        opacity: null,
        transition: 'opacity 0.8s',
    };

    const muConvert = {
        P: 'Protoss',
        T: 'Terran',
        Z: 'Zerg',
        R: 'Random',
    };

    const getColour = (value) => {
        if (value === 0) {
            return 'black';
        }

        let v = value - 50;

        // clean up logic for readability
        if (v < 0) {
            if (v < -10) {
                v = '-10';
            } else {
                v = Math.floor(v).toString();
            }
        } else if (v > 10) {
            v = 10;
        } else {
            v = Math.ceil(v);
        }

        const colour = colours[v];
        return colour;
    };

    const checkDataType = (race, innerRace, type) => {
        if (race === innerRace) {
            if (dataType[type] === 'league' || currentLeague[type] === 'All') {
                return 'null';
            }
        }
        return '';
    };

    const createStyle = (matchup) => {
        const lineStyle = Object.assign({}, baseLineStyle);
        lineStyle.opacity = matchupState[matchup];
        return lineStyle;
    };

    const isLineActive = (line, returnType = null) => {
        const mainRace = muConvert[line[0]];
        if (matchupState[line]) {
            switch (returnType) {
                case 'bool':
                    return true;

                case 'num':
                    return 1;

                case 'style':
                    return { stroke: raceColours[mainRace] };

                default:
                    return 'active';
            }
        }

        switch (returnType) {
            case 'style':
            case 'bool':
                return false;

            case 'num':
                return 0;

            default:
                return '';
        }
    };

    const getActiveLines = () => {
        const active = [];
        Object.keys(matchupState).forEach((line) => {
            if (isLineActive(line, 'bool')) {
                active.push(line);
            }
        });
        return active;
    };

    let chart;

    switch (activeChart) {
        case 'grid':
            chart = (
                <section id="winrate-monthly">
                    <span id="winrate-monthly-title">
                        <h2>Monthly Winrates</h2>
                        <Tippy
                            content={monthlyContent}
                            size="regular"
                            arrow="true"
                        >
                            <svg
                                id="winrate-monthly-help"
                                xmlns="http://www.w3.org/2000/svg"
                                x="0px"
                                y="0px"
                                width="25"
                                height="25"
                                viewBox="0 0 172 172"
                                style={{
                                    fill: '#000000',
                                    position: 'relative',
                                    top: '5px',
                                    right: '-5px',
                                }}
                            >
                                <g
                                    fill="none"
                                    fillRule="nonzero"
                                    stroke="none"
                                    strokeWidth="1"
                                    strokeLinecap="butt"
                                    strokeLinejoin="miter"
                                    strokeMiterlimit="10"
                                    strokeDasharray=""
                                    strokeDashoffset="0"
                                    fontFamily="none"
                                    fontWeight="none"
                                    fontSize="none"
                                    textAnchor="none"
                                    style={{ mixBlendMode: 'normal' }}
                                >
                                    <path
                                        d="M0,172v-172h172v172z"
                                        fill="none"
                                    />
                                    <g fill="#787878">
                                        <g id="surface1">
                                            <path
                                                d="M86,21.5c-35.56738,0 -64.5,28.93262 -64.5,64.5c0,35.56739 28.93262,64.5 64.5,64.5c35.56739,0 64.5,-28.93261 64.5,-64.5c0,-35.56738 -28.93261,-64.5 -64.5,-64.5zM86,32.25c29.75146,0 53.75,23.99854 53.75,53.75c0,29.75146 -23.99854,53.75 -53.75,53.75c-29.75146,0 -53.75,-23.99854 -53.75,-53.75c0,-29.75146 23.99854,-53.75 53.75,-53.75zM86,53.75c-11.8208,0 -21.5,9.6792 -21.5,21.5h10.75c0,-6.00488 4.74512,-10.75 10.75,-10.75c6.00489,0 10.75,4.74512 10.75,10.75c0,4.11523 -2.64551,7.76856 -6.55078,9.07031l-2.18359,0.67188c-4.38818,1.44873 -7.39062,5.64795 -7.39062,10.24609v6.88672h10.75v-6.88672l2.18359,-0.67187c8.27246,-2.75049 13.94141,-10.60303 13.94141,-19.31641c0,-11.8208 -9.6792,-21.5 -21.5,-21.5zM80.625,107.5v10.75h10.75v-10.75z"
                                            />
                                        </g>
                                    </g>
                                </g>
                            </svg>
                        </Tippy>
                    </span>
                    <table>
                        <tbody>
                            <tr>
                                <td id="league">
                                    {currentLeague.grid}
                                </td>
                                {races.map(race => (
                                    <td key={`${race}-horiz`} className="winrate-heading-horiz">
                                        {race}
                                    </td>
                                ))}
                            </tr>
                            {races.map(race => (
                                <tr key={`${race}-row`}>
                                    <td key={`${race}-vert`} className="winrate-heading-vert">
                                        {race}
                                    </td>
                                    {races.map(innerRace => (
                                        <Tippy
                                            key={`tippy-${race}-${innerRace}`}
                                            content={
                                                `${race[0]}v${innerRace[0]}:
                                                ${currentAllData[`${race[0]}v${innerRace[0]}`][0]}%
                                                (${currentAllData[`${race[0]}v${innerRace[0]}`][1]})`
                                            }
                                            arrow="true"
                                            size="large"
                                        >
                                            <td
                                                key={`${race}-value-vert`}
                                                className={
                                                    `${checkDataType(race, innerRace, 'grid')} values`
                                                }
                                                style={{
                                                    backgroundColor: getColour(currentAllData[`${race[0]}v${innerRace[0]}`][0]),
                                                }}
                                            />
                                        </Tippy>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <span className="all-controls">
                        <Tippy
                            content={`Counts all matches played by ${currentLeague.grid} players`}
                            arrow="true"
                        >
                            <h4>All</h4>
                        </Tippy>
                        <Tippy
                            content={`Only counts matches played between 2 ${currentLeague.grid} players`}
                            arrow="true"
                        >
                            <h4>League</h4>
                        </Tippy>
                        <label className="switch">
                            <input type="checkbox" onClick={() => changeDataType('grid')} />
                            <span className="slider round" />
                        </label>
                        <LeagueControls
                            id="league"
                            chart="grid"
                            leagueKey="grid"
                            onLeagueChange={handleLeagueChange}
                            currentLeague={currentLeague}
                        />
                    </span>
                </section>
            );
            break;

        case 'chart':
            chart = (
                <section id="winrate-weekly">
                    <ResponsiveContainer width="99%" height={600}>
                        <LineChart data={currentWeeklyData}>
                            <XAxis dataKey="bin" />
                            <YAxis domain={[40, 60]} />
                            <CartesianGrid
                                // horizontal={false}
                                vertical={false}
                            />
                            <Tooltip
                                content={
                                    <CustomTooltip
                                        chart="winrate"
                                        matchups={getActiveLines()}
                                    />
                                }
                                cursor={{
                                    stroke: 'hsla(0, 0%, 2%, 0.8)',
                                    strokeWidth: 20,
                                }}
                            />
                            {races.map(race => (
                                races.map(innerRace => (
                                    <Line
                                        key={`winrate-weekly-${race}-${innerRace}`}
                                        type="monotone"
                                        dataKey={`${race[0]}v${innerRace[0]}.value[0]`}
                                        stroke={raceColours[`${race}`]}
                                        strokeWidth={2}
                                        style={createStyle(`${race[0]}v${innerRace[0]}`)}
                                        dot={false}
                                        activeDot={
                                            isLineActive(
                                                `${race[0]}v${innerRace[0]}`,
                                                'style',
                                            )
                                        }
                                    />
                                ))
                            ))}
                        </LineChart>
                    </ResponsiveContainer>

                    <span className="all-controls">
                        <Tippy
                            content={`Counts all matches played by ${currentLeague.chart} players`}
                            arrow="true"
                        >
                            <h4>All</h4>
                        </Tippy>
                        <Tippy
                            content={`Only counts matches played between 2 ${currentLeague.chart} players`}
                            arrow="true"
                        >
                            <h4>League</h4>
                        </Tippy>
                        <label className="switch">
                            <input type="checkbox" onClick={() => changeDataType('chart')} />
                            <span className="slider round" />
                        </label>
                        <LeagueControls
                            id="league"
                            chart="chart"
                            leagueKey="chart"
                            onLeagueChange={handleLeagueChange}
                            currentLeague={currentLeague}
                        />
                    </span>

                    <table id="matchup-controls">
                        <tbody>
                            {races.map(race => (
                                <tr key={`weekly-row-${race}`}>
                                    {races.map(innerRace => (
                                        <td key={`weekly-cell-${race}-${innerRace}`}>
                                            <button
                                                key={`weekly-button-${race}-${innerRace}`}
                                                onClick={() => changeMatchupState(`${race[0]}v${innerRace[0]}`)}
                                                className={`${isLineActive(`${race[0]}v${innerRace[0]}`)}`}
                                            >
                                                {`${race[0]}v${innerRace[0]}`}
                                            </button>
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            );
            break;

        default:
            break;
    }

    return (
        <section id="winrate">
            <nav>
                <button
                    onClick={() => changeChart('grid')}
                    className={`${isChartActive('grid')}`}
                >
                    Grid
                </button>
                <button
                    onClick={() => changeChart('chart')}
                    className={`${isChartActive('chart')}`}
                >
                    Timeline
                </button>
            </nav>
            {chart}
        </section>
    );
};

export default WinrateTab;
