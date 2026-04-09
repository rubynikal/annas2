<script>
    let messages = $state([]);
    let message = $state("");

    const sendMessage = async() => {
        await fetch("/api/sse/messages", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({message})
        })
    }

    const getMessages = async() => {
        const eventSource = new EventSource("/api/sse/messages"); //pings/stream

        eventSource.onmessage = (event) => {
            const newMessage = JSON.parse(event.data);
            messages = [newMessage, ...messages];
            messages = messages.slice(0, 10);
        }
    }

    if (!import.meta.env.SSR){
        getMessages();
    }
</script>

<p>Chat</p>

<input type="text" bind:value={message}>
<button onclick={()=>sendMessage()}>Send</button>

<ul>
    {#each messages as message}
    <li>{message.message}</li>
    {/each}
</ul>