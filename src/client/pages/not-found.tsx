import * as React from 'react';
import { Grid } from 'semantic-ui-react';

export const NotFoundPage: React.SFC =
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
                        <h1>404</h1>
                        <h2>Page not Found</h2>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>;