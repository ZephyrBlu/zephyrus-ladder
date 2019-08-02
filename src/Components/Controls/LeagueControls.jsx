import { Fragment } from 'react';
import './LeagueControls.css';
import './Controls.css';

const LeagueControls = (props) => {
    const handleLeagueChange = (selectedLeague) => {
        props.onLeagueChange(selectedLeague, props.chart);
    };

    const isLeagueActive = (league) => {
        if (props.leagueKey) {
            if (props.currentLeague[props.leagueKey] === league) {
                return 'active';
            }
            return '';
        }

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
};

export default LeagueControls;
