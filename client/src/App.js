import { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import WarehouseList from "./components/WarehouseList/WarehouseList";
import WarehouseDetails from "./components/WarehouseDetails/WarehouseDetails";
import WarehouseEdit from "./components/WarehouseEdit";
import AddWarehouseDetails from "./components/AddWarehouseDetails/AddWarehouseDetails";
import InventoryList from "./components/InventoryList/InventoryList";
import InventoryItemDetails from "./components/InventoryItemDetails/InventoryItemDetails";
import InventoryEdit from "./components/InventoryEdit";
import AddInventoryDetails from "./components/AddInventoryDetails/AddInventoryDetails";
import Footer from "./components/Footer/Footer";

const host = "http://localhost:8080";

class App extends Component {
  /* set initial state */

  state = {
    warehouses: [],
    inventoryItems: [],
  };

  /* get an array of warehouse objects */

  getWarehouses = () => {
    axios
      .get(`${host}/warehouse`)
      .then((response) => {
        this.setState({
          warehouses: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /* add new warehouse */

  addNewWarehouse = (warehouse) => {
    axios
      .post(`${host}/warehouse/add-warehouse`, warehouse)
      .then((response) => {
        this.getWarehouses();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /* delete warehouse */

  deleteWarehouse = (id) => {
    axios
      .delete(`${host}/warehouse/${id}/delete-warehouse`)
      .then((response) => {
        this.getWarehouses();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /* get an array of inventory item objects */

  getInventoryItems = () => {
    axios
      .get(`${host}/inventory`)
      .then((response) => {
        this.setState({
          inventoryItems: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /* add new inventory item */

  addNewItem = (item) => {
    axios
      .post(`${host}/inventory/add-item`, item)
      .then((response) => {
        this.getInventoryItems();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /* delete inventory item */

  deleteInventoryItem = (id) => {
    axios
      .delete(`${host}/inventory/${id}/delete-item`)
      .then((response) => {
        this.getInventoryItems();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  deleteInventoryItemFromWarehouse = (warehouseId, itemId) => {
    axios
      .delete(`${host}/warehouse/${warehouseId}/${itemId}/delete-item`)
      .then((response) => {
        this.getInventoryItems();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /* url */

  pageUrl = () => {
    return window.location.href;
  }

  /* mount component */

  componentDidMount() {
    this.getWarehouses();
    this.getInventoryItems();
  }

  render() {
    return (
      <BrowserRouter>
        <Header pageUrl={this.pageUrl}/>
        <Switch>
          <Redirect exact from="/" to="/warehouse" />
          <Route
            exact
            path="/warehouse"
            render={(routerProps) => (
              <WarehouseList
                warehouses={this.state.warehouses}
                getWarehouses={this.getWarehouses}
                {...routerProps}
              />
            )}
          />
          <Route
            exact
            path="/warehouse/add-warehouse"
            render={(routerProps) => (
              <AddWarehouseDetails
                addNewWarehouse={this.addNewWarehouse}
                {...routerProps}
              />
            )}
          />
          <Route exact path="/warehouse/:id" component={WarehouseDetails} />
          <Route
            exact
            path="/warehouse/:id/edit-warehouse"
            component={WarehouseEdit}
          />
          <Route
            exact
            path="/warehouse/:id/delete-warehouse"
            render={(routerProps) => (
              <WarehouseList
                warehouses={this.state.warehouses}
                deleteWarehouse={this.deleteWarehouse}
                {...routerProps}
              />
            )}
          />
          <Route
            exact
            path="/inventory"
            render={(routerProps) => (
              <InventoryList
                inventoryItems={this.state.inventoryItems}
                getInventoryItems={this.getInventoryItems}
                {...routerProps}
              />
            )}
          />
          <Route
            exact
            path="/inventory/add-item"
            render={(routerProps) => (
              <AddInventoryDetails
                warehouses={this.state.warehouses}
                addNewItem={this.addNewItem}
                {...routerProps}
              />
            )}
          />
          <Route exact path="/inventory/:id" component={InventoryItemDetails} />
          <Route
            exact
            path="/inventory/:id/edit-item"
            component={InventoryEdit}
          />
          <Route
            exact
            path="/inventory/:id/delete-item"
            render={(routerProps) => (
              <InventoryList
                inventoryItems={this.state.inventoryItems}
                deleteInventoryItem={this.deleteInventoryItem}
                {...routerProps}
              />
            )}
          />
          <Route
            path="/warehouse/:warehouseId/:id/delete-item"
            render={(routerProps) => (
              <WarehouseDetails
                deleteInventoryItemFromWarehouse={
                  this.deleteInventoryItemFromWarehouse
                }
                {...routerProps}
              />
            )}
          />
        </Switch>
        <Footer />
      </BrowserRouter>
    );
  }
}

export default App;
