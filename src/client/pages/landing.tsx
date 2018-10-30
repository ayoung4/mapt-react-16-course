import * as React from 'react';
import { Grid, Menu, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export const LandingPage: React.SFC =
    () =>
        <div id='landing-page'>
            <Menu size='massive'>
                <Container>
                    <Menu.Menu>
                        <Menu.Item as={Link} to='/'>Connector</Menu.Item>
                    </Menu.Menu>
                    <Menu.Menu position='right' size='massive'>
                        <Menu.Item as={Link} to='/login'>Log In</Menu.Item>
                        <Menu.Item as={Link} to='/signup'>Sign Up</Menu.Item>
                    </Menu.Menu>
                </Container>
            </Menu>
            <Grid container style={{ minHeight: '800px', height: '80%' }}>
                <Grid.Row textAlign='center' verticalAlign='middle'>
                    <Grid.Column style={{
                        minHeight: '60%',
                        minWidth: '300px',
                        width: '500px',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                    }}>
                        <h1>Connector</h1>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>;