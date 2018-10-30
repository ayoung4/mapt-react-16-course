import * as React from 'react';
import { Grid, Segment, Message } from 'semantic-ui-react';

import { LoginForm } from '../user/login-form';

export const LoginPage: React.SFC =
    () =>
        <div id='login-page'>
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
                            <LoginForm />
                        <Message>
                            Don't have an account? Sign up here.
                        </Message>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>;