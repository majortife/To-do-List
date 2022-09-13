import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
// import { useState } from 'react'

function App() {
  const[activity, setActivity] = useState("")
  const[time, setTime] = useState("");
  const[date, setDate] = useState("")
  const[tasklist, setTasklist] =useState([])
  const[activeIndex, setActiveIndex] = useState()
  const[isEditing, setIsEditing] = useState(false)
  
  const handleSubmit = (e) =>{
    e.preventDefault()
    if (!activity || !date || !time) {
      alert("fill all inputs")
    }
    const newTask = {activity, date, time , done:false}
    setTasklist([...tasklist, newTask])
   setDate('')
   setTime('')
   setActivity('')
  }
  
  const editRow = (rowId) => {
    setIsEditing(true)
    const data = tasklist[rowId]
    setActiveIndex(rowId)
    setActivity(data.activity)
    setDate(data.date)
    setTime(data.time)
    task ={ activity,date,time,done:false}
  }
  const handleEdit = (e) =>{
    e.preventDefault()
    const editedTask = {activity, date, time}
    const newTasklist =[...tasklist]
    newTasklist[activeIndex] = editedTask
    setTasklist(newTasklist)
    setIsEditing(false)
    setActivity('')
    setDate('')
    setTime('')
  }
  const handleDelete = (rowId) =>{
    const newTasklist = [...tasklist]
    newTasklist.splice(rowId, 1)
        setTasklist(newTasklist)
  }
  const handleDone = (index) =>{
  const newTasklist = [...tasklist]
  newTasklist[index].done = ! tasklist[index].done
  setTasklist(newTasklist)
  }
  return (
    <div>
    <h1 className='text-success' >To-Do list</h1>
   <form action="" onSubmit={(e) => isEditing? handleEdit(e) : handleSubmit(e)}>
   <input type="text" placeholder='Enter Activity' value={activity} onChange={(event) => setActivity(event.target.value) } />
    <input type="date"  value={date} onChange={(event) =>setDate(event.target.value)}/>
    <input type="time"  value={time} onChange={(event) => setTime(event.target.value)}/>
    <button  class-name="btn btn-danger" type='submit' >{isEditing? 'Edit' : 'Add'} </button>
   
   </form>
   
  <div>
    <table >
      <thead>
        <tr>
          <th>S/N</th>
          <th>Activity</th>
          <th>Date</th>
          <th>Time</th>
          <th>Edit</th>
          <th>Delete</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
      { tasklist.map((task, index) =>
          <tr key={index}>
          <td>{index +1} </td>
          <td id='outer'> <input type="checkbox" id='check' checked={task.done} onChange={()=>handleDone(index)} />{task.activity} </td>        
                <td>{new Date(task.date).toLocaleDateString()}</td>
          <td>{task.time}</td>
          <td> {task.done? 'done' : 'pending'}  </td>
          <td> <button onClick={() =>editRow(index) } className="btn btn-success" >Edit</button></td>
          <td> <button onClick={() => handleDelete(index)} className="btn btn-danger">Delete</button></td>

        </tr>
       )}
      </tbody>
    </table>
  </div>

  </div>
  )
}

export default App
