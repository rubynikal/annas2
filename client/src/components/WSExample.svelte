<script>
    let message = $state("");
    let messages = $state([]);
    let connection;

    const reconnect = () => {
        setTimeout(() => {
            connection.close();
            openConnection();
        }, 500);
    }

    const openConnection = async() => {
        connection = new WebSocket("/api/pings/ws");
        connection.onopen = (event) => {
            messageFromServer = "Connected!"
        }
        connection.onmessage = (event) => {
            const newMessage = JSON.parse(event.data);
            messages = [newMessage, ...messages];
        }
        connection.onclose = () => {
            reconnect();
        }
        connection.onerror = () => {
            reconnect();
        }
    }

    const sendMessage = async () => {
        connection.send(JSON.stringify({message}));
        message = "";
    } 


    if (!import.meta.env.SSR){
        openConnection();
    }

</script>

<p>WS example</p>

<input type="text" bind:value={message}>
<button onclick={()=>sendMessage()}>Send</button>

<ul>
    {#each messages as messageItem}
    <li>{messageItem.message}</li>
    {/each}
</ul>