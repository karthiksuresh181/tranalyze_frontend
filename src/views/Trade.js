import React from "react";
import Swal from "sweetalert2";
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
  Input,
  FormGroup,
  CardFooter,
} from "reactstrap";
const axios = require("axios");

function Alerts() {
  const [positions, setPositions] = React.useState([]);

  const getActiveAlerts = () => {
    axios
      .get("http://192.168.1.108:9995/api/v1/futures/get_positions")
      .then((res) => {
        setPositions(res.data);
      });
  };

  React.useEffect(() => {
    getActiveAlerts();
  }, []);
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card className="card-plain">
              <CardHeader>
                <CardTitle tag="h2" className="text-center">
                  Positions
                </CardTitle>
                {/* <p className="category">Click on Cancel to Cancel the alert.</p> */}
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th className="text-center">Symbol</th>
                      <th className="text-center">Entry Price</th>
                      <th className="text-center">Stop Loss</th>
                      <th className="text-center">Take Profit 1</th>
                      <th className="text-center">Take Profit 2</th>
                      <th className="text-center">UnRealized Profit</th>
                      <th className="text-center">Margin</th>
                    </tr>
                  </thead>
                  <tbody>
                    {positions.length > 0 &&
                      positions.map((item) => (
                        <tr>
                          <td className="text-center">{item.symbol}</td>
                          <td className="text-center">{item.entryPrice}</td>
                          <td className="text-center">{item.stop_limit}</td>
                          <td className="text-center">{item.limit}</td>
                          <td
                            className="text-center"
                            style={{ maxWidth: "100px" }}
                          >
                            <Input type="number"></Input>
                          </td>
                          <td className="text-center">
                            <div className="pnl">{item.unrealizedProfit}</div>
                          </td>
                          <td className="text-center">{item.initialMargin}</td>
                        </tr>
                      ))}
                    {!positions.length && (
                      <tr>
                        <td colSpan="7" className="text-center">
                          <h4>No Open Positions available at this moment.</h4>
                        </td>
                      </tr>
                    )}
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
