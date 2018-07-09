import React from 'react';
import {Route, Switch, Link } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';


export default (
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path = '/about' component={About} />
                    <Route path='/contact' component={Contact} />
                    <Route path='/' render={() => {
                        return <div>Nothing to see here, back to <Link to = '/'>Home</Link></div>
                    }}/>
                </Switch>
                )
