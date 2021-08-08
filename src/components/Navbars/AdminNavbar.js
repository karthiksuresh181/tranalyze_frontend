import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
import Select from "react-select";
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
  Container,
  Modal,
  NavbarToggler,
  ModalHeader,
  FormGroup,
  ModalBody,
  ModalFooter,
} from "reactstrap";
const axios = require("axios");

function AdminNavbar(props) {
  const [collapseOpen, setcollapseOpen] = React.useState(false);
  const [modalSearch, setmodalSearch] = React.useState(false);
  const [modalAlert, setModalAlert] = React.useState(false);
  const [color, setcolor] = React.useState("navbar-transparent");

  const [searchPair, setSearchPair] = React.useState("");
  const [priceValue, setPriceValue] = React.useState("");
  const [searchPairResults, setSearchPairResults] = React.useState([]);
  const [pairs, setPairs] = React.useState([]);

  React.useEffect(() => {
    window.addEventListener("resize", updateColor);
    // Specify how to clean up after this effect:
    return function cleanup() {
      window.removeEventListener("resize", updateColor);
    };
  });
  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
  const updateColor = () => {
    if (window.innerWidth < 993 && collapseOpen) {
      setcolor("bg-white");
    } else {
      setcolor("navbar-transparent");
    }
  };
  // this function opens and closes the collapse on small devices
  const toggleCollapse = () => {
    if (collapseOpen) {
      setcolor("navbar-transparent");
    } else {
      setcolor("bg-white");
    }
    setcollapseOpen(!collapseOpen);
  };
  // this function is to open the Search modal
  const toggleModalSearch = () => {
    setmodalSearch(!modalSearch);
  };
  const toggleModalAlert = () => {
    setModalAlert(!modalAlert);
  };
  const handlePairInputChange = (inputText) => {
    setSearchPair(inputText);
  };
  const loadPairs = () => {
    axios
      .get("http://localhost:9995/api/v1/futures/get_coin_list")
      .then((res) => {
        setPairs(res.data["symbols"]);
        setSearchPairResults(res.data["symbols"]);
      });
  };

  const setAlert = () => {
    if (searchPair != "" && priceValue != "") {
      let requestData = {
        symbol: searchPair,
        price: priceValue,
      };
      axios
        .post("http://localhost:9995/api/v1/alerts/set_alert", requestData)
        .then((res) => {
          console.log(res.data);
        });
    }
  };

  // React.useEffect(() => loadPairs(), []);

  // React.useEffect(() => {
  //   const options = [];
  //   const results = pairs.filter((pair) =>
  //     pair.includes(searchPair.toUpperCase())
  //   );
  //   results.forEach((pair) => {
  //     options.push({ value: pair, label: pair });
  //   });
  //   setSearchPairResults(options);
  // }, [searchPair]);

  return (
    <>
      <Navbar className={classNames("navbar-absolute", color)} expand="lg">
        <Container fluid>
          <div className="navbar-wrapper">
            <div
              className={classNames("navbar-toggle d-inline", {
                toggled: props.sidebarOpened,
              })}
            >
              <NavbarToggler onClick={props.toggleSidebar}>
                <span className="navbar-toggler-bar bar1" />
                <span className="navbar-toggler-bar bar2" />
                <span className="navbar-toggler-bar bar3" />
              </NavbarToggler>
            </div>
            <NavbarBrand href="#pablo" onClick={(e) => e.preventDefault()}>
              {props.brandText}
            </NavbarBrand>
          </div>
          <NavbarToggler onClick={toggleCollapse}>
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
          </NavbarToggler>
          <Collapse navbar isOpen={collapseOpen}>
            <Nav className="ml-auto" navbar>
              <InputGroup className="search-bar">
                <Button color="link" onClick={toggleModalSearch}>
                  <i className="tim-icons icon-zoom-split" />
                  <span className="d-lg-none d-md-block">Search</span>
                </Button>
                <Button color="link" onClick={toggleModalAlert}>
                  <i className="tim-icons icon-sound-wave" />
                  <span className="d-lg-none d-md-block">Alerts</span>
                </Button>
              </InputGroup>
              <UncontrolledDropdown nav>
                <DropdownToggle
                  caret
                  color="default"
                  nav
                  onClick={(e) => e.preventDefault()}
                >
                  <div className="photo">
                    <img
                      alt="..."
                      src={require("assets/img/anime3.png").default}
                    />
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
        isOpen={modalSearch}
        toggle={toggleModalSearch}
      >
        <ModalHeader>
          <Input placeholder="SEARCH" type="text" />
          <button
            aria-label="Close"
            className="close"
            onClick={toggleModalSearch}
          >
            <i className="tim-icons icon-simple-remove" />
          </button>
        </ModalHeader>
      </Modal>

      <Modal
        modalClassName="modal-black"
        isOpen={modalAlert}
        toggle={toggleModalAlert}
        size="sm"
      >
        <ModalHeader>
          <h2>Alerts</h2>
        </ModalHeader>
        <ModalBody>
          <FormGroup className="text-center">
            <label>Coin</label>
            {/* <Select
              className="basic-single"
              classNamePrefix="select"
              value={searchPair}
              onInputChange={handlePairInputChange}
              options={searchPairResults}
              defaultValue={searchPairResults[0]}
              style={{ color: "black" }}
            /> */}
            <Input
              placeholder="BTCUSDT"
              type="text"
              onChange={(e) => setSearchPair(e.target.value)}
            />
            <label>Price</label>
            <Input
              placeholder="41100"
              type="text"
              onChange={(e) => setPriceValue(e.target.value)}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter style={{ marginLeft: "20px", marginRight: "20px" }}>
          <Button color="primary" onClick={setAlert}>
            Add Alert
          </Button>
          <Button color="danger" onClick={toggleModalAlert}>
            Cancel
          </Button>
        </ModalFooter>
        <div style={{ height: "20px" }}></div>
      </Modal>
    </>
  );
}

export default AdminNavbar;
