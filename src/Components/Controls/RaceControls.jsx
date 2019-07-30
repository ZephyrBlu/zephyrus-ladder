import { Fragment } from 'react';
import './RaceControls.css';
import './Controls.css';

const RaceControls = (props) => {
    const handleRaceSelect = (selectedRace) => {
        props.onRaceSelect(selectedRace);
    };

    const races = [
        'All',
        'Protoss',
        'Terran',
        'Zerg',
        'Random',
    ];

    if (props.chart === 'mmr') {
        return (
            <div id="race" className="controls">
                {races.map((race, index) => (
                    <button
                        key={index}
                        onClick={() => handleRaceSelect(race)}
                        className={`${props.isLineActive(race)}`}
                    >
                        {race}
                    </button>
                ))}
            </div>
        );
    }
};

export default RaceControls;
