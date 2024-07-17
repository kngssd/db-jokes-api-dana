import { app } from "./support/setupExpress.js";
import { query } from "./support/db.js";
// import { setupARouteHandlerDemonstratingValidationWithZod } from "./zodDemo/setupARouteHandlerDemonstratingValidationWithZod.js";

let jokes = [
    {
        author: "Dana",
        text: "When two vegans get in an argument, is it still called a beef?",
        id: 1,
    },
    {
        author: "Caspar",
        text: "Shout out to my fingers. I can count on all of them.",
        id: 2,
    },
    {
        author: "AlexBD",
        text: "You think swimming with sharks is expensive? Swimming with sharks cost me an arm and a leg.",
        id: 3,
    },
    {
        author: "Olu",
        text: "I asked my Chinese friend what it's like to live in China. He says he can't complain.",
        id: 4,
    },
    {
        author: "Paul",
        text: "What did 50 Cent do when he got hungry? 58.",
        id: 5,
    },
    {
        author: "Neill",
        text: "I ordered a chicken and an egg from Amazon. I'll let you know.",
        id: 6,
    },
    {
        author: "Bukola",
        text: "I hate my job. All I do is crush cans all day. It is just... Soda pressing.",
        id: 7,
    },
    {
        author: "Pamela",
        text: "My son asked me what procrastinate means. I said: “I will tell you later.”",
        id: 8,
    },
];

app.get("/jokes", async (request, response) => {
    const dbResult = await query("select * from jokes_lines");
    response.json(dbResult.rows);
});

// app.get("/jokes/search", (request, response) => {
//     const searchTerm = request.query.term;
//     if (!searchTerm) {
//         response.status(400).json({ error: "no search term" });
//         return;
//     }
//     console.log(request.query);

//     const matchingJokes = jokes.filter((jokes) =>
//         jokes.text.includes(searchTerm)
//     );
//     response.status(500).json({ msg: "db search not implemented yet" });
// });

app.get("/jokes/search/:id", (request, response) => {
    const id = Number(request.params.id);
    const note = jokes.find((note) => note.id === id);

    if (note) {
        response.json(note);
    } else {
        response.status(404).end();
    }
});

app.delete("/jokes/:id", (request, response) => {
    const id = Number(request.params.id);
    jokes = jokes.filter((note) => note.id !== id);
    response.status(204).end();
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
