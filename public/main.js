let socket = io.connect('http://localhost:8080', { forceNew: true });
let mensajesMemory = [];
sendMensaje = () => {
  const msje = document.getElementById('txtMensaje').value;
  const token = document.getElementById('token').value;

  const mensaje = msje.toLowerCase();

  socket.emit('new-message', { mensaje, token });
};

const renderizar = mensaje => {
  let mensajesHTML = '';
  mensajesMemory.forEach(mensaje => {
    mensajesHTML += `
    <li class="border float-left ">
        <p class="fw-bolder text-primary float-left ">${mensaje.tipo}</p>  <p col-sm-6 float-left">${mensaje.msge}</p>
    </li>
`;
  });

  document.getElementById('ulMensajes').innerHTML = mensajesHTML;
};

socket.on('err-message', mensaje => {
  mensajesMemory.push(mensaje);
  renderizar(mensajesMemory);
});

socket.on('resp-message', async mensaje => {
  mensajesMemory.push(mensaje);
  renderizar(mensajesMemory);
});
