import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Table from './Table';

export default class App extends Component {
    render() {
        return (
            <div className="m-4">
                <h1>Members</h1>
                <Table />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
