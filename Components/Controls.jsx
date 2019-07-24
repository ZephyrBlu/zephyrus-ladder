import { Component, Fragment } from 'react';

export default class Controls extends Component {
    constructor() {
        super();

        this.changeLeague = this.changeLeague.bind(this);
        this.isLineActive = this.props.
    }

    changeLeague() {

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

        if (this.props.chart === 'mmr') {
            if (this.props.type === 'race') {
                return (
                    <Fragment>
                        <button
                            onClick={() => this.changeRace('allRace')}
                            className={`${ifActive('allRace', 'btn')}`}
                        >
                            All
                        </button>

                        {races.map(race => (
                            <button
                                onClick={() => this.changeRace(race)}
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
                        onClick={() => this.changeLeague('all')}
                        className={`${ifActive('all')}`}
                    >
                        All
                    </button>

                    {leagues.map(league => (
                        <button
                            onClick={() => this.changeLeague(league)}
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
