import React, { useState } from 'react'
import '../Stylesheets/index.css'
import '../Stylesheets/addtodo.css'

function AddTodo({onHide, create}) {
    const [data, setData] = useState<object>({
        Header: '',
        description: '',
        status: 'active'
    })
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
                <input type='text' placeholder='Enter Title' onChange={(e) => setData({...data, Header: e.target.value})}/>
            </div>
            <div className='input-container'>
                <label>
                    Description
                </label>
                <textarea rows={3} onChange={(e) => setData({...data, description: e.target.value})}/>
            </div>
            <div className='text-end'>
                <button onClick={(e) => {e.preventDefault(); create(data); onHide()}}>
                    Submit
                </button>
            </div>
        </form>
    </div>
  )
}

export default AddTodo