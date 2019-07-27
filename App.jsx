import { Component, Fragment } from 'react';
import MmrTab from './Tabs/MmrTab';
import ActivityTab from './Tabs/ActivityTab';
import OffraceTab from './Tabs/OffraceTab';
import './App.css';

export default class App extends Component {
    constructor() {
        super();

        this.state = {
            activeTab: 'mmr',
            data: {
                mmr: {
                    all: [
                        { all: { value: 0 }, bin: 0 },
                    ],
                },
                activity: [{ games: 0, proportion: 0 }],
                offrace: {
                    pie: { grandmaster: [{ name: 'Loading', value: 0 }] },
                    radar: [{
                        league: 'grandmaster',
                        protoss: 0,
                        zerg: 0,
                        terran: 0,
                        random: 0,
                    }],
                },
            },
        };

        this.changeTab = this.changeTab.bind(this);
        this.isTabActive = this.isTabActive.bind(this);
    }

    componentDidMount() {
        this.getFiles();
        document.title = 'StarCraft II Ladder';
    }

    async getFiles() {
        const xmlhttp = new XMLHttpRequest();
        let response;

        xmlhttp.open('GET', 'data.json', false);
        xmlhttp.onload = () => {
            if (xmlhttp.status === 200) {
                response = JSON.parse(xmlhttp.responseText);
            }
        };
        xmlhttp.send();

        await this.setState({
            data: response,
        });
    }

    async changeTab(tabName) {
        await this.setState({
            activeTab: tabName,
        });
    }

    isTabActive(tabName) {
        if (this.state.activeTab === tabName) {
            return 'active';
        }
        return '';
    }

    render() {
        let title;
        let section;
        switch (this.state.activeTab) {
            case 'mmr':
                title = (<h1>MMR Distribution</h1>);
                section = (
                    <MmrTab
                        data={this.state.data.mmr}
                    />
                );
                break;

            case 'activity':
                title = (<h1>Population Activity</h1>);
                section = (
                    <ActivityTab
                        data={this.state.data.activity}
                    />
                );
                break;

            case 'offrace':
                title = (<h1>Off-Race Distribution</h1>);
                section = (
                    <OffraceTab
                        data={this.state.data.offrace}
                    />
                );
                break;

            default:
                break;
        }

        return (
            <div className="container">
                <header>
                    <h2>zephyrus</h2>
                    <h3>StarCraft II &nbsp;/&nbsp; Season 39 &nbsp;/&nbsp; NA Ladder</h3>
                    {title}
                    <nav>
                        <button
                            onClick={() => this.changeTab('mmr')}
                            className={`${this.isTabActive('mmr')}`}
                        >
                            MMR
                        </button>
                        <button
                            onClick={() => this.changeTab('activity')}
                            className={`${this.isTabActive('activity')}`}
                        >
                            Activity
                        </button>
                        <button
                            onClick={() => this.changeTab('offrace')}
                            className={`${this.isTabActive('offrace')}`}
                        >
                            Off-Racing
                        </button>
                    </nav>
                </header>
                {section}
                <footer>
                    <p>Created by Luke Holroyd/ZephyrBlu</p>
                </footer>
            </div>
        );
    }
}
