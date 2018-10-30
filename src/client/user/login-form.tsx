import * as React from 'react';
import { Form, Button } from 'semantic-ui-react';

export const LoginForm: React.SFC
    = () =>
        <Form>
            <Form.Input placeholder='Email Address' type='password' />
            <Form.Input placeholder='Password' type='password' />
            <Button fluid content='Sign In'/>
        </Form>
