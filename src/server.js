import { app } from "./support/setupExpress.js";
import { query } from "./support/db.js";
// import { setupARouteHandlerDemonstratingValidationWithZod } from "./zodDemo/setupARouteHandlerDemonstratingValidationWithZod.js";

app.get("/jokes", async (request, response) => {
    const dbResult = await query("select * from jokes_lines");
    response.json(dbResult.rows);
});

app.post("/jokes", async (request, response) => {
    console.log("dana say POST /jokes");
    const newJoke = request.body;

    //TODO: validate with zod or joi
    const safeJoke = {
        text: newJoke.text,
        author: newJoke.author,
    };

    const dbResult = await query(
        "INSERT INTO jokes_lines (text, author) VALUES ($1, $2) returning *",
        [safeJoke.text, safeJoke.author]
    );

    if (dbResult.rowCount !== 1) {
        response
            .status(500)
            .json({ error: "something went wrong didn't get 1 row" });
        return;
    }
    response.json(dbResult.rows[0]);
});

//An example route that makes an SQL query to the db.
app.get("/db-check", async (req, res) => {
    try {
        const dbResult = await query("select * from my_table");
        res.json(dbResult.rows);
    } catch (error) {
        console.error("error handling db-check: ", error);
    }
});

const PORT = process.env.PORT ?? 4000;
app.listen(PORT, () => {
    console.log(
        `Your express app started listening on ${PORT}, at ${new Date()}`
    );
});
