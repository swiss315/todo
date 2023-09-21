import React, { useEffect, useState } from 'react'
import '../Stylesheets/index.css'
import '../Stylesheets/addtodo.css'



function AddTodo({onHide, create, editinfo }) {
    interface TodoItem {
        id: number;
        Header: string;
        description: string;
        status: "completed" | "active";
      }
    const [data, setData] = useState<TodoItem>({
        id: 0,
        Header: '',
        description: '',
        status: 'active'
    })

    console.log(editinfo);
    
      // Use useEffect to set initial data when editing
      useEffect(() => {
        if (editinfo) {
          setData(editinfo);
        }
      }, [editinfo]);
    
  return (
    <div>
        <div className='text-start back-container'>
                <button className='add-button back-button' onClick={onHide}>
                    Back
                </button>
            </div>
        <form className='editform'>
            <div className='input-container'>
                <label>
                    Title
                </label>
                <input type='text' placeholder='Enter Title' value={data.Header} onChange={(e) => setData({...data, Header: e.target.value})}/>
            </div>
            <div className='input-container'>
                <label>
                    Description
                </label>
                <textarea rows={3} value={data.description} onChange={(e) => setData({...data, description: e.target.value})}/>
            </div>
            <div className='text-end'>
                <button onClick={(e) => {e.preventDefault(); create(data, editinfo); onHide()}}>
                    Submit
                </button>
            </div>
        </form>
    </div>
  )
}

export default AddTodo