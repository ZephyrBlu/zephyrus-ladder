import { Component, Fragment } from 'react';
import MmrTab from './MmrTab';
import ActivityTab from './ActivityTab';
// import OffraceTab from './OffraceTab';

export default class App extends Component {
    constructor() {
        super();

        this.state = {
            activeTab: 'mmr',
            data: {},
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
        xmlhttp.onload = () => {
            if (xmlhttp.status === 200) {
                response = JSON.parse(xmlhttp.responseText);
            }
        };
        await xmlhttp.open('GET', 'data.json');
        xmlhttp.send();

        await this.setState({
            // make sure data in json file is
            // in correct format to allow
            // reducing to data: response
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
                title = 'MMR';
                section = (<MmrTab data={this.state.data.mmr} />);
                break;

            case 'activity':
                title = 'Activity';
                section = (<ActivityTab data={this.state.data.activity} />);
                break;

                // case 'offrace':
                //     title = 'Off-Race';
                //     section = (<OffraceTab data={this.state.data.offrace} />);
                //     break;
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
                            className={`${this.isActive('mmr')}`}
                        >
                            MMR
                        </button>
                        <button
                            onClick={() => this.changeTab('activity')}
                            className={`${this.isActive('activity')}`}
                        >
                            Activity
                        </button>
                        <button
                            onClick={() => this.changeTab('offrace')}
                            className={`${this.isActive('offrace')}`}
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
