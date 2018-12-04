import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import logo from './logo.svg';
import './index.css';

export const App = () => (
    <div id="App">
        <Container textAlign='center'>
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1>Semantic UI React App</h1>
            </header>
        </Container>
    </div>
);

export default App;
