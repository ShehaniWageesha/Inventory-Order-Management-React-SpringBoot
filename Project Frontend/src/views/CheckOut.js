/*!

=========================================================
* Black Dashboard React v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*!

=========================================================
* Black Dashboard React v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, {useEffect, useState} from "react";
import {useHistory} from 'react-router-dom'
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col, Input, Button, Modal, ModalBody, ModalFooter
} from "reactstrap";
import {rmvCart} from "../Redux/cartAction";
import {connect} from "react-redux";
import Label from "reactstrap/es/Label";
import FormGroup from "reactstrap/es/FormGroup";
import axios from "axios";
import {useFormik} from "formik";
import moment from "moment";
import * as Yup from "yup";

function CheckOut(props) {

  let newID = null;
  const history = useHistory()
  const [order,setOrder] = useState({})
  const [purchase,setPurchase] = useState('')
  const [Id, setId] = useState(newID);
  const [modalDemo, setmodalDemo] = useState(false);

  const validationSchema = Yup.object({

    fName: Yup.string().required('First Name Required!'),
    lName: Yup.string().required('Last Name Required!'),
    streetNo: Yup.number().integer('Not Integer').min(1,'Cannot Be Negative'),
    street: Yup.string().required('Street Required!'),
    city: Yup.string().required('City Required!'),
    cardType: Yup.string().required('Last Name Required!'),
    cardNo: Yup.number().required('Item Type Required!'),
    cvv: Yup.number().moreThan(100,'Minimum is 100!').positive('Enter Positive Value!').integer('Enter an Integer Number!'),
    phoneNo: Yup.number().integer('Not Integer').min(1,'Cannot Be Negative')

  })

  useEffect( () => {
    axios.get(`http://localhost:8080/getOrderIds`)
        .then(
            response => {
              let orderId = [];
              let ids = [];
              // eslint-disable-next-line no-unused-expressions
              response.data.length ? response.data.map(obj => {
                let id = obj.orderId.split('MO')
                orderId.push(id[1])
                console.log("Order IDs 1",orderId)
              }):null
              console.log("Order IDs 2",orderId)
              console.log("Max Order",Math.max(...orderId))
              newID = 'MO'+(Math.max(...orderId)+1)
              console.log('New Order ID',newID)
              setId(newID)
              return response.data
            })
  },[]);

  const formik = useFormik({
    enableReinitialize : true,
    validateOnMount : true,
    validationSchema,
    initialValues: {
      orderId: Id,
      fName: '',
      lName: '',
      streetNo: 0,
      street: '',
      city: '',
      cardType: '',
      cardNo: 0,
      cvv: 0,
      phoneNo: 0
    },
    onSubmit : values => {
      console.log('FORM DATA',values)
      console.log('Form Data',{...values,purchaseDate:moment().format("DD-MM-YYYY hh:mm:ss"),total:props.total});
      console.log('Check Data', {orderItems:props.shoppingCart})
      axios.all([
            axios.post(`http://localhost:8080/order`,{...values,purchaseDate:moment().format("DD-MM-YYYY hh:mm:ss"),total:props.total}),
            axios.put('http://localhost:8080/inventoryItems/checkout/update', {orderItems:props.shoppingCart})
          ])
          .then(
              res => {
                history.push({
                  pathname: '/nurse/orders'
                })
              })
      /*setPurchase('orange')
      console.log("Purchase Date", moment().format("DD-MM-YYYY hh:mm:ss"))
      setOrder(values)
      console.log("Order",purchase)*/
      /*axios.post(`http://localhost:8080/inventoryItems`,values)
          .then(res => {
                history.push({
                  pathname: '/nurse/inventory'
                })
              }
          )*/
      /*setmodalDemo(false)*/
    }
  })


  return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h3">Check Out</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                    <tr>
                      <th>Item ID</th>
                      <th>Item Name</th>
                      <th className="text-center">Quantity</th>
                      <th>Price</th>
                      <th>Total</th>
                    </tr>
                    </thead>
                    <tbody>{props.shoppingCart.length ? props.shoppingCart.map(item =>
                        <tr>
                          <td>{item.itemId}</td>
                          <td>{item.name}</td>
                          <td className="text-center">{item.quantity}</td>
                          <td>Rs.{item.price}</td>
                          <td>Rs.{item.quantity * item.price}</td>
                        </tr>
                    ) : null}
                    <tr>
                      <td><b>Total</b></td>
                      <td></td>
                      <td className="text-center"></td>
                      <td></td>
                      <td><b>Rs.{props.total}</b></td>
                    </tr>
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h3">Customer Details</CardTitle>
                </CardHeader>
                <CardBody>
                  <form>
                    <Row>
                      <Col>
                        <Label for="orderID">Order ID</Label>
                        <Input name="orderId" defaultValue={Id} onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" disabled/>
                      </Col>
                      <Col>
                        <Label for="fName">First Name</Label>
                        <Input name="fName" onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" placeholder="First Name"/>
                        {formik.touched.fName && formik.errors.fName ? <div className='control-label' color='info'>{formik.errors.fName}</div> : null}
                      </Col>
                      <Col>
                        <Label for="lName">Last Name</Label>
                        <Input name="lName" onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" placeholder="Last Name"/>
                        {formik.touched.lName && formik.errors.lName ? <div className='control-label' color='info'>{formik.errors.lName}</div> : null}
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Label for="streetNo">No.</Label>
                        <Input name="streetNo" onBlur={formik.handleBlur} type="number" onChange={formik.handleChange} placeholder="No Name"/>
                        {formik.touched.streetNo && formik.errors.streetNo ? <div className='control-label' color='info'>{formik.errors.streetNo}</div> : null}
                      </Col>
                      <Col>
                        <Label for="street">Street</Label>
                        <Input type="text" onBlur={formik.handleBlur} onChange={formik.handleChange} placeholder="Street Name" name="street"/>
                        {formik.touched.street && formik.errors.street ? <div className='control-label' color='info'>{formik.errors.street}</div> : null}
                      </Col>
                      <Col>
                        <Label for="city">City</Label>
                        <Input type="text" onBlur={formik.handleBlur} onChange={formik.handleChange} placeholder="City Name" name="city"/>
                        {formik.touched.city && formik.errors.city ? <div className='control-label' color='info'>{formik.errors.city}</div> : null}
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Label for="cardType">Card Type</Label>
                        <Input type="select" onBlur={formik.handleBlur} onChange={formik.handleChange} placeholder="" name="cardType">
                          {formik.touched.cardType && formik.errors.cardType ? <div className='control-label' color='info'>{formik.errors.cardType}</div> : null}
                          <option>Master</option>
                          <option>Visa</option>
                        </Input>
                      </Col>
                      <Col>
                        <Label for="cardNo">Card Number</Label>
                        <Input type="number" onBlur={formik.handleBlur} onChange={formik.handleChange} placeholder="Card Number" name="cardNo"/>
                        {formik.touched.cardNo && formik.errors.cardNo ? <div className='control-label' color='info'>{formik.errors.cardNo}</div> : null}
                      </Col>
                      <Col>
                        <Label for="cvv">#CVV</Label>
                        <Input type="number" onBlur={formik.handleBlur} onChange={formik.handleChange} placeholder="#CVV" name="cvv"/>
                        {formik.touched.cvv && formik.errors.cvv ? <div className='control-label' color='info'>{formik.errors.cvv}</div> : null}
                      </Col>
                    </Row>
                    <Row>
                      <Col md="3">
                        <Label for="phoneNo">Phone Number</Label>
                        <Input type="tel" onBlur={formik.handleBlur} onChange={formik.handleChange} placeholder="Phone Number" name="phoneNo"/>
                        {formik.touched.phoneNo && formik.errors.phoneNo ? <div className='control-label' color='info'>{formik.errors.phoneNo}</div> : null}
                      </Col>
                    </Row>
                    <FormGroup>
                      <Button color="success" onClick={() => setmodalDemo(true)} disabled={!formik.isValid}>
                        Check Out
                      </Button>
                      <Button typ="reset" color="danger">
                        Reset Default
                      </Button>
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
                        <p>Confirm Details And Press Proceed To Complete Order</p>
                      </ModalBody>
                      <ModalFooter>
                        <Button color="secondary" onClick={() => setmodalDemo(false)}>
                          Close
                        </Button>
                        <Button color="primary" onClick={formik.handleSubmit}>
                          Proceed
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
const mapStateToProps = state => {

  return {
    shoppingCart: state.shoppingCart,
    total: state.total
  }

}

const mapDispatchToProps = dispatch => {


  return {
    rmvCart: (itemId, price, quantity) => dispatch(rmvCart(itemId, price, quantity)),
  }

}

export default connect(mapStateToProps,mapDispatchToProps)(CheckOut);
