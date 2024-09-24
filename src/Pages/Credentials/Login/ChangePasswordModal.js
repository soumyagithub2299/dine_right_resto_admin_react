import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './Modal.css';

const ChangePasswordModal = ({ isOpen, onHide, onPasswordReset }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        setError(''); // Clear any previous error
        onPasswordReset(password);
    };

    return (
        <Modal show={isOpen} onHide={onHide} centered>
            <Modal.Header>
                <Modal.Title>Reset Password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="password">
                        <Form.Label className='login-label'>New Password</Form.Label>
                        <Form.Control
                            type="password"
                            className='login-input-forpass'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <Form.Label className='login-label'>Confirm New Password</Form.Label>
                        <Form.Control
                            type="password"
                            className='login-input-forpass'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        {error && <Form.Text className='text-danger'>{error}</Form.Text>}
                    </Form.Group>
                    <Button variant="primary" type="submit" className='login-btn'>
                        Save Changes
                    </Button>
                    <div className='modal-sign-btn'>
                        <Button type="button" className='SignIn-btn'>
                            Sign In
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ChangePasswordModal;
