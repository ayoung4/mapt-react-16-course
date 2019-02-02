import * as React from 'react';
import { Container, Grid, Menu, Segment, Header, List, Image } from 'semantic-ui-react';
import { Box, Page } from 'react-layout-components';
import logo from '../logo.svg';

export const LandingPage = () => (
    <Page>
        <Box fit row>
            <Menu size='huge' inverted>
                <Container>
                    <Menu.Item>Mapt React 16 Course</Menu.Item>
                    <Menu.Menu position='right'>
                        <Menu.Item>Log In</Menu.Item>
                        <Menu.Item>Sign Up</Menu.Item>
                    </Menu.Menu>
                </Container>
            </Menu>
            <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Image src={logo} />
                    <Header as='h2' textAlign='center'>Semantic UI React App</Header>
                </Grid.Column>
            </Grid>
            <Segment inverted vertical style={{ padding: '5em 0em' }}>
                <Container>
                    <Grid divided inverted stackable>
                        <Grid.Row>
                            <Grid.Column width={3}>
                                <Header inverted as='h4' content='About' />
                                <List link inverted>
                                    <List.Item as='a'>Sitemap</List.Item>
                                    <List.Item as='a'>Contact Us</List.Item>
                                    <List.Item as='a'>Religious Ceremonies</List.Item>
                                    <List.Item as='a'>Gazebo Plans</List.Item>
                                </List>
                            </Grid.Column>
                            <Grid.Column width={3}>
                                <Header inverted as='h4' content='Services' />
                                <List link inverted>
                                    <List.Item as='a'>Banana Pre-Order</List.Item>
                                    <List.Item as='a'>DNA FAQ</List.Item>
                                    <List.Item as='a'>How To Access</List.Item>
                                    <List.Item as='a'>Favorite X-Men</List.Item>
                                </List>
                            </Grid.Column>
                            <Grid.Column width={7}>
                                <Header as='h4' inverted>
                                    Footer Header
                            </Header>
                                <p>
                                    Extra space for a call to action inside the footer that could help re-engage users.
                                </p>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </Segment>
        </Box>
    </Page>
);
