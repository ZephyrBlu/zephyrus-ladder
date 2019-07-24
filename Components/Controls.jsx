import { Component, Fragment } from 'react';

export default class Controls extends Component {
    constructor(props) {
        super(props);

        this.isLineActive = this.props.isLineActive.bind(this);
        this.handleLeagueChange = this.handleLeagueChange.bind(this);
        this.handleRaceSelect = this.handleRaceSelect.bind(this);
    }

    // add logic for league change
    handleLeagueChange(e) {
        this.props.onLeagueChange(e.target.value);
    }

    // add logic for race selection
    handleRaceSelect(e) {
        this.props.onRaceSelect(e.target.value);
    }

    // this.props.id = '<id of div>'
    // this.props.chart = '<pie, mmr, activity>'
    // this.props.type = '<race, league>'
    render() {
        const races = [
            'Protoss',
            'Terran',
            'Zerg',
            'Random',
        ];

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
        const lineState = this.props.lineState;

        if (this.props.chart === 'mmr') {
            if (this.props.type === 'race') {
                return (
                    <Fragment>
                        <button
                            onClick={() => this.handleRaceSelect('allRace')}
                            className={`${ifActive('allRace', 'btn')}`}
                        >
                            All
                        </button>

                        {races.map(race => (
                            <button
                                onClick={() => this.handleRaceSelect(race)}
                                className={`${ifActive(race, 'btn')}`}
                            >
                                {race}
                            </button>
                        ))}
                    </Fragment>
                );
            }

            return (
                <div id={this.props.id} className="controls">
                    <button
                        onClick={() => this.handleLeagueChange('all')}
                        className={`${ifActive('all')}`}
                    >
                        All
                    </button>

                    {leagues.map(league => (
                        <button
                            onClick={() => this.handleLeagueChange(league)}
                            className={`${ifActive(league)}`}
                        >
                            {league}
                        </button>
                    ))}
                </div>
            );
        }

        return (
            <div id="pie">
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
                                    className={`${ifActive('all', 'pie')}`}
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
                                    className={`${ifActive('grandmaster', 'pie')}`}
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
                                    className={`${ifActive('master', 'pie')}`}
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
                                    className={`${ifActive('diamond', 'pie')}`}
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
                                    className={`${ifActive('platinum', 'pie')}`}
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
                                    className={`${ifActive('gold', 'pie')}`}
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
                                    className={`${ifActive('silver', 'pie')}`}
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
                                    className={`${ifActive('bronze', 'pie')}`}
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
