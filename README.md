# Understanding react 16.3 Context API

## The Data Store (ContextProvider.js)

You must create context with `React.createContext()` and then the component is a normal stateful component that simply wraps `{this.props.children}` in the variable we set with `React.createContext()` (i.e. `AppContext`);

Since we are passing state down through props, you can either manually pass each method created in the component as props, or you can create a methods object to store your methods in which will be passed with state and can be accessed on `context.methods`

The Context API allows us to make AJAX calls from within the our provider without needing extra packages like `redux-thunk`

```js
import React, { Component } from 'react';
import axios from 'axios';
export const AppContext = React.createContext();


export default class ContextProvider extends Component {
    constructor(){
        super()
        this.state = {
            test: 0,
            students: [],
            methods:{
                inc: () => {
                    this.setState((prevState) => {
                        return {
                            test: prevState.test + 1
                        }
                    })
                },
                dec: () => {
                    this.setState((prevState) => {
                        return {
                            test: prevState.test - 1
                        }
                    })
                },
                getStudents: () => {
                    axios.get('/api/test').then(response => {
                        this.setState({
                            students: response.data
                        })
                    })
                }
            }
            
        }
    }

 

    render() {
        return  <AppContext.Provider value={this.state}>
                     {this.props.children}
                </AppContext.Provider>
    }
}
```

## The Consumer (Home.js)

Any app that is looking to use values from the global state (i.e. the state in `ContextProvider.js`) must have a consumer, the consumer looks for the closest provider in the componenet tree so it is possible to have mulitples providers in a single app.

In this example we simply wrap our App component with the ContextProvider and then we access our values using a function with a default context parameter, this context parameter is an object that contains all of the values we pass down as props in our Context Provider

```js

<AppContext.Consumer>
    {(context) => {
        let students = context.students.map(student => {
            return <div key={student.id}>
                        {student.name}
                    </div>
        })
        return <div>
                    {students}
                        Number: {context.test}
                        <button onClick={context.methods.inc}>Increment</button>
                        <button onClick={context.methods.dec}>Decrement</button>
                        <button onClick={context.methods.getStudents}>Get Students</button>
                </div>
    }}
</AppContext.Consumer>
    

```

## The Provider (index.js)

any app that is looking for 

```js

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
```