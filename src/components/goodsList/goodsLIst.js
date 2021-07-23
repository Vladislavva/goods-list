import React from "react";
import { useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import GoodsControls from '../goodsControl/goodsControl';
import { Link } from "react-router-dom";

const GoodsList = () => {
    useFirestoreConnect({
        collection: `goods`,
        storeAs: "goods",
    });
    const goods = useSelector((state) => state.firestore.data.goods);

    return (
        <div>
            <GoodsControls />

            {goods &&
                <div className="goodsList">
                    {
                        Object.keys(goods).map((id) => {
                            return (
                                <Card style={{ width: '30rem', margin: '10px' }} key={id}>
                                    <Card.Img variant="top" src="https://i.postimg.cc/85RHTX88/seryy-svetlyy-fon-tochki.jpg" />
                                    <Card.Body>
                                        <Card.Title>{goods[id].name}</Card.Title>
                                        <ListGroup className="list-group-flush">
                                            <ListGroup.Item>Weight: {goods[id].weight}</ListGroup.Item>
                                            <ListGroup.Item>Count: {goods[id].count}</ListGroup.Item>
                                            <ListGroup.Item>Size: {goods[id].size.width} * {goods[id].size.height}</ListGroup.Item>
                                        </ListGroup>
                                        <Button className="float-right" variant="outline-primary">
                                            <Link to={`/info/${id}`}>More</Link>
                                        </Button>
                                    </Card.Body>
                                </Card>
                            )
                        })
                    }
                </div>
            }
        </div>
    );
};

export default GoodsList;
