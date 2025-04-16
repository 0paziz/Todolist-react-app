import React, { useState } from 'react';


function Todolist() {
  const Dark_icon= document.getElementById("dark-icon");
  const Light_icon= document.getElementById("light-icon");

  const [userInput, setUserInput] = useState('');
  const [tasks, setTasks] = useState([]); 
  const [filteredTasks, setFilteredTasks] = useState([]);

  const handleCheckboxChange = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);


  };


  
  React.useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]);



  const addtask = () => {
    if (!userInput.trim()) { return;  }

    const newTask = {    text: userInput.trim(),   completed: false, };
    const addedNewTask = [...tasks, newTask];  setTasks(addedNewTask);
   setUserInput('');
  };



  function deleteCompletedtasks(){
    const active= tasks.filter((task)=> !task.completed);
    setTasks(active);
  }

  function showActiveTasks(){
    const active= tasks.filter((task)=> !task.completed);
    setFilteredTasks(active);
  }

  function showAllTasks(){
    setFilteredTasks(tasks);
  }

  function ShowcompleteTasks(){
   const completed= tasks.filter((task)=> task.completed)
   setFilteredTasks(completed);
   
  }

  function deleteCurrentTask(index){
    const deletdTask=  tasks.filter((task,i) => i !== index)
    setTasks(deletdTask);

  }





   const setDark= ()=>{
    document.querySelector("body").setAttribute("data-theme", "dark");
  }

  
  const setLight= ()=>{
    document.querySelector("body").setAttribute("data-theme", "light");
  }

const setDark_theme = ()=>{
  document.getElementById("bg-desktop").src="./images/bg-desktop-dark.jpg";

    setDark();
   Dark_icon.style.display="none";
  Light_icon.style.display="block";

}


const setlight_theme = ()=>{
  document.getElementById("bg-desktop").src="./images/bg-desktop-light.jpg";
  setLight();
 Dark_icon.style.display="block";
  Light_icon.style.display="none";
}



  return (
    <main id='todo-list'>
      <div className='logo-container'>
        <h1 id='logo'>T O D O</h1>
  <div className='toggle-icons-container'>
  <img onClick={setDark_theme} className='toggle-icon' id='dark-icon' src='./images/icon-moon.svg' alt='dark mode toggle' />
  <img src="./images/icon-sun.svg" className='toggle-icon' id='light-icon' onClick={setlight_theme} alt='light mode toggle' ></img>

  </div>

 
   
   
      </div>

      <div className='input-container'>
        <div className='input-group'>
          <input
            type='text'
            id='input'
            value={userInput}
            onChange={(event) => setUserInput(event.target.value)}
            placeholder='Create a new todo'
          />
        </div>

        <button onClick={addtask} id='addBtn'>
          +
        </button>
      </div>

      <div className='tasks-container' id='container-task-holder'>
        {filteredTasks.map((task, index) => (
          <div key={index} className='task'>
            <input
              type='checkbox'
              checked={task.completed}
              onChange={() => handleCheckboxChange(index)}
            />
            <div className='tasks-list'>
            <span  className={task.completed ? 'completeTask' : 'uncompleteTask'}  >
              {task.text}  
            </span>
            <button className='deletebtn' onClick={()=>deleteCurrentTask(index)}> <img id='icon-cross' src='./images/icon-cross.svg' alt='cross icon'></img>  </button>
            </div>
           


          </div>
        ))}
      </div>

      <div className='container-settings'>
        <div className='task-setting'>
          <p id='items-left'>
            <span id='NoOf-items-left'>
              {tasks.filter((task) => !task.completed).length}
            </span>{' '}
            items left
          </p>

          <div className='task-menu'>
          <button className='settingbtn' onClick={showAllTasks}  > <span id='all'>All</span></button>
            <a> <button className='settingbtn' onClick={showActiveTasks} >Active</button> </a>
            <a> <button className='settingbtn' onClick={ShowcompleteTasks} >Completed</button>  </a>
          </div>

          <a ><button className='settingbtn' onClick={deleteCompletedtasks} >Clear Completed</button> </a>
        </div>
      </div>
    </main>
  );
}

export default Todolist;
