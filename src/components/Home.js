import React, { Component } from 'react';
import AppProvider, { AppContext } from '../context/ContextProvider';

export default class Home extends Component {
    render() {
        return (
            <div>
            <div>Home</div>
                <AppContext.Consumer>
                    {(context) => {
                        let students = context.students.map(student => {
                            return <div key={student.id}>
                                        {student.name}
                                    </div>
                        })
                        return (<div>
                                {students}
                                Number: {context.test}
                                <button onClick={context.methods.inc}>Increment</button>
                                <button onClick={context.methods.dec}>Decrement</button>
                                <button onClick={context.methods.getStudents}>Get Students</button>
                                </div>)
                        }}
                </AppContext.Consumer>
           </div>
        );
    }
}