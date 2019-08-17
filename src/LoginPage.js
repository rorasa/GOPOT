import React, { Component } from 'react';
import { Alert, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { withCookies } from 'react-cookie';

import NavigationBar from './Navbar';

class LoginPage extends Component{
    constructor(props){
        super(props);

        this.state = {
            username: "",
            password: "",
            showAlert: false
        }
    }
    
    login = ()=>{
        if(this.state.username==""){
            this.setState({
                showAlert: true
            });
            return;
        }

        this.props.cookies.set('auth_username', this.state.username);
        window.location="/dashboard/us"
    }

    onUsernameChange = (e)=>{
        this.setState({
            username: e.target.value
        });
    }

    onPasswordChange = (e)=>{
        this.setState({
            password: e.target.value
        });
    }

    render(){
        return(
            <div>
                <NavigationBar/>

                <Card className="LoginBox">
                    <CardBody>
                        <CardTitle><h2>Login</h2></CardTitle>
                        <Form>
                            {(this.state.showAlert)?<Alert color="danger">Wrong username or password</Alert>:null}
                            <FormGroup>
                                <Label>Username</Label>
                                <Input type="text" value={this.state.username} name="username" id="username" onChange={this.onUsernameChange}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Password</Label>
                                <Input type="password" value={this.state.password} name="password" id="password" onChange={this.onPasswordChange}/>
                            </FormGroup>
                        </Form>
                        <Button color="primary" onClick={this.login}>Login</Button>
                    </CardBody>
                </Card>

                
                
            </div>
        )
    }
}

export default withCookies(LoginPage);