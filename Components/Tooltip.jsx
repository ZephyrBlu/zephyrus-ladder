import { Component, Fragment } from 'react';
import './Tooltip.css';

const CustomTooltip = (props) => {
    let content = (
        <p>Loading...</p>
    );

    if (props.payload !== undefined && props.payload.length !== 0) {
        switch (props.chart) {
            case 'mmr': {
                const active = {
                    'all.value': false,
                    'protoss.value': false,
                    'terran.value': false,
                    'zerg.value': false,
                    'random.value': false,
                };

                props.names.forEach((name) => {
                    active[`${name.toLowerCase()}.value`] = true;
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
