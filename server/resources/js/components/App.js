import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Table from './Table';

export default class App extends Component {
    render() {
        return (
            <div className="app">
                <h1>List of Members:</h1>
                <Table />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
