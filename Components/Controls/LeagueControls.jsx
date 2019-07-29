import { Component, Fragment } from 'react';
import './LeagueControls.css';
import './Controls.css';

export default class LeagueControls extends Component {
    static defaultProps = {
        onLeagueChange: () => {},
        currentLeague: 'All',
    }

    constructor(props) {
        super(props);

        this.isLeagueActive = this.isLeagueActive.bind(this);
        this.handleLeagueChange = this.handleLeagueChange.bind(this);
    }

    handleLeagueChange(selectedLeague) {
        this.props.onLeagueChange(selectedLeague);
    }

    isLeagueActive(league) {
        if (this.props.currentLeague === league) {
            return 'active';
        }
        return '';
    }

    render() {
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

        switch (this.props.chart) {
            case 'winrate':
            case 'mmr':
                return (
                    <div id="league" className="controls">
                        {leagues.map((league, index) => (
                            <button
                                key={index}
                                onClick={() => this.handleLeagueChange(league)}
                                className={`${this.isLeagueActive(league)}`}
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
    }
}
