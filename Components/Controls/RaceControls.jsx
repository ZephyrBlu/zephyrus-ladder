import { Component, Fragment } from 'react';

export default class RaceControls extends Component {
    constructor(props) {
        super(props);

        this.isLineActive = this.props.isLineActive.bind(this);
        this.handleRaceSelect = this.handleRaceSelect.bind(this);
    }

    // add support for direction prop: horizontal or vertical

    // add logic for race selection
    handleRaceSelect(e) {
        this.props.onRaceSelect(e.target.value);
    }

    // this.props.id = '<id of div>'
    // this.props.chart = '<pie, mmr, activity>'
    render() {
        const races = [
            'Protoss',
            'Terran',
            'Zerg',
            'Random',
        ];

        const lineState = this.props.lineState;

        if (this.props.chart === 'mmr') {
            return (
                <Fragment>
                    <button
                        onClick={() => this.handleRaceSelect('allRace')}
                        className={`${isLineActive('allRace', 'btn')}`}
                    >
                        All
                    </button>

                    {races.map(race => (
                        <button
                            onClick={() => this.handleRaceSelect(race)}
                            className={`${isLineActive(race, 'btn')}`}
                        >
                            {race}
                        </button>
                    ))}
                </Fragment>
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
                                    className={`${isLineActive('all', 'pie')}`}
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
                                    className={`${isLineActive('grandmaster', 'pie')}`}
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
                                    className={`${isLineActive('master', 'pie')}`}
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
                                    className={`${isLineActive('diamond', 'pie')}`}
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
                                    className={`${isLineActive('platinum', 'pie')}`}
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
                                    className={`${isLineActive('gold', 'pie')}`}
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
                                    className={`${isLineActive('silver', 'pie')}`}
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
                                    className={`${isLineActive('bronze', 'pie')}`}
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
