import React, { Component } from 'react';
import { AppContext } from '../context/ContextProvider';

export default class About extends Component {
    render() {
        return (
            <div>
            <div>About</div>
            <AppContext.Consumer>
                    {(context) => {
                        let students = context.students.map(student => {
                            return <div key={student.id}>
                                        {student.name}
                                    </div>
                        })
                        return (<div>
                                {students}
                                number: {context.test}
                                    <button onClick={context.methods.inc}>Increment</button>
                                    <button onClick={context.methods.dec}>Decrement</button>
                                </div>)
                        }}
                </AppContext.Consumer>
           </div>
       
        );
    }
}