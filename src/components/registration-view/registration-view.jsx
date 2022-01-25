import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './registration-view.scss';
import { Form, Button, Container, Row, Col, Card, CardGroup } from 'react-bootstrap';

export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [usernameErr, setUsernameErr] = useState('');
    const [password, setPassword] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [email, setEmail] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [birthday, setBirthday] = useState('');
    const [favMovies, setfavMovies] = useState('');

    const validate = () => {
        let isReq = true;
        if (!username) {
            setUsernameErr('Username Required');
            isReq = false;
        } else if (username.length < 3) {
            setUsernameErr('Username must be at least 3 characters long');
            isReq = false;
        }
        if (!password) {
            setPasswordErr('Password Required');
            isReq = false;
        } else if (password.length < 5) {
            setPasswordErr('Password must be at least 5 characters long');
            isReq = false;
        }
        if (!email) {
            setEmailErr('Email Required');
            isReq = false;
        } else if (email.indexOf('@') === -1) {
            setEmailErr('Email Address Not Valid')
            isReq = false
        }
        return isReq
    }






    const handleSubmit = (e) => {
        e.preventDefault();
        const isReq = validate();
        if (isReq) {
            axios.post('https://invoker1337.herokuapp.com/users', {
                Username: username,
                Password: password,
                Email: email,
                Birthday: birthday,
            })
                .then(response => {
                    const data = response.data;
                    console.log(data);
                    alert('Registration successful - please login!');
                    window.open('/', '_self');
                })
                .catch(response => {
                    console.error(response);
                    alert('Unable to register!')
                });
        };
    }

    return (


        <Container>
            <Row>
                <Col></Col>
                <Col>
                    <Card style={{ marginTop: 100, marginBottom: 100, width: 300 }}>
                        <Card.Body>
                            <Card.Title style={{ textAlign: 'center' }} >Register Here!</Card.Title>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Username:</Form.Label>
                                    <Form.Control type="text" value={username} placeholder="Enter Username..."
                                        onChange={e => setUsername(e.target.value)} />
                                    {usernameErr && <p>{usernameErr}</p>}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Email:</Form.Label>
                                    <Form.Control type="email" value={email} placeholder="Enter Email Address..."
                                        onChange={e => setEmail(e.target.value)} />
                                    {emailErr && <p>{emailErr}</p>}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Password:</Form.Label>
                                    <Form.Control type="password" value={password} placeholder="Password must be 5 characters..."
                                        onChange={e => setPassword(e.target.value)} />
                                    {passwordErr && <p>{passwordErr}</p>}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Birthday:</Form.Label>
                                    <Form.Control type="date" value={birthday}
                                        onChange={e => setBirthday(e.target.value)} />
                                </Form.Group>
                                <Button variant="primary" type="submit" onClick={handleSubmit}>
                                    Submit!
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
                <Col></Col>
            </Row>
        </Container>

    )
};

RegistrationView.propTypes = {
    register: PropTypes.shape({
        username: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        birthday: PropTypes.string.isRequired,
    }),
    // onRegistration: PropTypes.func.isRequired,
};