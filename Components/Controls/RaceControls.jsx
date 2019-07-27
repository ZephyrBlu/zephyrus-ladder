import { Component, Fragment } from 'react';

export default class RaceControls extends Component {
    static defaultProps = {
        isLineActive: () => {},
        lineState: {
            All: 1,
            Protoss: 0,
            Terran: 0,
            Zerg: 0,
            Random: 0,
        },
    }

    constructor(props) {
        super(props);

        this.isLineActive = props.isLineActive.bind(this);
        this.handleRaceSelect = this.handleRaceSelect.bind(this);
    }

    handleRaceSelect(selectedRace) {
        this.props.onRaceSelect(selectedRace);
    }

    render() {
        const races = [
            'All',
            'Protoss',
            'Terran',
            'Zerg',
            'Random',
        ];

        if (this.props.chart === 'mmr') {
            return (
                <div id="race" className="controls">
                    {races.map((race, index) => (
                        <button
                            key={index}
                            onClick={() => this.handleRaceSelect(race)}
                            className={`${this.isLineActive(race)}`}
                        >
                            {race}
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
                                    className={`${this.isLineActive('all', 'pie')}`}
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
                                    className={`${this.isLineActive('grandmaster', 'pie')}`}
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
                                    className={`${this.isLineActive('master', 'pie')}`}
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
                                    className={`${this.isLineActive('diamond', 'pie')}`}
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
                                    className={`${this.isLineActive('platinum', 'pie')}`}
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
                                    className={`${this.isLineActive('gold', 'pie')}`}
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
                                    className={`${this.isLineActive('silver', 'pie')}`}
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
                                    className={`${this.isLineActive('bronze', 'pie')}`}
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
