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

        return (
            <div id="league" className="controls">
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
                                    className={`${this.isLeagueActive('all', 'pie')}`}
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
                                    className={`${this.isLeagueActive('grandmaster', 'pie')}`}
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
                                    className={`${this.isLeagueActive('master', 'pie')}`}
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
                                    className={`${this.isLeagueActive('diamond', 'pie')}`}
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
                                    className={`${this.isLeagueActive('platinum', 'pie')}`}
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
                                    className={`${this.isLeagueActive('gold', 'pie')}`}
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
                                    className={`${this.isLeagueActive('silver', 'pie')}`}
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
                                    className={`${this.isLeagueActive('bronze', 'pie')}`}
                                >
                                    B
                                </button>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        );
    }
}
