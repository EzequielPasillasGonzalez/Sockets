const socket = io()

// Get the current URL
const searchParams = new URLSearchParams(window.location.search);

// Referencias HTML
const lblEscritorio = document.querySelector('h1')
const bntnAtender = document.querySelector('button')
const lblTicket = document.querySelector('small')
const divAlerta = document.querySelector('.alert')
const lblPendientes = document.querySelector('#lblPendientes')

if ( !searchParams.has('escritorio')){
    window.location = "index.html"

    throw new Error('El escritorio es obligatorio')
}

const escritorio = searchParams.get('escritorio')

lblEscritorio.innerText = escritorio

divAlerta.style.display = 'none'

socket.on('connect', () => { // El on es para escuchar un evento
    console.log('Conectado');    

    bntnAtender.disabled = false
})

socket.on('disconnect', () => {
    console.log('Desconectado del servidor');

    bntnAtender.disabled = true
})

socket.on('tickets_pendientes', (payload) => {    
    lblPendientes.innerText = payload
})


bntnAtender.addEventListener('click', () => {    

    socket.emit('solicitar_ticket', { escritorio }, ( {ok, body} ) =>{ 

        if( !ok ){
            lblTicket.innerText = 'nadie'    
            return divAlerta.style.display = ''
        }        

        lblTicket.innerText = `Ticket ` + body.numero

    }) 
})