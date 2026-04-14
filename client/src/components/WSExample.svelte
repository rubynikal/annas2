<script>
    let message = $state("");
    let messageFromServer = $state("");
    let connection;

    const openConnection = async() => {
        connection = new WebSocket("/api/pings/ws");
        connection.onopen = (event) => {
            messageFromServer = "Connected!"
        }
        connection.onmessage = (event) => {
            messageFromServer = event.data
        }
    }

    const sendMessage = async () => {
        connection.send(message);
        mesage = "";
    } 


    if (!import.meta.env.SSR){
        openConnection();
    }

</script>

<p>WS example</p>

<input type="text" bind:value={message}>
<button onclick={()=>sendMessage()}>Send</button>

<p>Test: {messageFromServer}</p>