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
import React from "react";
import axios from "axios";
// nodejs library that concatenates classes
import classNames from "classnames";

import jsPDF from 'jspdf'; import 'jspdf-autotable';
import 'jspdf'
import 'jspdf-autotable'

import {connect} from "react-redux";

// reactstrap components
import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Input,
  InputGroup,
  NavbarBrand,
  Navbar,
  NavLink,
  Nav,
  Form,
  FormGroup,
  Container,
  Modal
} from "reactstrap";
import Footer from "../Footer/Footer";
import Table from "reactstrap/es/Table";
import {rmvCart, rstCart} from "../../Redux/cartAction";
import NotificationAlert from "react-notification-alert";
import {Link} from "react-router-dom";

var options = {};
options = {
  place: 'tc',
  message: (
      <div>
        <div>
          Item Removed From The Cart!
        </div>
      </div>
  ),
  type: "danger",
  icon: "now-ui-icons ui-1_bell-53",
  autoDismiss: 3
}


class AdminNavbar extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      collapseOpen: false,
      modalSearch: false,
      color: "navbar-transparent",
      albums: [],
      expired: [],
      search: '',
      cartTotal: 0,
      stock:[]
    };
    this.createReport = this.createReport.bind(this)
  }


  updateSearch(event){
    this.setState({
      search: event.target.value.substr(0,20)
    })
  }

  myFunc(itemId, price, quantity){
    this.refs.notify.notificationAlert(options);
    this.props.rmvCart(itemId, price, quantity)
  }

  createReport(){

    const unit = "pt";
    const size = "A3"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape
    const marginLeft = 40;
    const doc = new jsPDF( orientation, unit, size );

    let itemList = [];
    console.log("Item",this.state.expired);
    itemList = this.state.expired.map((item) =>
      [item.itemID,item.displayName,item.manufacturer,item.price,item.mfgDate,item.expDate,item.dose,item.itemType,item.noOfItems]
    );

    console.log("Item List",itemList);

    doc.setFontSize( 20 );
    require('jspdf-autotable');

    doc.autoTable( {
      head: [['Item ID', 'Display Name', 'Manufacturer','Price','Mfg. Date','Exp. Date','Dose','Item Type','Inventory']],
      body: itemList,
    } );

    const current = new Date();
    let fname  = current.getFullYear()+''+(current.getMonth()+1)+current.getDate()+current.getTime();
    /*doc.text("Hello World!",10,10);*/

    require('jspdf-autotable')
    doc.save(fname+".pdf");
  }

  componentDidMount() {
    axios.get("http://localhost:8080/expiring")
        .then(response => {
              this.setState({albums: response.data})
              console.log(response)
        })
    axios.get("http://localhost:8080/expired")
        .then(res => {
          this.setState({expired: res.data})
        })
    axios.get("http://localhost:8080/runout")
        .then(r => {
          this.setState({stock: r.data})
          console.log("Ran Out",r)
        })
    window.addEventListener("resize", this.updateColor);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateColor);
  }
  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
  updateColor = () => {
    if (window.innerWidth < 993 && this.state.collapseOpen) {
      this.setState({
        color: "bg-white"
      });
    } else {
      this.setState({
        color: "navbar-transparent"
      });
    }
  };
  // this function opens and closes the collapse on small devices
  toggleCollapse = () => {
    if (this.state.collapseOpen) {
      this.setState({
        color: "navbar-transparent"
      });
    } else {
      this.setState({
        color: "bg-white"
      });
    }
    this.setState({
      collapseOpen: !this.state.collapseOpen
    });
  };
  // this function is to open the Search modal
  toggleModalSearch = () => {
    this.setState({
      modalSearch: !this.state.modalSearch
    });
  };

  CreateURL(para){
    return "http://localhost:3000/nurse/inventory/"+para
  }

  render() {
    const { albums } =this.state
    return (
      <>
        <NotificationAlert ref="notify"/>
        <Navbar
          className={classNames("navbar-absolute", this.state.color)}
          expand="lg"
        >
          <Container fluid>
            <div className="navbar-wrapper">
              <div
                className={classNames("navbar-toggle d-inline", {
                  toggled: this.props.sidebarOpened
                })}
              >
                <button
                  className="navbar-toggler"
                  type="button"
                  onClick={this.props.toggleSidebar}
                >
                  <span className="navbar-toggler-bar bar1" />
                  <span className="navbar-toggler-bar bar2" />
                  <span className="navbar-toggler-bar bar3" />
                </button>
              </div>
              <NavbarBrand href="#pablo" onClick={e => e.preventDefault()}>
                {this.props.brandText}
              </NavbarBrand>
            </div>
            <button
              aria-expanded={false}
              aria-label="Toggle navigation"
              className="navbar-toggler"
              data-target="#navigation"
              data-toggle="collapse"
              id="navigation"
              type="button"
              onClick={this.toggleCollapse}
            >
              <span className="navbar-toggler-bar navbar-kebab" />
              <span className="navbar-toggler-bar navbar-kebab" />
              <span className="navbar-toggler-bar navbar-kebab" />
            </button>
            <Collapse navbar isOpen={this.state.collapseOpen}>
              <Nav className="ml-auto" navbar>
                {this.props.location.pathname.indexOf("orders") === -1 ? null : (
                <InputGroup className="search-bar">
                  <Form inline>
                  <FormGroup className="no-border">
                    <Input type="text" value={this.state.search} onChange = {this.updateSearch.bind(this)} placeholder="Search"/>
                  </FormGroup>
                  <Button
                    color="link"
                  >
                    <i className="tim-icons icon-zoom-split" />
                    <span className="d-lg-none d-md-block">Search</span>
                  </Button>
                  </Form>
                </InputGroup>
                )}
                <UncontrolledDropdown nav>
                  <DropdownToggle
                      caret
                      color="default"
                      data-toggle="dropdown"
                      nav
                  >
                    <div className="notification d-none d-lg-block d-xl-block" />
                    <i className="tim-icons icon-bus-front-12" />
                    <p className="d-lg-none">Notifications</p>
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-black" right tag="ul">
                    {
                      this.state.stock.length ?
                          this.state.stock.map(p =>
                              <div key={p.itemID}>
                                <NavLink tag="li" >
                                  <DropdownItem className="nav-item" href={this.CreateURL(p.itemID)}>
                                    {p.displayName} is running out! Click to Visit the Item
                                  </DropdownItem>
                                </NavLink>
                              </div>):"No posts to show"
                    }
                  </DropdownMenu>
                </UncontrolledDropdown>
                <UncontrolledDropdown nav>
                  <DropdownToggle
                    caret
                    color="default"
                    data-toggle="dropdown"
                    nav
                  >
                    <div className="notification d-none d-lg-block d-xl-block" />
                    <i className="tim-icons icon-bell-55" />
                    <p className="d-lg-none">Notifications</p>
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-black" right tag="ul">
                    {
                      albums.length ?
                      albums.map(post =>
                          <div key={post.itemID}>
                          <NavLink tag="li" >
                        <DropdownItem className="nav-item" href={this.CreateURL(post.itemID)}>
                          {post.displayName} is nearing expiration click here to visit the item.
                        </DropdownItem>
                      </NavLink>
                          </div>):"No posts to show"
                    }
                  </DropdownMenu>
                </UncontrolledDropdown>
                <UncontrolledDropdown nav>
                  <DropdownToggle
                      caret
                      color="default"
                      data-toggle="dropdown"
                      nav
                  >
                    <div className="notification d-none d-lg-block d-xl-block" />
                    <i className="tim-icons icon-alert-circle-exc" />
                    <p className="d-lg-none">Notifications</p>
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-black" right tag="ul">
                    {
                      this.state.expired.length ?
                          this.state.expired.map(post =>
                              <div key={post.itemID}>
                                <NavLink tag="li" >
                                  <DropdownItem className="nav-item" href={this.CreateURL(post.itemID)}>
                                    {post.displayName} has expired! Click here to visit the item.
                                  </DropdownItem>
                                </NavLink>
                              </div>):"No posts to show"
                    }
                  </DropdownMenu>
                </UncontrolledDropdown>
                <UncontrolledDropdown nav>
                  <DropdownToggle
                      caret
                      color="default"
                      data-toggle="dropdown"
                      nav
                      onClick={e => e.preventDefault()}
                  >
                    <i className="tim-icons icon-paper" />
                    <span className="d-lg-none d-md-block">Shopping Cart</span>
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-black" right tag="ul">
                    <DropdownItem onClick={this.createReport} className="nav-item">
                      Generate Report On Items Nearing Expiration
                    </DropdownItem>
                    <DropdownItem className="nav-item" href="http://localhost:3000/nurse/orders">
                      See Order List
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <UncontrolledDropdown nav>
                  <DropdownToggle
                    caret
                    color="default"
                    data-toggle="dropdown"
                    nav
                    onClick={e => e.preventDefault()}
                  >
                    <i className="tim-icons icon-cart" />
                    <span className="d-lg-none d-md-block">Shopping Cart</span>
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-black" right tag="ul">
                      <DropdownItem className="nav-item">
                        <Table>
                          <thead>
                          <tr>
                            <th>Item ID</th>
                            <th className="text-left">Item Name</th>
                            <th>Quantity</th>
                            <th className="text-right">Price</th>
                            <th className="text-right">Total</th>
                            <th></th>
                          </tr>
                          </thead>
                          <tbody>
                          {
                            this.props.shoppingCart.length ? this.props.shoppingCart.map(obj =>
                            <tr>
                              <td key={obj.itemId}>{obj.itemId}</td>
                              <td>{obj.name}</td>
                              <td className="text-center">{obj.quantity}</td>
                              <td className="text-right">Rs.{obj.price}</td>
                              <td className="text-right">Rs.{obj.price*obj.quantity}</td>
                              <td className="text-right"><Button onClick={() => this.myFunc(obj.itemId, obj.price, obj.quantity)} className="btn-icon btn-round" color="primary"
                                                                 size="sm">
                                <i className="fa fa-times"/>
                              </Button></td>
                            </tr>
                            ):null
                          }
                          <tr>
                              <td><b>Total</b></td>
                              <td></td>
                              <td></td>
                              <td className="text-right"></td>
                              <td className="text-right"><b>Rs.{this.props.total}</b></td>
                            </tr>
                          </tbody>
                        </Table>
                      </DropdownItem>
                    <DropdownItem className="nav-item">
                      <Table>
                      <tr>
                        <td><Button onClick={this.props.rstCart}>Reset Cart</Button></td>
                        <td><Link to="/nurse/checkout"><Button>Check Out</Button></Link></td>
                      </tr>
                      </Table>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <UncontrolledDropdown nav>
                  <DropdownToggle
                      caret
                      color="default"
                      data-toggle="dropdown"
                      nav
                      onClick={e => e.preventDefault()}
                  >
                    <div className="photo">
                      <img alt="..." src={require("assets/img/anime3.png")} />
                    </div>
                    <b className="caret d-none d-lg-block d-xl-block" />
                    <p className="d-lg-none">Log out</p>
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-navbar" right tag="ul">
                    <NavLink tag="li">
                      <DropdownItem className="nav-item">Profile</DropdownItem>
                    </NavLink>
                    <NavLink tag="li">
                      <DropdownItem className="nav-item">Settings</DropdownItem>
                    </NavLink>
                    <DropdownItem divider tag="li" />
                    <NavLink tag="li">
                      <DropdownItem className="nav-item">Log out</DropdownItem>
                    </NavLink>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <li className="separator d-lg-none" />
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
        <Modal
          modalClassName="modal-search"
          isOpen={this.state.modalSearch}
          toggle={this.toggleModalSearch}
        >
          <div className="modal-header">
            <Input id="inlineFormInputGroup" placeholder="SEARCH" type="text" />
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={this.toggleModalSearch}
            >
              <i className="tim-icons icon-simple-remove" />
            </button>
          </div>
        </Modal>
      </>
    );
  }
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
    rstCart: () => dispatch(rstCart())
  }

}

export default connect(mapStateToProps,mapDispatchToProps)(AdminNavbar);
