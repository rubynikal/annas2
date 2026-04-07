<script>
    let ping = $state("");

    const listenPings = () => {
        const eventSource = new EventSource("/api/pings/stream")

        eventSource.onmessage = (event) => {
            console.log("got ping:", event.data);
            ping = event.data;
        }

    }

    if (!import.meta.env.SSR){
        listenPings();
    }
</script>

<p>aaaaaaaaaaaaaaaaa {ping}</p>