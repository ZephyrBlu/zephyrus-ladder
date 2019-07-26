import { Component, Fragment } from 'react';

export default class CustomTooltip extends Component {
    render() {
        let content = (
            <p>Loading...</p>
        );

        if (this.props.payload !== undefined && this.props.payload.length !== 0) {
            switch (this.props.chart) {
                case 'mmr': {
                    const active = {
                        'all.value': false,
                        'protoss.value': false,
                        'terran.value': false,
                        'zerg.value': false,
                        'random.value': false,
                    };

                    this.props.names.forEach((name) => {
                        active[`${name.toLowerCase()}.value`] = true;
                    });

                    const activePayload = [];
                    this.props.payload.forEach((payload) => {
                        if (active[payload.name]) {
                            activePayload.push(payload);
                        }
                    });

                    content = (
                        <Fragment>
                            <p>
                                <b>
                                    {`${Number(this.props.label) - 50}-${Number(this.props.label) + 50}`}
                                </b>
                            </p>
                            {this.props.names.map((name, index) => (
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
                                <b>{`${this.props.payload[0].value}%`}</b> of the Population
                                played <b>{`<${this.props.label + 1}`}</b> Games
                            </p>
                        </Fragment>
                    );
                    break;

                case 'pie':
                    content = (
                        <Fragment>
                            <ul>
                                {this.props.payload.map((info, index) => (
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
    }
}

CustomTooltip.defaultProps = {};
