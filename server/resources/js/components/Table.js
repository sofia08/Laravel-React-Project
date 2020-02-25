import React, { Component } from 'react';
// import './Table.css'

export default class Table extends Component {

    constructor(props) {
        super(props);
        this.state= {
            filterValue:'',
            members: [
                {id: 1, firstname: 'Sofia', surname: 'Kalra', email: 'sofia.kalra08@gmail.com', gender: 'Female', joined_date:'2020-01-01'},
                {id: 2, firstname: 'Hayden', surname: 'Mack', email: 'sofia.kalra08@gmail.com', gender: 'Male', joined_date:'2020-02-04'},
            ]
        }
    }

    // tableHeader(){
    //     let header = Object.keys(this.state.members[0])
    //     return header.map((key, index) => {
    //         return (
    //         <th key={index}>{key.toUpperCase}</th>
    //         );
    //     })
    // }

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

        let formData = new FormData();
        formData.append('query', event.target.value);

        fetch('/api/member', {body: formData, method: "POST"})
        .then(response => response.json())
        .then(data => this.setState({
            ...this.state,
            members:data
        }));
    }

    render() {
        return(
            <div className="table">
                <input type='text' value={this.state.filterValue} onChange={this.filterMembers.bind(this)}/>
                <table id='members-table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Firstname</th>
                            <th>Surname</th>
                            <th>Email</th>
                            <th>Gender</th>
                            <th>Joined Date</th>
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