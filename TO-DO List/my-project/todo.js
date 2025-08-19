// function taskOrganizer() {
//             const divtask = document.getElementById('task-list');
//             divtask.innerHTML = '';

//             const taskListManager = JSON.parse(localStorage.getItem('todos')) || [];

//             taskListManager.forEach((item, index) => {
//                 const taskdiv = document.createElement('div');
//                 taskdiv.innerHTML = `
//             <div>
//                 <span><strong>${item.name}</strong | ${item.date}</span><br>
//                 <p>${item.task}</p>
//                 <button onclick="deleteTask(${index})">❌ Delete</button>
//             </div>
//         `;
//                 divtask.appendChild(taskdiv);
//             });
//         }

//         function deleteTask(index) {
//             const tasks = JSON.parse(localStorage.getItem("todos")) || [];
//             tasks.splice(index, 1);
//             localStorage.setItem("todos", JSON.stringify(tasks));
//             taskOrganizer();
//         }

//         document.querySelector('form').addEventListener('submit', function (e) {
//             e.preventDefault();

//             const name = document.getElementById('name').value;
//             const date = document.getElementById('date').value;
//             const task = document.getElementById('task').value;

//             const newTask = { name, date, task };
//             const tasks = JSON.parse(localStorage.getItem('todos')) || [];

//             tasks.push(newTask);
//             localStorage.setItem("todos", JSON.stringify(tasks));

//             taskOrganizer();
//             document.querySelector('form').reset();
//         })

//         window.onload = taskOrganizer;






const { createServer } = require('node:http');
const { readFile } = require('fs');
const { join } = require('path');

const hostname = '127.0.0.1';
const port = 3000;

const server = createServer((req, res) => {
  if (req.url === '/' || req.url === '/TO-DO2.html') {
    const filePath = join(__dirname, 'TO-DO2.html');
    readFile(filePath, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Server Error');
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(data);
      }
    });
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Page Not Found');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
