import "./style.css"
interface Todo{
  title:string,
  isCompleted:boolean,
  readonly id:string,
}

const todos:Todo[]=[]
const todoContainer=document.querySelector(".todocontainer") as HTMLDivElement  //this is typer assertion in typescript

const todoInput=document.getElementsByName("title")[0] as HTMLInputElement
const myForm=document.getElementById("myForm") as HTMLFormElement

myForm.onsubmit=(e:SubmitEvent)=>{
  e.preventDefault();
  const todo:Todo={
    title:todoInput.value,
    isCompleted:false,
    id:String(Math.random()*1000)
  }
  todos.push(todo);
  todoInput.value="";
  renderTodo(todos);
    
}
const deleteTodo=(id:string)=>{
  const idx=todos.findIndex((item)=>item.id===id);
  todos.splice(idx,1);
  renderTodo(todos)
}
const generateTodoItem=(title:string,isCompleted:boolean,id:string)=>{
  const todo:HTMLDivElement=document.createElement("div");
  todo.className="todo";
  const checkBox:HTMLInputElement=document.createElement("input");
  checkBox.setAttribute("type","checkBox");
  checkBox.className="isCompleted";
  checkBox.checked=isCompleted;
  checkBox.onchange=()=>{
    todos.find((item)=>{
      if(item.id===id){
        item.isCompleted=checkBox.checked;
      }
    })
    paragraph.className=checkBox.checked?"textCut":"";
  }
  const btn:HTMLButtonElement=document.createElement("button");
  btn.innerText="X";
  btn.className="deleteBtn"
  btn.onclick=()=>{
    deleteTodo(id);
  }
  const paragraph:HTMLParagraphElement=document.createElement("p");
  paragraph.innerText=title;
  todo.append(checkBox,paragraph,btn)
  todoContainer.append(todo);
}


const renderTodo=(todos:Todo[])=>{
  todoContainer.innerText="";
  todos.forEach(item=>{
    generateTodoItem(item.title,item.isCompleted,item.id);
  })
}