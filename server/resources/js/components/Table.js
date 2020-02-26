import React, { Component } from 'react';
import './Table.css'

export default class Table extends Component {

    constructor(props) {
        super(props);
        this.state= {
            filterValue:'',
            members: []
        }

        this.retrieveMembers('')
            .then(data => this.setState({
                ...this.state,
                members: data
            }));
    }

    fetchTable() {
        return this.state.members.map((member, index) => {
            const {id, firstname, surname, email, gender, joined_date} = member
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{firstname}</td>
                    <td>{surname}</td>
                    <td>{email}</td>
                    <td>{gender}</td>
                    <td>{joined_date}</td>
                </tr>
            )
        })
    }

    filterMembers(event) {
        this.setState({
            ...this.state,
            filterValue: event.target.value
        });

        this.retrieveMembers(event.target.value)
            .then(data => this.setState({
                ...this.state,
                members: data
            }));
    }

    retrieveMembers(query) {
        let formData = new FormData();
        formData.append('query', query);

        return fetch('/api/member', {body: formData, method: "POST"})
                .then(response => response.json());
    }

    render() {
        return(
            <div>
                <input 
                    type='text'
                    placeholder='Filter members...'
                    className="mb-2"
                    value={this.state.filterValue} 
                    onChange={this.filterMembers.bind(this)}/>

                <table id='members-table' className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Firstname</th>
                            <th scope="col">Surname</th>
                            <th scope="col">Email</th>
                            <th scope="col">Gender</th>
                            <th scope="col">Joined Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.fetchTable()}
                    </tbody>
                </table>
            </div>
        )
    }
} 