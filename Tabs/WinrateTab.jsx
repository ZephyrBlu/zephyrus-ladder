import { Component } from 'react';
import Tippy from '@tippy.js/react';
import LeagueControls from '../Components/Controls/LeagueControls';
import './CSS/WinrateTab.css';

export default class WinrateTab extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: props.data,
            currentLeague: 'Grandmaster',
        };

        this.handleLeagueChange = this.handleLeagueChange.bind(this);
    }

    async handleLeagueChange(selectedLeague) {
        await this.setState({
            currentLeague: selectedLeague,
        });
    }

    render() {
        const races = ['Protoss', 'Terran', 'Zerg', 'Random'];

        const currentData = this.state.data.all[this.state.currentLeague];

        return (
            <section id="winrate">
                <table>
                    <tbody>
                        <tr>
                            <td id="filler" />
                            {races.map(race => (
                                <td key={`${race}-horiz`} className="winrate-heading-horiz">
                                    {race}
                                </td>
                            ))}
                        </tr>
                        {races.map(race => (
                            <tr key={`${race}-row`}>
                                <td key={`${race}-vert`} className="winrate-heading-vert">
                                    {race}
                                </td>
                                {races.map(innerRace => (
                                    <Tippy
                                        key={`tippy-${innerRace}`}
                                        content={`${race[0]}v${innerRace[0]}: ${currentData[race][innerRace][0]}% (${currentData[race][innerRace][1]})`}
                                        arrow="true"
                                    >
                                        <td key={`${race}-value-vert`} className="values" />
                                    </Tippy>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>

                <LeagueControls
                    id="league"
                    chart="winrate"
                    onLeagueChange={this.handleLeagueChange}
                    currentLeague={this.state.currentLeague}
                />
            </section>
        );
    }
}
