import { useState } from 'react';
import Tippy from '@tippy.js/react';
import LeagueControls from '../Components/Controls/LeagueControls';
import './CSS/WinrateTab.css';

const WinrateTab = (props) => {
    const [dataType, setDataType] = useState('all');
    const [currentLeague, setCurrentLeague] = useState('Grandmaster');

    const handleLeagueChange = (selectedLeague) => {
        setCurrentLeague(selectedLeague);
    };

    const changeDataType = () => {
        if (dataType === 'all') {
            setDataType('league');
        } else {
            setDataType('all');
        }
    };

    const races = ['Protoss', 'Terran', 'Zerg', 'Random'];

    const currentData = props.data[dataType][currentLeague];

    const monthlyContent = `Match-up winrates from the most recent month.
    Match-ups are read left-to-right, with the winrate being based on
    the performance of the left race`;

    const checkDataType = (race, innerRace) => {
        if (race === innerRace) {
            if (dataType === 'league') {
                return 'null';
            }
        }
        return '';
    };

    return (
        <section id="winrate">
            <span id="winrates-monthly">
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
                            {currentLeague}
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
                                    key={`tippy-${innerRace}`}
                                    content={
                                        `${race[0]}v${innerRace[0]}:
                                        ${currentData[race][innerRace][0]}%
                                        (${currentData[race][innerRace][1]})`
                                    }
                                    arrow="true"
                                >
                                    <td key={`${race}-value-vert`} className={`${checkDataType(race, innerRace)} values`} />
                                </Tippy>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            <span className="all-controls">
                <Tippy
                    content={`Counts all matches played by ${currentLeague} players`}
                    arrow="true"
                >
                    <h4>All</h4>
                </Tippy>
                <Tippy
                    content={`Only counts matches played between 2 ${currentLeague} players`}
                    arrow="true"
                >
                    <h4>League</h4>
                </Tippy>
                <label className="switch">
                    <input type="checkbox" onClick={() => changeDataType()} />
                    <span className="slider round" />
                </label>
                <LeagueControls
                    id="league"
                    chart="winrate"
                    onLeagueChange={handleLeagueChange}
                    currentLeague={currentLeague}
                />
            </span>
        </section>
    );
};

export default WinrateTab;
