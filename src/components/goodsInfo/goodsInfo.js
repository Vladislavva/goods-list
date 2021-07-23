import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
    useParams
} from "react-router-dom";
import { useFirestoreConnect } from "react-redux-firebase";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import { useFirestore } from "react-redux-firebase";
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";


const GoodsInfo = () => {
    useFirestoreConnect({
        collection: `goods`,
        storeAs: "goods",
    });
    const firestore = useFirestore();
    const { id } = useParams();
    const goods = useSelector((state) => state.firestore.data.goods);


    const [validated, setValidated] = useState(false);
    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value
        })
    }
    const [form, setForm] = useState({
        name: '',
        comment: ''
    });

    const handleSubmit = (event) => {
        const formItem = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (formItem.checkValidity()) {
            setValidated(false);
            addComment()
            setForm({
                name: '',
                comment: ''
            })
        }
    };
    const addComment = () => {
        firestore
            .collection("goods")
            .doc(id)
            .update(
                { comments: [...goods[id].comments, form] },
            )
    }
    return (
        <>
            {goods &&
                <div className="goodInfo">
                    <Button variant="outline-primary"> <Link to="/">Back To List </Link></Button>
                    <div className="goodInfo__header">
                        <h1>Product Name: {goods[id].name}</h1>
                        <img width="100" height="111" alt="product img" src='https://i.postimg.cc/85RHTX88/seryy-svetlyy-fon-tochki.jpg'></img>
                        <div className="goodInfo-data">
                            <div>Weight: {goods[id].weight}</div>
                            <div>Count: {goods[id].count}</div>
                            <div>Size: {goods[id].size.width} * {goods[id].size.height}</div>
                        </div>
                    </div>
                    <div className="goodInfo__addComments">
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Form.Group controlId="formFile" className="form">
                                <Form.Label>Name:</Form.Label>
                                <Form.Control
                                    onChange={e => setField('name', e.target.value)}
                                    required
                                    type="text"
                                    placeholder="Name"
                                    value={form.name}
                                />
                                <Form.Label>Comment:</Form.Label>

                                <Form.Control
                                    onChange={e => setField('comment', e.target.value)}
                                    required
                                    as="textarea" rows={3}
                                    placeholder="Comment"
                                    value={form.comment}
                                />
                            </Form.Group>

                            <Button type="submit">Send</Button>
                        </Form>
                    </div>
                    <div className="goodInfo__comments">
                        {goods &&
                            goods[id].comments.map((comment, ids) => {
                                return (
                                    <Card style={{ width: '30rem', margin: '10px' }} key={ids}>
                                        <Card.Body>
                                            <Card.Title>{comment.name}</Card.Title>
                                            <Card.Text>
                                                <span>{comment.comment}</span>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                )
                            })
                        }
                    </div>
                </div>
            }
        </>
    )

}

export default GoodsInfo;