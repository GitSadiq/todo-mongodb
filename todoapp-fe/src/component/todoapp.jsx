import React, { useEffect, useState } from "react";
import axios from "axios";
import { BiMessageAdd } from "react-icons/bi";
import { RiDeleteBin5Fill, RiChatDeleteFill } from "react-icons/ri";
import { AiFillEdit, AiOutlineFileDone } from "react-icons/ai";

export default function ToDoApp() {
  const [text, setText] = useState({ item: "" });
  const [task, setTask] = useState([]);
  const [flag, setFlag] = useState(true);
  const [editId, setEditId] = useState();

  const CallGetApi = async () => {
    const resp = await axios.get("http://localhost:4000/todo/get");
    try {
      setTask(resp.data.data);
      // console.log(resp.data.data);
    } catch (error) {
      // console.log(error);
    }
  };

  const CallPostApi = async () => {
    // console.log("ye mila create", text);
    const resp = await axios.post("http://localhost:4000/todo/create", text);
    try {
      CallGetApi();
      setText({ item: "" });
      // console.log("created");
    } catch (error) {
      // console.log(resp);
    }
  };

  const CallEditApi = async (id) => {
    const resp = await axios.get(`http://localhost:4000/todo/get?id=${id}`);
    // console.log(resp.data.data);
    setEditId(id);
    try {
      setText(resp.data.data);
      // console.log(resp.data.data.item);
    } catch (error) {
      // console.log(error);
    }
  };

  const CallPutApi = async () => {
    // console.log("ye mila", text);
    const resp = await axios.put(
      `http://localhost:4000/todo/update?id=${editId}`,
      text
    );
    try {
      // console.log("put", resp);
      CallGetApi();
      setText({ item: "" });
      setEditId("");
      setFlag(!flag);
    } catch (error) {
      // console.log(resp);
    }
  };

  const CallDeleteApi = async (id) => {
    const resp = await axios.delete(
      `http://localhost:4000/todo/delete?id=${id}`
    );
    try {
      CallGetApi();
    } catch (error) {
      // console.log(error);
    }
  };

  const CallDeleteAllApi = async (id) => {
    const resp = await axios.delete(`http://localhost:4000/todo/delete`);
    try {
      CallGetApi();
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    CallGetApi();
  }, []);

  const handleDelete = (id) => {
    CallDeleteApi(id);
  };

  const handleEdit = (id) => {
    CallEditApi(id);
    setFlag(!flag);
  };

  return (
    <div className="todo-body">
      <h2>ToDo Application</h2>
      <div className="input_container">
        <input
          className="input_field"
          type="text"
          placeholder="Enter Item"
          onChange={(e) => {
            flag
              ? setText({ item: e.target.value })
              : setText({ item: e.target.value });
          }}
          value={text.item}
        />
        {flag ? (
          <button
            onClick={() => {
              CallPostApi();
            }}
          >
            <BiMessageAdd />
          </button>
        ) : (
          <button
            onClick={() => {
              CallPutApi();
            }}
          >
            <AiOutlineFileDone />
          </button>
        )}
        <button onClick={() => CallDeleteAllApi()}>
          <RiDeleteBin5Fill />
        </button>
      </div>
      {task ? (
        task.map((item, index) => {
          return (
            <div key={item._id} className="listed_item_container">
              <span>{item.item}</span>

              <button onClick={() => handleEdit(item._id)}>
                <AiFillEdit />
              </button>
              <button onClick={() => handleDelete(item._id)}>
                <RiChatDeleteFill />
              </button>
            </div>
          );
        })
      ) : (
        <div></div>
      )}
    </div>
  );
}
