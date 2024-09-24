import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FaAngleLeft } from "react-icons/fa6";
import './Modal.css'; 

const EmailModal = ({ isOpen, onHide, onEmailSubmit }) => {
    const [email, setEmail] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onEmailSubmit(email); 
    };

    return (
        <Modal show={isOpen} onHide={onHide} centered>
            <Modal.Header >
                <Modal.Title><FaAngleLeft /> Oops! Forgot Password?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="email">
                        <Form.Label className='login-label'>Email</Form.Label>
                        <Form.Control
                            type="email"
                            className='login-input-forpass'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <button variant="primary" type="submit" className='login-btn'>
                        Submit
                    </button>
                    <div className='modal-sign-btn'>
                        <button type="button" className='SignIn-btn'>
                            Sign In
                        </button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EmailModal;
