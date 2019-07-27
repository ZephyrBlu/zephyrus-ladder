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
    }
}
