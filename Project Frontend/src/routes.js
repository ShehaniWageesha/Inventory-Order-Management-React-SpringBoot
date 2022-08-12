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
import Dashboard from "views/Dashboard.js";
import Icons from "views/Icons.js";
import Map from "views/Map.js";
import Notifications from "views/Notifications.js";
import Rtl from "views/Rtl.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import UserProfile from "views/UserProfile.js";
import ItemType from "./views/ItemType";
import Item from "./views/Item";
import AddItem from "./views/AddItem";
import ItemDetails from "./views/ItemDetails";
import CheckOut from "./views/CheckOut";
import OrderList from "./views/OrderList";

var routes = [
  {
    path: "/inventory",
    name: "Inventory",
    rtlName: "ار تي ال",
    icon: "tim-icons icon-app",
    component: ItemDetails,
    layout: "/nurse",
    exact : true
  },
  {
    path: "/inventory/addItem",
    name: "Add Item",
    rtlName: "ار تي ال",
    icon: "tim-icons icon-notes",
    component: AddItem,
    layout: "/nurse"
  },
  {
    path: "/inventory/:id",
    name: "Item Details",
    rtlName: "ار تي ال",
    icon: "tim-icons icon-world",
    component: Item,
    layout: "/nurse",
    invisible: true
  },
  {
    path: "/inventory/items/:type",
    name: "Item",
    rtlName: "ار تي ال",
    icon: "tim-icons icon-world",
    component: ItemType,
    layout: "/nurse",
    invisible: true
  },
  {
    path: "/inventory/items/:type",
    name: "Add Patient",
    rtlName: "ار تي ال",
    icon: "tim-icons icon-single-02",
    component: ItemType,
    layout: "/nurse",
  },
  {
    path: "/inventory/items/:type",
    name: "Patient Details",
    rtlName: "ار تي ال",
    icon: "tim-icons icon-sound-wave",
    component: ItemType,
    layout: "/nurse"
  },
  {
    path: "/checkout",
    name: "Check Out",
    rtlName: "ار تي ال",
    icon: "tim-icons icon-sound-wave",
    component: CheckOut,
    layout: "/nurse",
    invisible: true
  },
  {
    path: "/orders",
    name: "Order List",
    rtlName: "ار تي ال",
    icon: "tim-icons icon-sound-wave",
    component: OrderList,
    layout: "/nurse",
    invisible: true
  }
];
export default routes;
