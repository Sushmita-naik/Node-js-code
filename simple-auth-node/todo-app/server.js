console.log("Starting server...");
const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

function loadTasks() {
    try {
        const data = fs.readFileSync('tasks.json','utf8');
        return data ? JSON.parse(data) : [];
    }
    catch {
        return [];
    }
}
function saveTasks(tasks) {
    fs.writeFileSync('tasks.json', JSON.stringify(tasks,null,2));
}

app.get('/tasks',(req,res)=> {
    const tasks = loadTasks();
    res.json(tasks);
});
app.post('/tasks',(req,res) => {
    const { title } =req.body;
    if(!title) return res.status(400).send('Task title required');

    const tasks = loadTaks();
    const nweTask = { id: Date.now() , title , completed: false };
    tasks.push(newTask);
    saveTasks(tasks);
    res.send(newTask);
});

app.put('/tasks/:id', (req , res)=> {
    const { id } = req.params;
    const { completed }=req.body;

    const tasks = loadTasks();
    const task = tasks.find(t => t.id == id);
    if (!task) return res.status(404).send('task not found');

    task.completed = completed;
    saveTasks(tasks);
    res.send(task);
});

app.delete('/tasks/:id', (req , res)=> {
    const { id } = req.params;

    let tasks = loadTasks();
    const taskIndex = tasks.findIndex(t => t.id == id);
    if (taskIndex === -1) return res.status(404).send('Task not found');

    const deletedTask = tasks.splice(taskIndex,1);
    saveTasks(tasks);
    res.send(deletedTask[0]);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));