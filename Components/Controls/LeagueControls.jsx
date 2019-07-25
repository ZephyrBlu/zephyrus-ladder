import { Component, Fragment } from 'react';

export default class LeagueControls extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentLeague: this.props.currentLeague,
        };

        this.handleLeagueChange = this.handleLeagueChange.bind(this);
    }

    // add support for direction prop: horizontal or vertical

    // add logic for league change
    handleLeagueChange(e) {
        this.props.onLeagueChange(e.target.value);
    }

    isLeagueActive(league) {
        if (this.state.currentLeague === league) {
            return 'active';
        }
        return '';
    }

    // this.props.id = '<id of div>'
    // this.props.chart = '<pie, mmr, activity>'
    render() {
        const leagues = [
            'Grandmaster',
            'Master',
            'Diamond',
            'Platinum',
            'Gold',
            'Silver',
            'Bronze',
        ];

        const currentLeague = this.props.currentLeague;

        if (this.props.chart === 'mmr') {
            return (
                <div id={this.props.id} className="controls">
                    <button
                        onClick={() => this.handleLeagueChange('all')}
                        className={`${isLeagueActive('all')}`}
                    >
                        All
                    </button>

                    {leagues.map(league => (
                        <button
                            onClick={() => this.handleLeagueChange(league)}
                            className={`${isLeagueActive(league)}`}
                        >
                            {league}
                        </button>
                    ))}
                </div>
            );
        }

        return (
            <div id={this.props.id}>
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
                                    className={`${isLeagueActive('all', 'pie')}`}
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
                                    className={`${isLeagueActive('grandmaster', 'pie')}`}
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
                                    className={`${isLeagueActive('master', 'pie')}`}
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
                                    className={`${isLeagueActive('diamond', 'pie')}`}
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
                                    className={`${isLeagueActive('platinum', 'pie')}`}
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
                                    className={`${isLeagueActive('gold', 'pie')}`}
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
                                    className={`${isLeagueActive('silver', 'pie')}`}
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
                                    className={`${isLeagueActive('bronze', 'pie')}`}
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
