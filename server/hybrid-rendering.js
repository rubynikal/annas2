const getInitialItems = async () => {
    const items = [];
    for (let i = 0; i < 10; i++){
        items.push({name:`Item Nr. ${i}`});
        await new Promise((resolve) => setTimeout(resolve, 20));
    }
    return items;
}

const getRemainingItems = async () => {
    const items = [];
    for (let i = 0; i < 90; i++){
        items.push({name:`Item Nr. ${i}`});
        await new Promise((resolve) => setTimeout(resolve, 20));
    }
    return items;
}

export function registerHybridRoute(app){
    app.get('/items/remaining', async (c) => {
        const items = await getRemainingItems();
        return c.json(items);
    });

    app.get('/hybrid', async (c) => {
        const items = await getInitialItems();
        return c.html(`<html>
    <head>
        <script>
            document.addEventListener("DOMContentLoaded", async () => {
                const list = document.getElementById('list');
                const items = await fetch("/items/remaining");
                const json = await items.json();
                for (const item of json) {
                    const li = document.createElement("li");
                    li.textContent = item.name;
                    list.appendChild(li);
                }
            })
        </script>
    </head>
    <body>
        <ul id="list">
            ${items.map((item) => `<li>${item.name}</li>`)}
        </ul>
    </body>    
</html>`);
    });
}
