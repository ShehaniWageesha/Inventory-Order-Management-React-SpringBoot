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
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col
} from "reactstrap";

class OrderList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      orders:[]
    }
  }

  componentDidMount() {

    axios.get("http://localhost:8080/getorders")
        .then(response => {
          this.setState({
            orders:response.data
          })
        })
  }

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Order List</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Order ID</th>
                        <th>Customer Name</th>
                        <th>Card Type</th>
                        <th>Purchase Date</th>
                        <th className="text-center">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                    {this.state.orders.length ? this.state.orders.map(order =>
                            <tr>
                                <td>{order.orderId}</td>
                                <td>{order.fName}</td>
                                <td>{order.cardType}</td>
                                <td>{order.purchaseDate}</td>
                                <td className="text-center">{order.total}</td>
                            </tr>
                    ):null}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default OrderList;
