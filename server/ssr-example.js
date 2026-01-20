
export const ssrHandler = async (c) => {
    let x = Math.random();
    return c.html(`
        <html>
            <body>
                <h1>TEST ${x}</h1>
            </body>
        </html>
        `)
}