# Understanding react 16.3 Context API

## The Data Store (ContextProvider.js)

You must create context with `React.createContext()` and then the component is a normal stateful component that simply wraps `{this.props.children}` in the variable we set with `React.createContext()` (i.e. `AppContext`);

Since we are passing state down through props, you can either manually pass each method created in the component as props, or you can create a methods object to store your methods in which will be passed with state and can be accessed on `context.methods`

The Context API allows us to make AJAX calls from within the our provider without needing extra packages like `redux-thunk`

```js
import React, { Component } from 'react';
import axios from 'axios';

//the context gets exported so we can import it into the components where we need global state
export const AppContext = React.createContext();


export default class ContextProvider extends Component {
    constructor(){
        super()
// the state is all we pass so, we just need to put any values we want attached to the child components props into state.

// optionally you can use a methods object so you can send all the methods with state, or you would just need to pass the methods individually through prop naming and passing
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

 
//this.props.children will allow us to display anything that gets wrapped with our ContextProvider while also sending the state as a value of our provider. State gets attached to props and can be accessed by any consumer within the component tree that is wrapped by the provider


//technically the consumer will search for the closest provider but if you have just one provider than it will search for your only provider
    render() {
        return  <AppContext.Provider value={this.state}>
                     {this.props.children}
                </AppContext.Provider>
    }
}
```

##  The Provider (index.js)

Any app that is looking to use values from the global state (i.e. the state in `ContextProvider.js`) must have a consumer, the consumer looks for the closest provider in the componenet tree so it is possible to have mulitples providers in a single app.

In this example we simply wrap our App component with the ContextProvider and then we access our values using a function with a default context parameter, this context parameter is an object that contains all of the values we pass down as props in our Context Provider

```js
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import ContextProvider from './context/ContextProvider';
import './index.css';
import App from './App';

ReactDOM.render(

<BrowserRouter>
    <ContextProvider>
        <App />
    </ContextProvider>
</BrowserRouter>    
, document.getElementById('root'));

```

##  The Consumer (Home.js)

Any component that needs to use values from the global state (i.e. `ContextProvider.js`) needs to import the `AppContext` method from the `ContextProvider.js` file. Any portion of our app that needs the global state will call `AppContext.Consumer` and then a use a function with the global state passed in as a value, in the instance it gets attached the `context` variable.

```js
import React, { Component } from 'react';
import { AppContext } from '../context/ContextProvider';

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

