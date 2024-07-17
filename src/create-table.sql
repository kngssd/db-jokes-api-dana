drop table IF EXISTS jokes_lines;


CREATE TABLE jokes_lines (
    id SERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    author VARCHAR(255) NOT NULL,
    creation_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);


    INSERT INTO jokes_lines (text, author) VALUES ('I told my wife she was drawing her eyebrows too high. She looked surprised.', 'John Doe');
    INSERT INTO jokes_lines (text, author) VALUES ('Why do not scientists trust atoms? Because they make up everything!', 'Jane Smith');
    INSERT INTO jokes_lines (text, author) VALUES ('Parallel lines have so much in common. It’s a shame they’ll never meet.', 'Sam Brown');
    INSERT INTO jokes_lines (text, author) VALUES ('I threw a boomerang a few years ago. I now live in constant fear.', 'Alex Johnson');
    INSERT INTO jokes_lines (text, author) VALUES ('Why do not skeletons fight each other? They do not have the guts.', 'Emily Davis');
    INSERT INTO jokes_lines (text, author) VALUES ('What do you call fake spaghetti? An impasta.', 'Michael Lee');
    INSERT INTO jokes_lines (text, author) VALUES ('I would avoid the sushi if I was you. It’s a little fishy.', 'Sara White');
    INSERT INTO jokes_lines (text, author) VALUES ('Want to hear a joke about construction? I’m still working on it.', 'David Wilson');
    INSERT INTO jokes_lines (text, author) VALUES ('Why did the scarecrow win an award? Because he was outstanding in his field.', 'Chris Green');
    INSERT INTO jokes_lines (text, author) VALUES ('I used to play piano by ear, but now I use my hands.', 'Laura Moore');

select * from jokes_lines;
