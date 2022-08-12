import React, {useEffect, useState} from "react";
import { useFormik } from "formik";
import {useHistory} from 'react-router-dom'
// react plugin for creating notifications over the dashboard

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Row,
    Col,
    CardImg,
    CardText,
    ModalBody,
    ModalFooter,
    Modal,
    Input
} from "reactstrap";
import axios from 'axios'
import Label from "reactstrap/es/Label";
import FormGroup from "reactstrap/es/FormGroup";

function Item({match}) {

    const history = useHistory()
    const [modalDemo, setmodalDemo] = useState(false);
    const [posts, setPosts] = useState(0);

    useEffect(() => {
        axios.get(`http://localhost:8080/inventoryItems/${match.params.id}`)
            .then(
                response => {
                setPosts(response.data)
                    console.log(response.data)
            }).then()
        console.log(match)
        },[]);

    const formik = useFormik({
        enableReinitialize : true,
        initialValues: {
            displayName: posts.displayName,
            manufacturer: posts.manufacturer,
            mfgDate : posts.mfgDate,
            expDate : posts.expDate,
            itemType : posts.itemType,
            dose : posts.dose,
            noOfItems : posts.noOfItems,
            price : posts.price,
            description : posts.description
        },
        onSubmit : values => {
            console.log('Form Data',values)
            axios.put(`http://localhost:8080/inventoryItems/update/${match.params.id}`,values)
                .then(res => {
                        history.push({
                            pathname: '/nurse/inventory'
                        })
                    }
                )
            setmodalDemo(false)
        }
    })

    console.log('Formik Values',formik.values)
        return (
            <>
                <div className="content">
                    <Row>
                        <Col md="9">
                            <h1>Update Item Details</h1>
                            <Card>
                                <CardBody>
                                    <form>
                                        <Row>
                                            <Col>
                                                <Label for="itemID" >Item ID</Label>
                                                <Input name="itemID" type="text" onChange={formik.handleChange} defaultValue={posts.itemID} placeholder="Item Name" disabled />
                                            </Col>
                                            <Col>
                                                <Label for="displayName" >Item Name</Label>
                                                <Input name="displayName" type="text" onChange={formik.handleChange} defaultValue={posts.displayName} placeholder="Item Name" />
                                            </Col>
                                            <Col>
                                                <Label for="manufacturer">Manufacturer</Label>
                                                <Input name="manufacturer" type="text" onChange={formik.handleChange} defaultValue={posts.manufacturer} placeholder="Manufacturer Name" />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Label for="mfgDate">Manufacture Date</Label>
                                                <Input type="date" placeholder="" name="mfgDate" defaultValue={posts.mfgDate} onChange={formik.handleChange} />
                                            </Col>
                                            <Col>
                                                <Label for="expDate">Expiration Date</Label>
                                                <Input type="date" placeholder="" name="expDate" defaultValue={posts.expDate} onChange={formik.handleChange} />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Label for="itemType">Item Type</Label>
                                                <Input type="select" placeholder="" name="itemType" defaultValue={posts.itemType} onChange={formik.handleChange} >
                                                    <option>Medical Equipment</option>
                                                    <option>Tablet</option>
                                                    <option>Tube</option>
                                                    <option>Other</option>
                                                </Input>
                                            </Col>
                                            <Col>
                                                <Label for="dose">Dosage</Label>
                                                <Input type="text" placeholder="" name="dose" defaultValue={posts.dose} onChange={formik.handleChange} />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Label for="price">Price</Label>
                                                <Input type="text" placeholder="" name="price" defaultValue={posts.price} onChange={formik.handleChange}/>
                                            </Col>
                                            <Col>
                                                <Label for="noOfItems">Item Inventory</Label>
                                                <Input type="text" placeholder="" name="noOfItems" defaultValue={posts.noOfItems} onChange={formik.handleChange}/>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Label for="description">Item Description</Label>
                                                <Input type="textarea" name="description" defaultValue={posts.description} onChange={formik.handleChange} />
                                            </Col>
                                        </Row>
                                        <FormGroup>
                                            <Button color="success" onClick={() => setmodalDemo(true)}>
                                                Update
                                            </Button>
                                            <Button color="danger" type='reset'>
                                                Reset Default
                                            </Button>
                                        </FormGroup>
                                        <Modal isOpen={modalDemo} >
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLabel">
                                                    Update Item
                                                </h5>
                                                <button
                                                    type="button"
                                                    className="close"
                                                    data-dismiss="modal"
                                                    aria-hidden="true"
                                                    onClick={() => setmodalDemo(false)}
                                                >
                                                    <i className="tim-icons icon-simple-remove" />
                                                </button>
                                            </div>
                                            <ModalBody>
                                                <p>To confirm the changes click Save changes or to select close</p>
                                            </ModalBody>
                                            <ModalFooter>
                                                <Button color="secondary" onClick={() => setmodalDemo(false)}>
                                                    Close
                                                </Button>
                                                <Button color="primary" onClick={formik.handleSubmit}>
                                                    Save changes
                                                </Button>
                                            </ModalFooter>
                                        </Modal>
                                    </form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </>
        );
}

export default Item;