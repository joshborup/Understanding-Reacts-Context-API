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