import React from "react";

// reactstrap components
import { Button, Dropdown, DropdownToggle, Input } from "reactstrap";

const axios = require("axios");

function FixedPlugin(props) {
  const [dropDownIsOpen, setdropDownIsOpen] = React.useState(false);
  const [pairName, setPairName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const handleClick = () => {
    setdropDownIsOpen(!dropDownIsOpen);
  };

  const handleSetAlert = () => {
    if (pairName !== "" && price !== "") {
      let requestData = {
        symbol: pairName,
        price: price,
      };
      axios
        .post("http://localhost:9995/api/v1/alerts/set_alert", requestData)
        .then((res) => {
          console.log(res.data);
        });
    }
  };
  return (
    <div className="fixed-plugin">
      <Dropdown isOpen={dropDownIsOpen} toggle={handleClick}>
        <DropdownToggle tag="div">
          <i
            className="fa fa-bell fa-2x"
            style={{ color: "white", padding: "10px" }}
          />
        </DropdownToggle>
        <ul className="dropdown-menu show">
          <li className="adjustments-line text-center">
            <i className="fa fa-bell fa-3x" />
          </li>
          <li className="header-title">Add Alert</li>

          <li className="adjustments-line text-center">
            <label>Coin</label>
            <Input
              placeholder="BTCUSDT"
              type="text"
              className="text-center"
              onChange={(e) => setPairName(e.target.value)}
            />
          </li>
          <li style={{ height: "8px" }}></li>
          <li className="adjustments-line text-center">
            <label>Price</label>
            <Input
              placeholder="41100"
              type="text"
              className="text-center"
              onChange={(e) => setPrice(e.target.value)}
            />
          </li>
          <li style={{ height: "8px" }}></li>
          <li className="adjustments-line text-center">
            <Button color="primary" onClick={handleSetAlert}>
              Add Alert
            </Button>
          </li>
        </ul>
      </Dropdown>
    </div>
  );
}

export default FixedPlugin;
