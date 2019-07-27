import { Component, Fragment } from 'react';

export default class LeagueControls extends Component {
    static defaultProps = {
        isLeagueActive: () => {},
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

        if (this.props.chart === 'mmr') {
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
        }
    }
}
