import React, { useState } from "react";
import { useFirestore } from "react-redux-firebase";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

const GoodsControls = () => {
    const firestore = useFirestore();
    const [show, setShow] = useState(false);
    const [form, setForm] = useState({});

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [validated, setValidated] = useState(false);
    const setField = (field, value) => {
        setValidated(true)
        setForm({
            ...form,
            [field]: value
        })
    }

    const handleSubmit = (event) => {
        const formItem = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (formItem.checkValidity()) {
            setValidated(true);
            addNewGood(form);
            handleClose();
        }else{
            setValidated(false);
            event.preventDefault();
            event.stopPropagation();
        }
    };

    const addNewGood = (good) => {

        firestore
            .collection("goods")
            .add({
                name: good.name,
                weight: good.weight,
                count: good.count,
                size: {
                    width: good.width,
                    height: good.height
                },
                comments: [],
                id: Math.random().toString(36).substr(2, 9),
                createdAt: new Date()
            })
    };


    return (
        <div className="header__controls">
            <h1 className="header__controls-title">Products List:</h1>
            <Button variant="primary" onClick={handleShow}>Add</Button>

            <Modal show={show} onHide={handleClose}>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group md="4" >
                            <Form.Label>Name: </Form.Label>
                            <Form.Control
                                onChange={e => setField('name', e.target.value)}
                                required
                                type="text"
                                placeholder="Name"
                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose a name.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group md="4" >
                            <Form.Label>Count: </Form.Label>
                            <Form.Control
                                onChange={e => setField('count', e.target.value)}
                                required
                                type="number"
                                placeholder="Count"
                                min="0"
                            />
                             <Form.Control.Feedback type="invalid">
                                Please choose a count.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group md="4" >
                            <Form.Label>Weight: </Form.Label>
                            <Form.Control
                                onChange={e => setField('weight', e.target.value)}
                                required
                                type="number"
                                placeholder="Weight"
                                min="0"
                            />
                             <Form.Control.Feedback type="invalid">
                                Please choose a weight.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group md="4" >
                            <Form.Label>Size: </Form.Label>
                            <Form.Control
                                onChange={e => setField('width', e.target.value)}
                                required
                                type="number"
                                placeholder="Width"
                                min="0"
                            />
                            <Form.Control
                                onChange={e => setField('height', e.target.value)}
                                required
                                type="number"
                                placeholder="Height"
                                min="0"
                            />
                             <Form.Control.Feedback type="invalid">
                                Please choose a size.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button type="submit">Submit form</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    )
}

export default GoodsControls;
