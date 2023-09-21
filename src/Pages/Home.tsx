import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "../Stylesheets/index.css";
import { FaEllipsisV } from "react-icons/fa";
import Dropdown from "react-bootstrap/Dropdown";
import AddTodo from "../Components/AddTodo.tsx";
// import { log } from "console";

function Home() {
  interface TodoItem {
    id: number;
    Header: string;
    description: string;
    status: "completed" | "active";
  }
  const [activeTab, setActiveTab] = useState("home");
  const [add, setAdd] = useState<Boolean>(false);
  const [editid, setEdit] = useState<TodoItem | {}>({})
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

  const edit = (props: number) => { 
    setAdd(true)
    let found =data.find(obj => {
    return obj.id === props;
  }) || {}
  console.log(found);
  setEdit(found)
}

  // console.log(data, activedata);

  const handleSelect = (tabKey: string) => {
    setActiveTab(tabKey);
    const newfilter = data.filter((value) => {
      return value.status.includes(tabKey);
    });
    setAdd(false);
    setActiveData(newfilter);
  };

  const removeSecond = (id: number) => {
    const filtered = data.filter((obj) => {
      return obj.id !== id;
    });
    setData(filtered);
    console.log(data);
  };

  const updateState = (id: number, info: string, section: string) => {
    if (section === 'Active') {
      console.log(info);
      
      if (info === "active") {
        const newState = data.map((obj) => {
          if (obj.id === id) {
            return { ...obj, status: "active" } as TodoItem;
          }
          return obj;
        });
        console.log(newState, 'active');
        setData(newState)
        const newfilter = newState.filter((value) => {
          return value.status.includes('completed');
        });
        console.log(newfilter, 'active');
        
        setActiveData(newfilter);
      } else {
        const newState = data.map((obj) => {
          if (obj.id === id) {
            return { ...obj, status: "completed" } as TodoItem;
          }
          return obj;
        });
        console.log(newState, 'completed');
        
        setData(newState)
        const newfilter = newState.filter((value) => {
          return value.status.includes('active');
        });
        console.log(newfilter, 'completed');
        setActiveData(newfilter);
      }

    } else {
      if (info === "completed") {
        const newState = data.map((obj) => {
          if (obj.id === id) {
            return { ...obj, status: "completed" } as TodoItem;
          }
          return obj;
        });
  
        setData(newState);
      } else {
        const newState = data.map((obj) => {
          if (obj.id === id) {
            return { ...obj, status: "active" } as TodoItem;
          }
          return obj;
        });
        setData(newState);
      }
    }
    
  };

  const create = (props: TodoItem, editinfo: TodoItem) => {
    if (Object.keys(editinfo).length === 0) {
      setData((current) => [...current, props]);
    } else {
      const newState = data.map((obj) => {
        if (obj.id === editinfo.id) {
          return { ...obj, status: "active", Header: props.Header, description: props.description } as TodoItem;
        }
        return obj;
      });
      setData(newState)
    }

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
                <Dropdown.Item as="div" onClick={() => edit(data.id)}>Edit</Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    data.status === "completed"
                      ? updateState(data.id, "active", "All")
                      : updateState(data.id, "completed", "All");
                  }}
                >
                  {data.status === "completed"
                    ? "Mark active"
                    : "Mark completed"}
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
    <div style={{ height: "100vh", backgroundColor: "white" }}>
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
                  <button className="add-button" onClick={() => {setAdd(true); setEdit({})}}>
                    Add New
                  </button>
                  <button className="add-button" onClick={() => setAdd(true)}>
                    Edit
                  </button>
                </div>
                <div className="list-container">{listdata}</div>
              </div>
            ) : (
              <AddTodo onHide={() => setAdd(false)} create={create} editinfo={editid}  />
            )}
          </Tab>
          <Tab eventKey="active" title="Active">
          {!add ? (
              <div className="tab-cont">
              <div className="function-header d-flex justify-content-between">
                <button className="add-button" onClick={() => {setAdd(true); setEdit({})}}>
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
                              <Dropdown.Item as="div" onClick={() => edit(data.id)}>Edit</Dropdown.Item>
                              <Dropdown.Item
                                onClick={() => {
                                  data.status === "completed"
                                    ? updateState(data.id, "active", 'Active')
                                    : updateState(data.id, "completed", 'Active');
                                }}
                              >
                                {data.status === "completed"
                                  ? "Mark active"
                                  : "Mark completed"}
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
                })}
              </div>
            </div>
            ) : (
              <AddTodo onHide={() => setAdd(false)} create={create} editinfo={editid} />
            )}
            
          </Tab>
          <Tab eventKey="completed" title="Completed">
          {!add ? (
              <div className="tab-cont">
              <div className="function-header d-flex justify-content-between">
                <button className="add-button" onClick={() => {setAdd(true); setEdit({})}}>
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
                              <Dropdown.Item as="div" onClick={() => edit(data.id)}>Edit</Dropdown.Item>
                              <Dropdown.Item
                                onClick={() => {
                                  data.status === "completed"
                                  ? updateState(data.id, "active", 'Active')
                                  : updateState(data.id, "completed", 'Active');
                                }}
                              >
                                {data.status === "completed"
                                  ? "Mark active"
                                  : "Mark completed"}
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
                })}
              </div>
            </div>
            ) : (
              <AddTodo onHide={() => setAdd(false)} create={create} editinfo={editid} />
            )}
            
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default Home;
