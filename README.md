# Understanding react 16.3 Context API

## The Data Store (AppProvider.js)

You must create context with `React.createContext()` and then the component is a normal stateful component that simply wraps `{this.props.children}` in the variable we set with `React.createContext()` (i.e. `AppContext`);

Since we are passing state down through props, you can either manually pass each method created in the component as props, or you can create a methods object to store your methods in which will be passed with state and can be accessed on `context.methods`

The Context API allows us to make AJAX calls from within the our provider without needing extra packages like `redux-thunk`

```js
import React, { Component } from 'react';
import axios from 'axios';
export const AppContext = React.createContext();


export default class AppProvider extends Component {
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


