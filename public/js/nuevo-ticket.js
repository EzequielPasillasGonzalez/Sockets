const socket = io()

const lblNuevoTicket = document.querySelector("#lblNuevoTicket")
const btnCrear = document.querySelector("button")

socket.on('connect', () => { // El on es para escuchar un evento
    console.log('Conectado');    

    btnCrear.disabled = false
})

socket.on('disconnect', () => {
    console.log('Desconectado del servidor');

    btnCrear.disabled = true
})

socket.on('ultimo_ticket', (ultimo) => {    

    lblNuevoTicket.innerText = 'Ticket ' + ultimo
})


btnCrear.addEventListener('click', () => {

    socket.emit( 'siguiente_ticket', null, ( ticket ) => {
        lblNuevoTicket.innerText = ticket
    })             // El emit es para emitir un evento
})