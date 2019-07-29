import { Component, useState } from 'react';
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from 'recharts';
import RaceControls from '../Components/Controls/RaceControls';
import LeagueControls from '../Components/Controls/LeagueControls';
import CustomTooltip from '../Components/Tooltip';
import './CSS/MmrTab.css';

const MmrTab = (props) => {
    const [currentLeague, setCurrentLeague] = useState('All');
    const [lineState, setLineState] = useState({
        All: 1,
        Protoss: 0,
        Terran: 0,
        Zerg: 0,
        Random: 0,
    });

    const handleLeagueChange = (selectedLeague) => {
        setCurrentLeague(selectedLeague);
    };

    const handleRaceSelect = (selectedRace) => {
        let state;
        if (lineState[selectedRace]) {
            state = 0;
        } else {
            state = 1;
        }

        setLineState(prevState => ({
            ...prevState,
            [selectedRace]: state,
        }));
    };

    const baseLineStyle = {
        opacity: null,
        transition: 'opacity 0.8s',
    };

    const strokeSize = {
        All: 22,
        Grandmaster: 82,
        Master: 33,
        Diamond: 39,
        Platinum: 48,
        Gold: 57,
        Silver: 49,
        Bronze: 58,
    };

    const colours = {
        All: 'hsl(120, 100%, 45%)',
        Protoss: 'hsl(51, 100%, 50%)',
        Random: 'hsl(198, 71%, 73%)',
        Terran: 'red',
        Zerg: 'hsl(282, 100%, 30%)',
    };

    const races = ['All', 'Protoss', 'Terran', 'Zerg', 'Random'];

    const createStyle = (line) => {
        const lineStyle = Object.assign({}, baseLineStyle);
        lineStyle.opacity = lineState[line];
        return lineStyle;
    };

    const isLineActive = (line, returnType = null) => {
        if (lineState[line]) {
            switch (returnType) {
                case 'bool':
                    return true;

                case 'num':
                    return 1;

                case 'style':
                    return { stroke: colours[line] };

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
        Object.keys(lineState).forEach((line) => {
            if (isLineActive(line, 'bool')) {
                active.push(line);
            }
        });
        return active;
    };

    return (
        <section id="mmr">
            <div id="chart">
                <ResponsiveContainer width="99%" height={640}>
                    <LineChart data={props.data[currentLeague.toLowerCase()]}>
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
                                strokeWidth: strokeSize[currentLeague],
                            }}
                        />

                        {races.map((race, index) => (
                            <Line
                                key={`line-${index}`}
                                type="monotone"
                                dataKey={`${race.toLowerCase()}.value`}
                                stroke={colours[race]}
                                strokeWidth={2}
                                style={createStyle(race)}
                                dot={false}
                                activeDot={isLineActive(race, 'style')}
                            />
                        ))}
                    </LineChart>
                </ResponsiveContainer>

                <RaceControls
                    id="race"
                    chart="mmr"
                    isLineActive={isLineActive}
                    lineState={lineState}
                    onRaceSelect={handleRaceSelect}
                />

                <LeagueControls
                    id="league"
                    chart="mmr"
                    onLeagueChange={handleLeagueChange}
                    currentLeague={currentLeague}
                />
            </div>
        </section>
    );
};

export default MmrTab;
