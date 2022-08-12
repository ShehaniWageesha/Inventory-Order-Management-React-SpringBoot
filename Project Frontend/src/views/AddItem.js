import React, {useEffect, useState} from "react";
import { useFormik } from "formik";
import * as Yup  from 'yup'
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

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;

const validationSchema = Yup.object({

    displayName: Yup.string().required('Name Required!'),
    manufacturer: Yup.string().required('Manufacturer Required!'),
    expDate: Yup.date().min(today,'Enter a date after today'),
    price: Yup.number().integer('Not Integer').min(0,'Cannot Be Negative'),
    noOfItems: Yup.number().integer('Not Integer').min(0,'Cannot Be Negative'),
    dose: Yup.number().integer('Not Integer').min(0,'Cannot Be Negative'),
    itemType: Yup.string().required('Item Type Required!')

})

function AddItem({match}) {
    var newID = null;
    const history = useHistory()
    const [posts, setPosts] = useState(0);
    const [Id, setId] = useState(newID);
    const [modalDemo, setmodalDemo] = useState(false);
    const [image, setImage] = useState('')
    const [imageURL, setImageURL] = useState('')
    const [imageName, setImageName] = useState('')
    const [imageURLValidation, setImageURLValidation] = useState(false)

    /*async function getItemsIDs() {
        const res = await axios.get(`http://localhost:8080/inventoryitems/itemIDs`)
        return res.data
    }*/

    /*useEffect( () => {
        getItemsIDs().then(res => {
            setPosts(res)
            console.log('Posts!!!!',posts)
        })
        console.log(match)
    },[]);*/

    useEffect( () => {
        axios.get(`http://localhost:8080/inventoryitems/itemIDs`)
            .then(
                response => {
                    setPosts(response.data)
                    var itemid = [];
                    var ids = [];
                    // eslint-disable-next-line no-unused-expressions
                    response.data.length ? response.data.map(obj => {
                        var id = obj.itemID.split('IT')
                        itemid.push(id[1])
                        console.log("arraysid",itemid)
                    }):null
                    console.log("arraysid",itemid)
                    console.log("maxid",Math.max(...itemid))
                    newID = 'IT'+(Math.max(...itemid)+1)
                    console.log('newid',newID)
                    setId(newID)
                    return response.data
                })
    },[]);

    function onchangeFile(e) {

        // if (URL.createObjectURL(e.target.files[0]) !== ' ') {
        if (e.target.files.length) {
            setImage(e.target.files[0])
            setImageURL(URL.createObjectURL( e.target.files[0] ))
            setImageName(e.target.files[0].name)
            setImageURLValidation(true)
        }


    }


    const formik = useFormik({
        enableReinitialize : true,
        validateOnMount : true,
        initialValues: {
            itemID: Id,
            displayName: '',
            manufacturer: '',
            mfgDate : '',
            expDate : '',
            itemType : '',
            dose : '',
            noOfItems : '',
            price : '',
            description : ''
        },
        /*validate: values => {
            let errors = {}
            if(!values.displayName) {
                errors.displayName = 'Required!'
            }
            return errors
        }*/
        validationSchema,
        onSubmit : values => {
            //console.log('Form Data',values)
            axios.post(`http://localhost:8080/inventoryItems`, {...values,file:image})
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
    console.log('Formik errors',formik.errors)
    console.log('Formik props',formik)
    console.log('Date',today)
    console.log("Posts",posts)
    console.log('newid2',Id)
    console.log('Binary file',image)
    return (
        <>
            <div className="content">
                <Row>
                    <Col sm="12" md={{ size: 10, offset: 1 }}>
                        <h1>Add New Item Details</h1>
                        <Card>
                            <CardBody>
                                <form>
                                    <Row>
                                        <Col>
                                            <Label for="itemID" >Item ID</Label>
                                            <Input name="itemID" type="text" onBlur={formik.handleBlur} onChange={formik.handleChange} defaultValue={Id} placeholder="Item ID" disabled/>
                                        </Col>
                                        <Col>
                                            <Label for="displayName" >Item Name</Label>
                                            <Input name="displayName" type="text" onBlur={formik.handleBlur} onChange={formik.handleChange} defaultValue={posts.displayName} placeholder="Item Name" />
                                            {formik.touched.displayName && formik.errors.displayName ? <div className='control-label' color='info'>{formik.errors.displayName}</div> : null}
                                        </Col>
                                        <Col>
                                            <Label for="manufacturer">Manufacturer</Label>
                                            <Input name="manufacturer" type="text" onBlur={formik.handleBlur} onChange={formik.handleChange} defaultValue={posts.manufacturer} placeholder="Manufacturer Name" />
                                            {formik.touched.manufacturer && formik.errors.manufacturer ? <div className='control-label' color='info'>{formik.errors.manufacturer}</div> : null}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Label for="mfgDate">Manufacture Date</Label>
                                            <Input type="date" placeholder="" onBlur={formik.handleBlur} name="mfgDate" defaultValue={posts.mfgDate} onChange={formik.handleChange} />
                                            {formik.touched.mfgDate && formik.errors.mfgDate ? <div className='control-label' color='info'>{formik.errors.mfgDate}</div> : null}
                                        </Col>
                                        <Col>
                                            <Label for="expDate">Expiration Date</Label>
                                            <Input type="date" placeholder="" onBlur={formik.handleBlur}  name="expDate" defaultValue={posts.expDate} onChange={formik.handleChange} />
                                            {formik.touched.expDate && formik.errors.expDate ? <div className='control-label' color='info'>{formik.errors.expDate}</div> : null}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Label for="itemType">Item Type</Label>
                                            <Input type="select" placeholder="" onBlur={formik.handleBlur} name="itemType" defaultValue={posts.itemType} onChange={formik.handleChange} >
                                                <option>Medical Equipment</option>
                                                <option>Medicine</option>
                                                <option>Other</option>
                                            </Input>
                                            {formik.touched.itemType && formik.errors.itemType ? <div className='control-label' color='info'>{formik.errors.itemType}</div> : null}
                                        </Col>
                                        <Col>
                                            <Label for="dose">Dosage</Label>
                                            <Input type="text" placeholder="" onBlur={formik.handleBlur} name="dose" defaultValue={posts.dose} onChange={formik.handleChange} />
                                            {formik.touched.dose && formik.errors.dose ? <div className='control-label' color='info'>{formik.errors.dose}</div> : null}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Label for="price">Price</Label>
                                            <Input type="text" placeholder="" onBlur={formik.handleBlur} name="price" defaultValue={posts.price} onChange={formik.handleChange}/>
                                            {formik.touched.price && formik.errors.price ? <div className='control-label' color='info'>{formik.errors.price}</div> : null}
                                        </Col>
                                        <Col>
                                            <Label for="noOfItems">No. Of Items</Label>
                                            <Input type="text" placeholder="" onBlur={formik.handleBlur} name="noOfItems" defaultValue={posts.noOfItems} onChange={formik.handleChange}/>
                                            {formik.touched.noOfItems && formik.errors.noOfItems ? <div className='control-label' color='info'>{formik.errors.noOfItems}</div> : null}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Label for="description">Item Description</Label>
                                            <Input type="textarea" name="description" onBlur={formik.handleBlur} defaultValue={posts.description} onChange={formik.handleChange} />
                                        </Col>
                                    </Row>
                                    <FormGroup inline>
                                    <Button color="primary" onClick={() => setmodalDemo(true)} disabled={!formik.isValid}>
                                        Add Item
                                    </Button>
                                        <Button type='reset' color="info">Reset</Button>
                                    </FormGroup>
                                    <Modal isOpen={modalDemo} >
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">
                                                Add Item
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
                                            <p>Confirm Details And Press Add To Add to Inventory</p>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="secondary" onClick={() => setmodalDemo(false)}>
                                                Close
                                            </Button>
                                            <Button color="primary" onClick={formik.handleSubmit}>
                                                Add
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

export default AddItem;