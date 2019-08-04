import { Fragment } from 'react';
import './Tooltip.css';

const CustomTooltip = (props) => {
    let content = (
        <p>Loading...</p>
    );

    if (props.payload !== undefined && props.payload.length !== 0) {
        switch (props.chart) {
            case 'mmr': {
                const active = {
                    'all.value': 0,
                    'protoss.value': 0,
                    'terran.value': 0,
                    'zerg.value': 0,
                    'random.value': 0,
                };

                props.names.forEach((name) => {
                    active[`${name.toLowerCase()}.value`] = 1;
                });

                const activePayload = [];
                props.payload.forEach((payload) => {
                    if (active[payload.name]) {
                        activePayload.push(payload);
                    }
                });

                content = (
                    <Fragment>
                        <p>
                            <b>
                                {`${Number(props.label) - 50}-${Number(props.label) + 50}`}
                            </b>
                        </p>
                        {props.names.map((name, index) => (
                            <p key={index}>
                                <span>{`${activePayload[index].value}%`}</span> of&nbsp;
                                <span style={{ color: activePayload[index].color }}>
                                    {`${name}`}
                                </span>
                                &nbsp;players
                            </p>
                        ))}
                    </Fragment>
                );
                break;
            }

            case 'activity':
                content = (
                    <Fragment>
                        <p>
                            <b>{`${props.payload[0].value}%`}</b> of the Population
                            played <b>{`<${props.label + 1}`}</b> Games
                        </p>
                    </Fragment>
                );
                break;

            case 'radar':
                content = (
                    <Fragment>
                        <ul>
                            {props.payload.map((info, index) => (
                                <li key={index}>
                                    <svg height="10" width="10">
                                        <circle cx="5" cy="5" r="5" fill={info.color} />
                                    </svg>
                                    &nbsp; {info.value}%
                                </li>
                            ))}
                        </ul>
                    </Fragment>
                );
                break;

            case 'winrate': {
                const active = {
                    PvP: 0,
                    PvT: 0,
                    PvZ: 0,
                    PvR: 0,
                    TvP: 0,
                    TvT: 0,
                    TvZ: 0,
                    TvR: 0,
                    ZvP: 0,
                    ZvT: 0,
                    ZvZ: 0,
                    ZvR: 0,
                    RvP: 0,
                    RvT: 0,
                    RvZ: 0,
                    RvR: 0,
                };

                props.names.forEach((name) => {
                    active[name] = 1;
                });

                const activePayload = [];
                props.payload.forEach((payload) => {
                    if (active[payload.name.slice(0, -9)]) {
                        activePayload.push(payload);
                    }
                });

                console.log(activePayload);

                content = (
                    <Fragment>
                        {props.names.map((name, index) => (
                            <p key={index}>
                                {`${name}: ${activePayload[index].value}%`}
                            </p>
                        ))}
                    </Fragment>
                );
                break;
            }

            default:
                break;
        }
    }

    return (
        <div id="tooltip">
            {content}
        </div>
    );
};

export default CustomTooltip;
