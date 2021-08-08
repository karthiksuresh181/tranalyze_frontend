import React from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Button,
} from "reactstrap";
const axios = require("axios");
function Alerts() {
  const [activeAlerts, setActiveAlerts] = React.useState([]);
  const [inActiveAlerts, setInActiveAlerts] = React.useState([]);

  const getActiveAlerts = () => {
    axios
      .get("http://192.168.1.108:9995/api/v1/alerts/get_active_alerts")
      .then((res) => {
        setActiveAlerts(res.data);
      });
  };

  const getInActiveAlerts = () => {
    axios
      .get("http://192.168.1.108:9995/api/v1/alerts/get_inactive_alerts")
      .then((res) => {
        setInActiveAlerts(res.data);
      });
  };

  React.useEffect(() => {
    getActiveAlerts();
    getInActiveAlerts();
  }, []);
  return (
    <>
      <div className="content">
        <Row>
          <Col md="6">
            <Card className="card-plain">
              <CardHeader>
                <CardTitle tag="h2" className="text-center">
                  Active Alerts
                </CardTitle>
                <p className="category">Click on Cancel to Cancel the alert.</p>
                <p style={{ textAlign: "right" }}>
                  <Button className="btn-danger">Cancel All</Button>
                </p>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th className="text-center">USDT Pair</th>
                      <th className="text-center">Price</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeAlerts.map((item) => (
                      <tr>
                        <td className="text-center">{item.symbol}</td>
                        <td className="text-center">{item.price}</td>
                        <td className="text-center">
                          <Button className="btn-sm btn-danger">Cancel</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          <Col md="6">
            <Card className="card-plain">
              <CardHeader>
                <CardTitle tag="h2" className="text-center">
                  Expired Alerts
                </CardTitle>
                <p className="category">
                  Click on Activate to activate the alert again.
                </p>
                <p style={{ textAlign: "right" }}>
                  <Button className="btn-danger">Clear All</Button>
                </p>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th className="text-center">USDT Pair</th>
                      <th className="text-center">Price</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inActiveAlerts.map((item) => (
                      <tr>
                        <td className="text-center">{item.symbol}</td>
                        <td className="text-center">{item.price}</td>
                        <td className="text-center">
                          <Button className="btn-sm btn-success">
                            Activate
                          </Button>
                        </td>
                      </tr>
                    ))}
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

export default Alerts;
