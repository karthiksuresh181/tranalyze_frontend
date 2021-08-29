import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";
const axios = require("axios");

function DashboardCustom(props) {
  const [pnlChartData, setPnlChartData] = React.useState({});

  let options = {
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    tooltips: {
      backgroundColor: "#f5f5f5",
      titleFontColor: "#333",
      bodyFontColor: "#666",
      bodySpacing: 4,
      xPadding: 12,
      mode: "nearest",
      intersect: 0,
      position: "nearest",
    },
    responsive: true,
    scales: {
      yAxes: [
        {
          gridLines: {
            drawBorder: false,
            color: "rgba(225,78,202,0.1)",
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 0,
            suggestedMax: 0,
            padding: 20,
            fontColor: "#9e9e9e",
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            drawBorder: false,
            color: "rgba(225,78,202,0.1)",
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 0,
            fontColor: "#9e9e9e",
          },
        },
      ],
    },
  };

  const getPnlData = () => {
    axios
      .get("http://192.168.0.106:9995/api/v1/futures/get_pnl_data")
      .then((res) => {
        setPnlChartData({
          labels: res.data["labels"],
          datasets: [
            {
              label: "PNL",
              fill: true,
              backgroundColor: "rgba(56, 117, 214, 0.5)",
              hoverBackgroundColor: "rgba(56, 117, 214, 0.2)",
              borderColor: "#3875d6",
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              data: res.data["pnl"],
            },
            {
              label: "Profit",
              fill: true,
              backgroundColor: "rgba(72, 161, 77, 0.5)",
              hoverBackgroundColor: "rgba(72, 161, 77, 0.2)",
              borderColor: "#48a14d",
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              data: res.data["profit"],
            },
            {
              label: "Loss",
              fill: true,
              backgroundColor: "rgba(208, 33, 61, 0.5)",
              hoverBackgroundColor: "rgba(208, 33, 61, 0.2)",
              borderColor: "#d0213d",
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0,
              data: res.data["loss"],
            },
          ],
        });
      });
  };

  React.useEffect(() => {
    getPnlData();
  }, []);

  return (
    <>
      <div className="content">
        <Row>
          <Col xs="12">
            <Card className="card-chart">
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    <h5 className="card-category">Trade Analysis</h5>
                    <CardTitle tag="h2">Recent Trades</CardTitle>
                  </Col>
                  <Col sm="6">
                    <ButtonGroup
                      className="btn-group-toggle float-right"
                      data-toggle="buttons"
                    >
                      <Button
                        tag="label"
                        // className={classNames("btn-simple", {
                        //   active: bigChartData === "data1",
                        // })}
                        color="info"
                        id="0"
                        size="sm"
                        // onClick={() => setBgChartData("data1")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          7 days
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-single-02" />
                        </span>
                      </Button>
                      <Button
                        color="info"
                        id="1"
                        size="sm"
                        tag="label"
                        // className={classNames("btn-simple", {
                        //   active: bigChartData === "data2",
                        // })}
                        // onClick={() => setBgChartData("data2")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          30 days
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-gift-2" />
                        </span>
                      </Button>
                      <Button
                        color="info"
                        id="2"
                        size="sm"
                        tag="label"
                        // className={classNames("btn-simple", {
                        //   active: bigChartData === "data3",
                        // })}
                        // onClick={() => setBgChartData("data3")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          3 months
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-tap-02" />
                        </span>
                      </Button>
                    </ButtonGroup>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Bar data={pnlChartData} options={options} />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default DashboardCustom;
