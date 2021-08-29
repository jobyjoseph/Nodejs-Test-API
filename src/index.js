const express = require("express");
const cors = require("cors");

const app = express();

// Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
let posts = [
  {
    id: 1,
    title: "Mercedes GLS",
    description: "Big SUV from Mercedes",
  },
  {
    id: 2,
    title: "BMW 3 Series",
    description: "Best sedan from BMW",
  },
];
app.get("/", (req, res) => {
  res.send("CRUD operations at /posts end point");
});

app.post("/posts", (req, res) => {
  const post = req.body;
  post.id = posts.length + 1;
  posts.push(post);
  res.json({
    status: 200,
    message: "Post created",
    payload: post,
  });
});

app.get("/posts", (req, res) => {
  res.json(posts);
});

app.put("/posts/:postid", (req, res) => {
  let newPost = req.body;
  const postid = req.params.postid;
  posts.map((post, index) => {
    if (post.id == postid) {
      newPost = { ...post, ...newPost };
      posts[index] = newPost;
    }
  });
  res.json(newPost);
});

app.delete("/posts/:postid", (req, res) => {
  const postid = req.params.postid;
  posts = posts.filter((post, index) => {
    if (post.id == postid) {
      return false;
    }
    return true;
  });
  res.json({
    status: 200,
    message: `Post id: ${postid} deleted`,
  });
});

app.get("/posts/:postid", (req, res) => {
  const postid = req.params.postid;
  posts.map((post, index) => {
    if (post.id == postid) {
      res.json(post);
      return;
    }
  });
});

// Listen to port
const port = 9000;
app.listen(port, () =>
  console.log(`Hello world app listening on port ${port}!`)
);
