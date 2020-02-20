//funcion que pide los datos al servidor, se activa con un boton al seleccionar usuario
function requestData(){
    
    //declaro mis variables para completar el formulario con la URL proporcionada para el uso de la api
    let id = document.getElementById('number').value //obtengo desde el selector el usuario del cual quiero la información y la guardo en la variable id
    let api= `https://api.bnext.io/partner_test/user?id=${id}` //guardo en la variable api la URL proporcionada completandola con la variable id usando template literals   
    
  //Se obtiene la información para completar el formulario desde la URL de la API con Fetch
  
  fetch(`${api}`,{
        method:'GET', 
        headers: {
            'X-WEB-KEY' : 'Development'
        } 

    })
    // si la respuesta del seridor es correcta devuelve la informacion en formato json
    .then(response => response.json())
    // completa el formulario con los datos que recibió del servidor
    .then(data => {
        
        document.getElementById('form').style.display = 'none'  //oculta el selector
        document.getElementById('data').style.display = 'grid' //muestra el formulario
        document.getElementById('name_received').value=data.data.name //asigna el nombre que se obtuvo del servidor al campo nombre del formulario
        document.getElementById('surname_received').value=data.data.surname //asigna el apellido que se obtuvo del server al campo apellido del formulario
        document.getElementById('email_received').value=data.data.email //asigna el email que se obtuvo del servidor al campo del email en el formulario
        document.getElementById('phone_received').value=data.data.phone //asigna el numero del telefono que se obtuvo del servidor al campo de telefono del formulario
        document.getElementById('age_received').value=data.data.age//asigna la edad que se obtuvo del servidor al campo edad del formulario
    })
    .catch(() => {
        
        document.querySelector('.userNo').style.display = 'grid' //muestra el mensaje de no encontrado
        document.getElementById('data').style.display = 'none' //oculta el formulario

    })



   

    
    

            

}
//funcion que refresca la pagina
function refresh(){
    location.reload();
}





// funcion que coloca la fecha actual

var fecha = new Date();
var anio = fecha.getFullYear();
var dia = fecha.getDate();
var _mes = fecha.getMonth();
_mes = _mes + 1;
if (_mes < 10)
{ var mes = "0" + _mes;}
else
{ var mes = _mes.toString;}
document.getElementById("loan_date").min = anio+'-'+mes+'-'+dia; 



// funcion para enviar datos qu se activa con el evento submit del formulario
let myForm = document.querySelector('.form') //guardo mi formulario en una variable

// en espera del evento submit
myForm.addEventListener('submit',()=>{
   
    event.preventDefault()//evita la recarga de pagina al hacer submit
        //se configura la dirección de la api para el POST 
        let id = document.getElementById('number').value
        let api_url = `https://api.bnext.io/partner_test/user/${id}`
        
            //se obtienen lo datos del formulario y se almacenan en variables para su uso posterior
            let name = document.getElementById('name_received').value
            let surname = document.getElementById('surname_received').value
            let email = document.getElementById('email_received').value
            let phone = document.getElementById('phone_received').value
            let amount = document.getElementById('loan_amount').value
            let date = document.getElementById('loan_date').value
            let weeks = document.getElementById('loan_weeks').value
            let age = document.getElementById('age_received').value
    
    
        //uso de fetch para conectar al servidor 
        fetch(api_url,{
            method: 'POST', //metodo para envio de datos al server
            headers: {
                'X-WEB-KEY': 'Development'
            },
    
            //se convierte el texto en formato JSON
            body: JSON.stringify({
                'id': id, 
                'name':name, 
                'surname': surname, 
                'email':email,
                'phone':phone,
                'age':age,
                'loan_amount':amount,
                'loan_weeks':weeks,
                'loan_date':date
            }),
            cache: 'no-cache'
        })
        //se espera la respuesta del servidor y se guarda en un JSON
        .then(response => response.json())
        //se confirma codigo del success para mostrar agradecimiento y resumen de los datos enviados
        .then(data => {
            console.log('data = ', data)
            console.log(data['code'])
            if(data['code']==201){
                // funcion que muestra el mensaje de agradecimiento
                document.querySelector('.userThanks').style.display ='grid'
                document.querySelector('.form').style.display = 'none'
                 
              
                
            }
    
        })
        //para el error al envio de los datos se presenta un mensaje

        .catch(() => {
        
            document.querySelector('.userNo').style.display = 'grid' //muestra el mensaje de no encontrado
            document.getElementById('data').style.display = 'none' //oculta el formulario
    
        })
    
        
        
    


})







