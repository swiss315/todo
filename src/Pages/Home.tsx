import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "../Stylesheets/index.css";
import { FaEllipsisV } from "react-icons/fa";
import Dropdown from "react-bootstrap/Dropdown";
import AddTodo from "../Components/AddTodo.tsx";

function Home() {
  interface TodoItem {
    id: number;
    Header: string;
    description: string;
    status: "completed" | "active";
  }
  const [activeTab, setActiveTab] = useState("home");
  const [add, setAdd] = useState<Boolean>(false);
  const [data, setData] = useState<TodoItem[]>([
    {
      id: 1,
      Header: "Header1",
      description: "I want to the Job",
      status: "completed",
    },
    {
      id: 2,
      Header: "Header2",
      description: "I want to the Job",
      status: "active",
    },
    {
      id: 3,
      Header: "Header3",
      description: "I want to the Job",
      status: "completed",
    },
    {
      id: 4,
      Header: "Header4",
      description: "I want to the Job",
      status: "active",
    },
  ]);
  const [activedata, setActiveData] = useState<TodoItem[]>([]);

  console.log(data, activedata);

  const handleSelect = (tabKey: string) => {
    // Handle tab selection here
    // console.log(tabKey);
    setActiveTab(tabKey);
    const newfilter = data.filter((value) => {
      return value.status.includes(tabKey);
    });
    setAdd(false);
    setActiveData(newfilter);
  };

  const removeSecond = (id: number) => {
    // 👇️ current is the current state array

    const filtered = data.filter((obj) => {
      // 👇️ returns truthy for all elements that
      // don't have an id equal to 2
      return obj.id !== id;
    });
    setData(filtered);
    console.log(data);
  };

  const updateState = (id: number) => {
    const newState = data.map((obj) => {
      // 👇️ if id equals 2, update country property
      if (obj.id === id) {
        return { ...obj, status: "completed" };
      }

      // 👇️ otherwise return the object as is
      return obj;
    });

    setData(newState);
  };

  const create = (props: TodoItem) => {
    setData((current) => [...current, props]);
  };

  const listdata = data.map((data, index) => {
    return (
      <div
        className={`todo-list ${
          data.status === "completed" ? "completed-status" : "active-status "
        }`}
        key={index}
      >
        <div className="info-container d-flex">
          <div>
            <h2>{data.Header}</h2>
            {/* <p>description</p> */}
          </div>
          <div className="align-self-center">
            <Dropdown>
              <Dropdown.Toggle as="div" id="dropdown-basic">
                <FaEllipsisV />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item as="div">Edit</Dropdown.Item>
                <Dropdown.Item onClick={() => updateState(data.id)}>
                  Mark completed
                </Dropdown.Item>
                <Dropdown.Item
                  as="div"
                  className="bg-danger text-white"
                  onClick={() => removeSecond(data.id)}
                >
                  Delete
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <div className="status-container completed-status"></div>
      </div>
    );
  });

  return (
    <div style={{height:'100vh', backgroundColor: 'white'}}>
      <h3>todo</h3>
      <div className="todo-container">
        <Tabs
          defaultActiveKey={activeTab}
          onSelect={handleSelect}
          id="justify-tab-example"
          className="mb-3"
          justify
        >
          <Tab eventKey="home" title="ALL">
            {!add ? (
              <div className="tab-cont">
                <div className="function-header d-flex justify-content-between">
                  <button className="add-button" onClick={() => setAdd(true)}>
                    Add New
                  </button>
                  <button className="add-button" onClick={() => setAdd(true)}>
                    Edit
                  </button>
                </div>
                <div className="list-container">{listdata}</div>
              </div>
            ) : (
              <AddTodo onHide={() => setAdd(false)} create={create} />
            )}
          </Tab>
          <Tab eventKey="active" title="Active">
            <div className="tab-cont">
              <div className="function-header d-flex justify-content-between">
                <button className="add-button" onClick={() => setAdd(true)}>
                  Add New
                </button>
                <button className="add-button" onClick={() => setAdd(true)}>
                  Edit
                </button>
              </div>
              <div className="list-container">
                {activedata.map((data, index) => {
                  return (
                    <div
                      className={`todo-list ${
                        data.status === "completed"
                          ? "completed-status"
                          : "active-status "
                      }`}
                      key={index}
                    >
                      <div className="info-container d-flex">
                        <div>
                          <h2>{data.Header}</h2>
                          {/* <p>description</p> */}
                        </div>
                        <div className="align-self-center">
                          <Dropdown>
                            <Dropdown.Toggle as="div" id="dropdown-basic">
                              <FaEllipsisV />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <Dropdown.Item href="#/action-1">
                                Edit
                              </Dropdown.Item>
                              <Dropdown.Item href="#/action-2">
                                Mark completed
                              </Dropdown.Item>
                              <Dropdown.Item
                                href="#/action-3"
                                className="bg-danger text-white"
                              >
                                Delete
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                      </div>
                      <div className="status-container completed-status"></div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Tab>
          <Tab eventKey="completed" title="Completed">
            <div className="tab-cont">
              <div className="function-header d-flex justify-content-between">
                <button className="add-button" onClick={() => setAdd(true)}>
                  Add New
                </button>
                <button className="add-button" onClick={() => setAdd(true)}>
                  Edit
                </button>
              </div>
              <div className="list-container">
                {activedata.map((data, index) => {
                  return (
                    <div
                      className={`todo-list ${
                        data.status === "completed"
                          ? "completed-status"
                          : "active-status "
                      }`}
                      key={index}
                    >
                      <div className="info-container d-flex">
                        <div>
                          <h2>{data.Header}</h2>
                          {/* <p>description</p> */}
                        </div>
                        <div className="align-self-center">
                          <Dropdown>
                            <Dropdown.Toggle as="div" id="dropdown-basic">
                              <FaEllipsisV />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item href="#/action-1">
                                Edit
                              </Dropdown.Item>
                              <Dropdown.Item href="#/action-2">
                                Mark completed
                              </Dropdown.Item>
                              <Dropdown.Item
                                href="#/action-3"
                                className="bg-danger text-white"
                              >
                                Delete
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                      </div>
                      <div className="status-container completed-status"></div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default Home;
