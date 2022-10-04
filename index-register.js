const nameUser = document.getElementById("nameRegister")
const lastNameUser = document.getElementById("lastnameRegister")
const emailUser = document.getElementById("emailRegister")
const passwordUser = document.getElementById("passwordRegister")


const buttonRegister = document.getElementById("buttonRegister")

buttonRegister.addEventListener("click", async ()=>{
    console.log("holaaaaaa")
    if(nameUser.value !== "" && lastNameUser.value !== "" && emailUser.value !== "" && passwordUser.value !==""){
        const newUser = {
            "name": nameUser.value, 
            "lastName": lastNameUser.value,
            "email": emailUser.value,
            "password": passwordUser.value 
        }
    
        
        
        try {
            
            const response = await fetch('https://graco-task-list.herokuapp.com/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify( newUser )
            })
    
            const data = await response.json()
            console.log(data)
            data.error

            if(response.status ===200){
                Swal.fire(
                    'Exito!',
                    'Registro Exitoso',
                    'success'
                )
                window.location.href = "/" 
            }else if(response.status === 404){
                Swal.fire({
                    icon: 'error',
                    title: 'usuario o contraseña es incorrecto',
                    text: `${data.error}`,
                    footer: ''
                })
            
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${data.error}`,
                    footer: ''
                })
            }
        
        } catch (data) {
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

