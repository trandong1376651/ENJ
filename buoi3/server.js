// const http = require("http");

// const url = require("url");

// bài 1
// const server = http.createServer((req, res) => {
//   res.writeHead(200, { "Content-Type": "text/plain" });
//   res.end("Hello HTTP Server");

// console.log("Method:", req.method);
// console.log("URL:", req.url);
// console.log("Headers:", req.headers);

// res.writeHead(200, { "Content-Type": "text/plain" });
// res.end("Request received");

// res.writeHead(200, { "Content-Type": "text/html" });
// res.end("<h1>Hello Node.js HTTP Server</h1>");

// const data = { message: "Hello JSON" };
// res.writeHead(200, { "Content-Type": "application/json" });
// res.end(JSON.stringify(data)
// );

// bài 2

// const parsedUrl = url.parse(req.url, true);

//   if (parsedUrl.pathname === "/search?q=nodejs") {
//     res.writeHead(200, { "Content-Type": "text/plain" });
//     res.end(`Search keyword: ${parsedUrl.query.q || ""}`);
//   } else {
//     res.writeHead(404, { "Content-Type": "text/plain" });
//     res.end("Missing search keyword");
//   }

// });

//bài 3
// const express = require('express');
// const app = express();
// const PORT = 3000;
// app.use(express.json()); 

// let users = [
//   { id: 1, name: "Nguyen Van A", age: 20 },
//   { id: 2, name: "Tran Van B", age: 22 }
// ];

// app.get('/users', (req, res) => {
//   res.status(200).json({
//     success: true,
//     data: users
//   });
// });

// app.get('/users/:id', (req, res) => {
//   const userId = parseInt(req.params.id, 10);
//   const user = users.find(u => u.id === userId);

//   if (!user) {
//     return res.status(404).json({ success: false, message: "User not found" });
//   }

//   res.status(200).json({ success: true, data: user });
// });

// app.post('/users', (req, res) => {
//   const { name, age } = req.body;

//   if (!name || !age || typeof age !== 'number') {
//     return res.status(400).json({ 
//       success: false, 
//       message: "Invalid input: 'name' is required and 'age' must be a number" 
//     });
//   }

//   const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
  
//   const newUser = { id: newId, name, age };
//   users.push(newUser);

//   res.status(201).json({ success: true, data: newUser, message: "User created" });
// });

// app.put('/users/:id', (req, res) => {
//   const userId = parseInt(req.params.id, 10);
//   const { name, age } = req.body;

//   const userIndex = users.findIndex(u => u.id === userId);

//   if (userIndex === -1) {
//     return res.status(404).json({ success: false, message: "User not found" });
//   }

//   users[userIndex] = {
//     ...users[userIndex],
//     name: name || users[userIndex].name,
//     age: age || users[userIndex].age
//   };

//   res.status(200).json({ 
//     success: true, 
//     data: users[userIndex], 
//     message: "User updated" 
//   });
// });

// app.delete('/users/:id', (req, res) => {
//   const userId = parseInt(req.params.id, 10);
//   const userIndex = users.findIndex(u => u.id === userId);

//   if (userIndex === -1) {
//     return res.status(404).json({ success: false, message: "User not found" });
//   }

//   users.splice(userIndex, 1);

//   res.status(200).json({ success: true, message: "User deleted successfully" });
// });

// app.use((req, res) => {
//   res.status(404).json({ success: false, message: "API Route Not Found" });
// });

// app.listen(PORT, () => {
//   console.log(`🚀 User Management API is running on http://localhost:${PORT}`);
// });


//bài 4
// const express = require('express');
// const app = express();
// const PORT = 3000;

// app.use(express.json());

// let products = [
//   { id: 1, name: "Laptop", price: 20000000 },
//   { id: 2, name: "Mouse", price: 500000 }
// ];

// app.get('/products', (req, res) => {
//   res.status(200).json({
//     success: true,
//     total: products.length,
//     data: products
//   });
// });

// app.get('/products/:id', (req, res) => {
//   const productId = parseInt(req.params.id, 10);

//   if (isNaN(productId)) {
//     return res.status(400).json({ success: false, message: "ID sản phẩm phải là con số" });
//   }

//   const product = products.find(p => p.id === productId);

//   if (!product) {
//     return res.status(404).json({ success: false, message: "Sản phẩm không tồn tại" });
//   }

//   res.status(200).json({ success: true, data: product });
// });

// app.post('/products', (req, res) => {
//   const { name, price } = req.body;

//   if (!name || typeof name !== 'string' || name.trim() === '') {
//     return res.status(400).json({ success: false, message: "Tên sản phẩm không hợp lệ" });
//   }

//   if (price === undefined || typeof price !== 'number' || price < 0) {
//     return res.status(400).json({ success: false, message: "Giá sản phẩm phải là số lớn hơn hoặc bằng 0" });
//   }

//   const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
//   const newProduct = { id: newId, name: name.trim(), price };

//   products.push(newProduct);

//   res.status(201).json({
//     success: true,
//     message: "Thêm sản phẩm thành công",
//     data: newProduct
//   });
// });

// app.put('/products/:id', (req, res) => {
//   const productId = parseInt(req.params.id, 10);
//   if (isNaN(productId)) {
//     return res.status(400).json({ success: false, message: "ID sản phẩm không hợp lệ" });
//   }

//   const productIndex = products.findIndex(p => p.id === productId);
//   if (productIndex === -1) {
//     return res.status(404).json({ success: false, message: "Sản phẩm không tồn tại" });
//   }

//   const { name, price } = req.body;

//   if (price !== undefined && (typeof price !== 'number' || price < 0)) {
//     return res.status(400).json({ success: false, message: "Giá sản phẩm không hợp lệ" });
//   }

//   products[productIndex] = {
//     ...products[productIndex],
//     name: name && typeof name === 'string' ? name.trim() : products[productIndex].name,
//     price: price !== undefined ? price : products[productIndex].price
//   };

//   res.status(200).json({
//     success: true,
//     message: "Cập nhật sản phẩm thành công",
//     data: products[productIndex]
//   });
// });

// app.delete('/products/:id', (req, res) => {
//   const productId = parseInt(req.params.id, 10);
//   if (isNaN(productId)) {
//     return res.status(400).json({ success: false, message: "ID sản phẩm không hợp lệ" });
//   }

//   const productIndex = products.findIndex(p => p.id === productId);
//   if (productIndex === -1) {
//     return res.status(404).json({ success: false, message: "Sản phẩm không tồn tại" });
//   }

//   const [deletedProduct] = products.splice(productIndex, 1);

//   res.status(200).json({
//     success: true,
//     message: "Xóa sản phẩm thành công",
//     data: deletedProduct
//   });
// });

// app.use((req, res) => {
//   res.status(404).json({ success: false, message: "API Route Not Found" });
// });

// app.listen(PORT, () => {
//   console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
// });

//Bài 5
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let todos = [
  { id: 1, title: "Học Node.js", completed: false },
  { id: 2, title: "Làm bài tập", completed: true }
];

app.get('/todos', (req, res) => {
  res.status(200).json({
    success: true,
    total: todos.length,
    data: todos
  });
});

app.get('/todos/:id', (req, res) => {
  const todoId = parseInt(req.params.id, 10);

  if (isNaN(todoId)) {
    return res.status(400).json({ success: false, message: "ID phải là chữ số hợp lệ" });
  }

  const todo = todos.find(t => t.id === todoId);
  if (!todo) {
    return res.status(404).json({ success: false, message: "Không tìm thấy Todo" });
  }

  res.status(200).json({ success: true, data: todo });
});

app.post('/todos', (req, res) => {
  const { title, completed } = req.body;

  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ success: false, message: "Title không được để trống" });
  }

  const newId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1;
  const newTodo = {
    id: newId,
    title: title.trim(),
    completed: typeof completed === 'boolean' ? completed : false
  };

  todos.push(newTodo);

  res.status(201).json({
    success: true,
    message: "Thêm Todo thành công",
    data: newTodo
  });
});

app.put('/todos/:id', (req, res) => {
  const todoId = parseInt(req.params.id, 10);
  if (isNaN(todoId)) {
    return res.status(400).json({ success: false, message: "ID không hợp lệ" });
  }

  const index = todos.findIndex(t => t.id === todoId);
  if (index === -1) {
    return res.status(404).json({ success: false, message: "Không tìm thấy Todo" });
  }

  const { title, completed } = req.body;

  if (title !== undefined && (typeof title !== 'string' || title.trim() === '')) {
    return res.status(400).json({ success: false, message: "Title không hợp lệ" });
  }

  if (completed !== undefined && typeof completed !== 'boolean') {
    return res.status(400).json({ success: false, message: "Completed phải là kiểu Boolean (true/false)" });
  }

  todos[index] = {
    ...todos[index],
    title: title !== undefined ? title.trim() : todos[index].title,
    completed: completed !== undefined ? completed : todos[index].completed
  };

  res.status(200).json({
    success: true,
    message: "Cập nhật Todo thành công",
    data: todos[index]
  });
});

app.delete('/todos/:id', (req, res) => {
  const todoId = parseInt(req.params.id, 10);
  if (isNaN(todoId)) {
    return res.status(400).json({ success: false, message: "ID không hợp lệ" });
  }

  const index = todos.findIndex(t => t.id === todoId);
  if (index === -1) {
    return res.status(404).json({ success: false, message: "Không tìm thấy Todo" });
  }

  const [deletedTodo] = todos.splice(index, 1);

  res.status(200).json({
    success: true,
    message: "Xóa Todo thành công",
    data: deletedTodo
  });
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: "API Route Not Found" });
});

app.listen(PORT, () => console.log(`🚀 Server chạy tại http://localhost:${PORT}`));

server.listen(3000);
