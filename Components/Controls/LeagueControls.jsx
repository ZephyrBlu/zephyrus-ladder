import { Component, Fragment } from 'react';
import './LeagueControls.css';
import './Controls.css';

const LeagueControls = (props) => {
    const handleLeagueChange = (selectedLeague) => {
        props.onLeagueChange(selectedLeague);
    };

    const isLeagueActive = (league) => {
        if (props.currentLeague === league) {
            return 'active';
        }
        return '';
    };

    const leagues = [
        'All',
        'Grandmaster',
        'Master',
        'Diamond',
        'Platinum',
        'Gold',
        'Silver',
        'Bronze',
    ];

    switch (props.chart) {
        case 'winrate':
        case 'mmr':
            return (
                <div id="league" className="controls">
                    {leagues.map((league, index) => (
                        <button
                            key={index}
                            onClick={() => handleLeagueChange(league)}
                            className={`${isLeagueActive(league)}`}
                        >
                            {league}
                        </button>
                    ))}
                </div>
            );

        default:
            return (
                <p>No chart specified</p>
            );
    }
};

export default LeagueControls;
