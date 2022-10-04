// aqui va todo el código

/* const btnElement = document.getElementById("add-task-btn")
console.log(btnElement)

if(btnElement){
    btnElement.addEventListener("click", function(){

    })
} */
//agarrar el elemento form

const deleteTask = async (id) =>{
    console.log("llamando", id);
    console.log("holaaaaaaaaaaaaaaaaaaaaaa")
    const taskListElement = document.getElementById("task-list")
    const elementToDelete = document.getElementById(id)
    const token = localStorage.getItem('token')

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
        if (result.isConfirmed) {
        

            const response = await fetch('https://graco-task-list.herokuapp.com/task/'+id, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                }
            })
        
            if(response.status === 200){
                taskListElement.removeChild(elementToDelete)
            }
            Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
    })

    
    
    
    
    

    
}
const btnClearAll = document.getElementById("btnClearAll")
btnClearAll.addEventListener("click", async ()=>{
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then(async(result) => {
        if (result.isConfirmed) {
            const token = localStorage.getItem('token')

            const response = await fetch('https://graco-task-list.herokuapp.com/task/delete/all', {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                }
            })
            if(response.status !== 200){
                const data = response.json()
                Swal.fire(
                    'Algo salio mal',
                    `${data.error}`,
                    'error'
                    )
                return

            }
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
            init()
        }
    })
})
const taskListElement = document.getElementById("task-list")

const formElement= document.getElementById("task-form")
const selectElement = document.getElementById("taskPriority")
const inputElement = document.getElementById("taskName")
const taskDateElement = document.getElementById("taskDate")


/* if(formElement){
    //modificar el evento
    
    formElement.addEventListener("submit",function(event){
        event.preventDefault()
        const inputElement = document.getElementById("taskName")
        const taskDateElement = document.getElementById("taskDate")
        
        
        if(inputElement.value !== "" && taskDateElement.value !== ""){
            // agarrar el elemento de la lista
            
            const selectElement = document.getElementById("taskPriority")



            const taskListElement = document.getElementById("task-list")
            const taskListTitle= document.getElementById("card-title")
            


            console.log(selectElement.value)
            console.log(inputElement.value)
            console.log()
            const myDate= Date.parse(taskDateElement.value)

            

            let  mayorId= 1

            if(taskListElement.children.length > 0){
                const ultimoHijo= taskListElement.children[taskListElement.children.length - 1]
                mayorId += parseInt(ultimoHijo.id)
            }
            let backgroundColor = ""

            if(selectElement.value < 3){
                backgroundColor = "background-color: blue; color: white;"
            }else if(selectElement.value > 2 && selectElement.value < 5 ){
                backgroundColor = "background-color: yellow; "
            }else{
                backgroundColor = "background-color: red; color: white;"
            }
            
            
            
            taskListElement.innerHTML +=`
                <li id="${mayorId}"  class="list-group-item d-flex justify-content-between align-items-center"
                style="word-break: keep-all; ${backgroundColor}">
                    <div class="mx-2 text-start" style="flex: 1;">
                        <div class="fw-bold">${inputElement.value}</div>
                        <div class="fw-bold">${taskDateElement.value}</div>                        
                    </div>
                    <span class="badge bg-primary rounded-pill mx-1">${selectElement.value}</span>
            
                    <button onclick="deleteTask(${mayorId})" type="button" class="btn btn-outline-danger btn-sm">
                        <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20px" height="20px">
                            <path d="M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z" />
                        </svg>
                    </button>
                </li>
            `
        }else{
            alert("Debe especificar una tarea y fecha")
        } 
    })

} */
const buttonAdd = document.getElementById("add-task-btn")

buttonAdd.addEventListener("click",async()=>{
    if(selectElement.value !== "" && inputElement.value !== "" && taskDateElement.value !== ""){
        
        const newTask = {
            "name": inputElement.value,
            "date": taskDateElement.value ,
            "priority": selectElement.value
        }
        const token = localStorage.getItem('token')
        const response = await fetch('https://graco-task-list.herokuapp.com/task', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify( newTask )
        })
        const data = await response.json()

        if(response.status === 200){
            Swal.fire(
                'Exito!',
                'Registro Exitoso',
                'success'
            )
            init()
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${data.error}`,
                footer: ''
            })
        }

    }else{
        Swal.fire(
            'Campos Vacios',
            'Debe llenar todos los campos requeridos!',
            'error'
        )
    }
})

const btnSignOff = document.getElementById("btnSignOff")

btnSignOff.addEventListener("click",()=>{



    Swal.fire({
        title: 'Seguro que quiere cerrar sesion?',
        text: "Los datos no guardados se perderan",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Cerrar Sesion!'
    }).then(async(result) => {
        if (result.isConfirmed) {
            localStorage.removeItem("token")
            window.location.href = "/"
        }

    })
})

const init = async () =>{
    
    const token = localStorage.getItem('token')

    taskDateElement.value = ""
    selectElement.value = ""
    inputElement.value =""

    if(!token){
        location.href = "/"
        return
    }

    btnClearAll.style.display = "none"


    const reponse = await fetch('https://graco-task-list.herokuapp.com/task',{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    const data = await reponse.json()
    console.log(data.data)

    taskListElement.innerHTML = ""
    
    for(let i=0; i<data.data.length; i++ ){
        if(data.data[i].priority < 3){
            backgroundColor = "background-color: blue; color: white;"
        }else if(data.data[i].priority > 2 && data.data[i].priority < 5 ){
            backgroundColor = "background-color: yellow; "
        }else{
            backgroundColor = "background-color: red; color: white;"
        }
        
        taskListElement.innerHTML +=`
        
        <li id="${data.data[i]._id}" class="list-group-item d-flex justify-content-between align-items-center"
        style="word-break: keep-all; ${backgroundColor}">
            <div class="mx-2 text-start" style="flex: 1;">
                <div class="fw-bold">${data.data[i].name}</div>
                <div class="fw-bold">${data.data[i].date}</div>                        
            </div>
            <span class="badge bg-primary rounded-pill mx-1">${data.data[i].priority}</span>
    
            <button onclick="deleteTask('${data.data[i]._id}')" type="button" class="btn btn-outline-danger btn-sm">
                <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20px" height="20px">
                    <path d="M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z" />
                </svg>
            </button>
        </li>
        `
        
    }
    const cardTitle = document.getElementById("card-title")
    let cont = taskListElement.children.length 
    cardTitle.innerHTML = `Listado de tareas: ${cont}`  
    
    if(data.data.length !== 0 ){
        btnClearAll.style.display = "block"
    }

    
    console
}
init()









// extraer los datos nombre de la tarea y prioridad



// agregar el nuevo hijo

{/* <li class="list-group-item d-flex justify-content-between align-items-center"
    style="word-break: keep-all;">
        <div class="mx-2 text-start" style="flex: 1;">
            <div class="fw-bold">Pasear al perro</div>
        </div>
        <span class="badge bg-primary rounded-pill mx-1">2</span>

        <button type="button" class="btn btn-outline-danger btn-sm">
            <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20px" height="20px">
                <path d="M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z" />
            </svg>
        </button>
</li> */}
