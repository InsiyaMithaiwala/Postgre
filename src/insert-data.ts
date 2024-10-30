import { getClient } from "./utils";

async function createEntries() {
    const client = await getClient();

    // User 1 details
    const insertUserText = 'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id';
    const user1Values = ['john.doe@gmail.com', 'hashed_password_1'];

    // Insert User 1
    let response1 = await client.query(insertUserText, user1Values);

    // User 1's Todo
    const insertTodoText = 'INSERT INTO todos (title, description, user_id, done) VALUES ($1, $2, $3, $4) RETURNING id';
    const todo1Values = ['Buy groceries', 'Milk, bread, and eggs', response1.rows[0].id, false];
    await client.query(insertTodoText, todo1Values);

    // User 2 details
    const user2Values = ['jane.doe@gmail.com', 'hashed_password_2'];

    // Insert User 2
    let response2 = await client.query(insertUserText, user2Values);

    // User 2's Todo
    const todo2Values = ['Finish project', 'Complete the due tasks for the project', response2.rows[0].id, false];
    await client.query(insertTodoText, todo2Values);

    console.log("Entries for two users created!");
}

createEntries();
