import { Component, useState } from 'react';
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
import Tippy from '@tippy.js/react';
import CustomTooltip from '../Components/Tooltip';
import './CSS/OffraceTab.css';
import './CSS/OffraceTab-Radar.css';
import './CSS/OffraceTab-Pie.css';

const OffraceTab = (props) => {
    const [currentLeague, setCurrentLeague] = useState('All');

    const changeLeague = (selectedLeague) => {
        setCurrentLeague(selectedLeague);
    };

    const isLeagueActive = (league) => {
        if (currentLeague === league) {
            return 'active';
        }
        return '';
    };

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

    const data = props.data.pie[currentLeague.toLowerCase()];

    return (
        <section id="offrace">
            <div id="title">
                <span>
                    <h2>All Leagues</h2>
                    <Tippy
                        content="Shows the distribution of players who off-race, for all races, across all leagues"
                        size="regular"
                        arrow="true"
                    >
                        <svg
                            id="radar-help"
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
                <span>
                    <h2>League Breakdown</h2>
                    <Tippy
                        content={`Shows the breakdown of off-race choice from ${currentLeague} players`}
                        size="regular"
                        arrow="true"
                    >
                        <svg
                            id="pie-help"
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
            </div>
            <div id="radar">
                <ResponsiveContainer width={600} height={500}>
                    <RadarChart outerRadius={200} data={props.data.radar.data}>
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
                    Total Players Off-Racing: {props.data.radar.raw.percentage}%
                </p>
                <p style={{ margin: 0 }}>
                    <small>({props.data.radar.raw.fraction})</small>
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

                        <Tippy
                            content={`Off-race choice of ${race} players in ${currentLeague}`}
                            arrow="true"
                        >
                            <svg
                                id={`${race.toLowerCase()}-pie-help`}
                                xmlns="http://www.w3.org/2000/svg"
                                x="0px"
                                y="0px"
                                width="25"
                                height="25"
                                viewBox="0 0 172 172"
                                style={{
                                    fill: '#000000',
                                    position: 'relative',
                                    top: '3px',
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
                    </div>
                ))}

                <div id="controls">
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
                                        onClick={() => changeLeague('All')}
                                        className={`${isLeagueActive('All')}`}
                                    >
                                        All
                                    </button>
                                </td>
                                <td>
                                    <button
                                        style={{
                                            borderTop: '1px solid white',
                                        }}
                                        onClick={() => changeLeague('Grandmaster')}
                                        className={`${isLeagueActive('Grandmaster')}`}
                                    >
                                        GM
                                    </button>
                                </td>
                                <td>
                                    <button
                                        style={{
                                            borderTop: '1px solid white',
                                        }}
                                        onClick={() => changeLeague('Master')}
                                        className={`${isLeagueActive('Master')}`}
                                    >
                                        M
                                    </button>
                                </td>
                                <td>
                                    <button
                                        style={{
                                            borderRadius: '0 15px 0 0',
                                            borderTop: '1px solid white',
                                            borderRight: '1px solid white',
                                        }}
                                        onClick={() => changeLeague('Diamond')}
                                        className={`${isLeagueActive('Diamond')}`}
                                    >
                                        D
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <button
                                        style={{
                                            borderRadius: '0 0 0 15px',
                                            borderBottom: '1px solid white',
                                            borderLeft: '1px solid white',
                                        }}
                                        onClick={() => changeLeague('Bronze')}
                                        className={`${isLeagueActive('Bronze')}`}
                                    >
                                        B
                                    </button>
                                </td>
                                <td>
                                    <button
                                        style={{
                                            borderBottom: '1px solid white',
                                        }}
                                        onClick={() => changeLeague('Silver')}
                                        className={`${isLeagueActive('Silver')}`}
                                    >
                                        S
                                    </button>
                                </td>
                                <td>
                                    <button
                                        style={{
                                            borderBottom: '1px solid white',
                                        }}
                                        onClick={() => changeLeague('Gold')}
                                        className={`${isLeagueActive('Gold')}`}
                                    >
                                        G
                                    </button>
                                </td>
                                <td>
                                    <button
                                        style={{
                                            borderRadius: '0 0 15px 0',
                                            borderBottom: '1px solid white',
                                            borderRight: '1px solid white',
                                        }}
                                        onClick={() => changeLeague('Platinum')}
                                        className={`${isLeagueActive('Platinum')}`}
                                    >
                                        P
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default OffraceTab;
