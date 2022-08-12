import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory
} from "react-router-dom"

import {useDispatch, useSelector} from "react-redux";

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardText,
    FormGroup,
    Input,
    Nav,
    Alert,
    NavItem,
    NavLink,
    Row,
    Col, ModalBody, ModalFooter, Modal
} from "reactstrap";
import {addCart} from "../Redux/cartAction";
import {connect} from "react-redux"
import EasyTimer from "easytimer";

let dId = '';
var options = {};

function ItemDetails(props) {

    const [visible, setVisible] = useState(false);
    const [msg, setMsg] = useState(false);
    const [msg1, setMsg1] = useState(false);
    const onmiss = () => setMsg1(false);
    const dsmissal = (e) => setMsg1(false);
    const onDmiss = () => setMsg(false);
    const dmissal = (e) => setMsg(false);
    const [qty,setQty] = useState(0);
    const [search,setSearch] = useState('');
    const onDismiss = () => setVisible(false);
    const dismissal = (e) => setVisible(false);
    const [modal,setModal] = useState(false);


    function toggleModalSearch() {
        setModal(!modal)
    }

    function updateSearch(event){

        setSearch(event.target.value.substr(0,20))

    }

    function setDelItem(itemID){
        dId = itemID;
        setmodalDemo(true);
        console.log('Delete Item ID Let',dId)
    }

    function deleteItem(){
        axios.delete(`http://localhost:8080/inventoryItems/${dId}`)
            .then(res => {
                console.log('Deleted',res.data.valid)
                if (res.data.valid === false) {
                    console.log('Yeah Boi Org',dId)
                    setmodalDemo(false)
                    window.location.reload()
                }
                    //filteredItems = posts.splice(filteredItems.findIndex(x => x.itemID === dId),1)
                    //console.log('Filter Delete',filteredItems)
            });
        console.log('Yeah Boi',dId)
    }

    function checkCartEntry(itemId,displayName,price,qty,inventory) {

        const available = props.shoppingCart.filter(function (item) {
            console.log(item.itemId)
            return item.itemId === itemId;
        })
        if (available.length === 0 && qty !== '' && qty <= inventory) {
            props.addCart(itemId, displayName, qty, price)
            setMsg(true);
            let timer = new EasyTimer();
            timer.start({countdown: true, startValues: {seconds: 3}});
            timer.addEventListener('targetAchieved', dmissal);
        }
        else if(qty !== '' && qty <= inventory) {
            setVisible(true);
            let timer = new EasyTimer();
            timer.start({countdown: true, startValues: {seconds: 3}});
            timer.addEventListener('targetAchieved', dismissal);
        }
        else {
            setMsg1(true);
            let timer = new EasyTimer();
            timer.start({countdown: true, startValues: {seconds: 3}});
            timer.addEventListener('targetAchieved', dsmissal);
        }
    }

    const history = useHistory();
    const [posts, setPosts] = useState([]);
    const [modalDemo, setmodalDemo] = useState(false);
    var i=0;
    let filteredItems = []

    useEffect(() => {
            axios.get("http://localhost:8080/inventoryItems")
                .then(
                    response => {
                        setPosts(response.data)
                        console.log(response.data)
                    })
        }
        ,[]);


    filteredItems = posts.filter(
        (item) => {
            return item.displayName.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        }
    );
    console.log("Posts List",posts.length)
    console.log("Filtered Items",filteredItems)
    return (
        <>
            <div className="content">
                <Modal
                    modalClassName="modal-search"
                    isOpen={modal}
                    toggle={toggleModalSearch}
                >
                    <div className="modal-header">
                        <Input id="inlineFormInputGroup" placeholder="SEARCH" onChange={updateSearch} type="text" />
                        <button
                            aria-label="Close"
                            className="close"
                            data-dismiss="modal"
                            type="button"
                            onClick={toggleModalSearch}
                        >
                            <i className="tim-icons icon-simple-remove" />
                        </button>
                    </div>
                </Modal>
                <Alert color="danger" isOpen={visible} toggle={onDismiss}>
                    This item is already added to the cart!
                </Alert>
                <Alert color="success" isOpen={msg} toggle={onDmiss}>
                    Item was added to the cart!
                </Alert>
                <Alert color="info" isOpen={msg1} toggle={onmiss}>
                    Check the quantity you added!
                </Alert>
                <h1>Inventory Items</h1>
                <h3>Search <Button className="btn-round btn-icon" color="primary" onClick={() => toggleModalSearch()}>
                    <i className="tim-icons icon-zoom-split"/>
                </Button></h3>
                <Nav className="justify-content-center">
                    <NavItem>
                        <div color="info">
                            <NavLink className="h4"><Link to="/nurse/inventory/items/Medicine">Medicine</Link></NavLink>
                    </div>
                    </NavItem>
                    <NavItem>
                        <NavLink className="h4"><Link to="/nurse/inventory/items/Medical Equipment">Medical Equipment</Link></NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="h4"><Link to="/nurse/inventory/items/Other">Other</Link></NavLink>
                    </NavItem>
                </Nav>
                    <Row>
                    {
                        filteredItems.length ?
                            filteredItems.map(obj =>
                                    <Col md="3">
                                        <Card className="card-user">
                                            <CardBody className="text-left">
                                                <CardText/>
                                                <div className="author">
                                                    <div className="block block-one"/>
                                                    <div className="block block-two"/>
                                                    <div className="block block-three"/>
                                                    <div className="block block-four"/>
                                                    <a href="#pablo" onClick={e => e.preventDefault()}>
                                                        <img
                                                            alt="..."
                                                            className="avatar"
                                                            src={require("assets/img/tablets.jpg")}
                                                        />
                                                        <h5 className="title">Item ID : {obj.itemID}</h5>
                                                    </a>
                                                    <p className="description">Item Name : {obj.displayName}</p>
                                                    <p className="description">Manufacturer : {obj.manufacturer}</p>
                                                    <p className="description">Item Type : {obj.itemType}</p>
                                                    <p className="description">Manufacture Date : {obj.mfgDate}</p>
                                                    <p className="description">Expiration Date : {obj.expDate}</p>
                                                    <p className="description">Dosage : {obj.dose}mg</p>
                                                    <p className="description">Price : Rs.{obj.price}</p>
                                                    <p className="description">Inventory : {obj.noOfItems}</p>
                                                </div>
                                            </CardBody>
                                            <CardFooter>
                                                <Input type="number" min="1" id={obj.itemID} max={obj.noOfItems} required/>
                                                <div className="button-container">
                                                    <Button color="info" className="btn-icon btn-round" onClick={() => checkCartEntry(obj.itemID,obj.displayName,obj.price,document.getElementById(obj.itemID).value,obj.noOfItems)} >
                                                        <i className="tim-icons icon-cart"/>
                                                    </Button>
                                                    <Link to={`/nurse/inventory/${obj.itemID}`}>
                                                    <Button className="btn-icon btn-round" color="twitter">
                                                        <i className="tim-icons icon-single-copy-04"/>
                                                    </Button>
                                                    </Link>
                                                    <Button className="btn-icon btn-round" color="facebook"
                                                            onClick={() => setDelItem(obj.itemID)}>
                                                        <i className="tim-icons icon-simple-remove"/>
                                                    </Button>
                                                </div>
                                            </CardFooter>
                                        </Card>
                                    </Col>
                            ):null
                    }
                        <Modal isOpen={modalDemo}>
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">
                                    Delete Item From Inventory
                                </h5>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-hidden="true"
                                    onClick={() => setmodalDemo(false)}
                                >
                                    <i className="tim-icons icon-simple-remove"/>
                                </button>
                            </div>
                            <ModalBody>
                                <p>Confirm that you want to delete this item. Changes cannot be reverted!</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="secondary" onClick={() => setmodalDemo(false)}>
                                    Close
                                </Button>
                                <Button color="primary"
                                        onClick={() => deleteItem()} >
                                    Delete
                                </Button>
                            </ModalFooter>
                        </Modal>
                </Row>
            </div>
        </>
    );
    //console.log('Form Values',this.formik.values)
}


const mapStateToProps = state => {

    return {
        shoppingCart: state.shoppingCart
    }

}

const mapDispatchToProps = dispatch => {

    //refs.notificationAlert.notificationAlert(options);
    return {
        addCart: (itemId,name,quantity,price) => dispatch(addCart(itemId,name,quantity,price)),
    }

}

export default connect(mapStateToProps,mapDispatchToProps)(ItemDetails);