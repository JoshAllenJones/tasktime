import React, { useState, useEffect } from "react";
import axios from "axios";

import { useRecoilValue, useRecoilState } from "recoil";

import { Layout, Row, Col, Card } from "antd";
import { Menu, Space } from "antd";

import { taskListAtom } from "./atoms/taskListAtom";
import { projectListAtom } from "./atoms/projectListAtom";

import ReactMarkdown from "react-markdown";

import TaskCard from "./components/TaskCard/TaskCard";
import TaskEntry from "./components/TaskEntry/TaskEntry";
import SubBlock from "./components/SubBlock/SubBlock";
const { Header, Footer, Sider, Content } = Layout;

//https://egghead.io/lessons/react-create-and-style-a-list-of-data-with-react

//https://egghead.io/lessons/react-create-and-style-a-list-of-data-with-react

const App = () => {
  const [taskList, setTaskList] = useRecoilState(taskListAtom);
  const [projectList, setProjectList] = useRecoilState(projectListAtom);
  useEffect(() => {
    axios
      .get("/projects")
      .then(function (response) {
        // handle success
        //   setProjectList((content) => [...content, response] )
        console.log("SUCCESS RESPOONSEEEEEEEEEEEE");
        setProjectList(response.data.projects);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
    axios
        .get('/tasks/1')
        .then(function(resp){
            console.log(resp.data.task_list)
            setTaskList(resp.data.task_list)
        })
        .catch(function(error){
            console.log(error)
        })
        .then(function(){

        })
  }, [setProjectList, setTaskList]);



  function onMenuClick(e) {
    // 'e' returns an object that can be unpacked into 4 things
    // item, key, keyPath, domEvent
    console.log(e.key);
  }



  return (
    <div style={{height: "100vh"}}>
      <Row justify="center">
        <Col span={4}>
            <Menu items={projectList} theme="light" onClick={onMenuClick} />
        </Col>
        <Col span={20}>
            <Row>
              <Col span={24}>
                  <TaskEntry />
              </Col>

            {taskList.map((task) => (
                  <TaskCard key={task.task_id} task={task} /> 
            ))}
            </Row>
        </Col>
      </Row>

    </div>
  );
};

export default App;
