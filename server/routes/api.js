const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const uuidv4 = require('uuid/v4');

// Connect
const connection = (closure) => {
  return MongoClient.connect('mongodb://localhost:27017/TaskManagerAppDB', (err, db) => {
    if (err) return console.log("connection error: - " + err);

    closure(db);
  });
};

// Error handling
const sendError = (err, res) => {
  response.status = 501;
  response.message = typeof err == 'object' ? err.message : err;
  res.status(501).json(response);
};

// Response handling
let response = {
  status: 200,
  data: [],
  message: null
};

router.get('/boardsUserIsShareWith', (req, res) => {
  // This is for testing until we have google authentication
  let tempUserId = "1";

  connection((db) => {
    let dbInstance = db.db('TaskManagerAppDB');
    dbInstance.collection('Boards')
      .find({
        $and: [{
          "boardMembers.id": tempUserId
        }, {
          "boardOwner.ownerId": { $ne: tempUserId }
        }]
      })
      .toArray()
      .then((boards) => {
        res.json(boards);
      })
      .catch((err) => {
        sendError(err, res);
      });
  });
});

router.get('/boardsUserIsManagerOf', (req, res) => {
  // This is for testing until we have google authentication
  let tempUserId = "1";

  connection((db) => {
    let dbInstance = db.db('TaskManagerAppDB');
    dbInstance.collection('Boards')
      .find({
        "boardOwner.ownerId": tempUserId
      })
      .toArray()
      .then((boards) => {
        res.json(boards);
      })
      .catch((err) => {
        sendError(err, res);
      });
  });
});

router.get('/userTasks', (req, res) => {
  // This is for testing until we have google authentication
  let tempUserId = "1";

  connection((db) => {
    let dbInstance = db.db('TaskManagerAppDB');
    dbInstance.collection('Boards')
      .find({
        $and: [{
          "boardMembers.id": tempUserId
        }, {
          "tasks.ownerId": tempUserId
        }]
      })
      .toArray()
      .then((boards) => {        
        let taskArrays = boards.map(board => board.tasks.filter(task => task.ownerId === tempUserId));        
        let result = [];
        taskArrays.forEach(element => {                  
          element.forEach(arr => {            
            result.push(arr);
          });
        });
        res.json(result);
      })
      .catch((err) => {
        sendError(err, res);
      });
  });
});

router.get('/board/:boardId', (req, res) => {
  const boardId = req.params.boardId;

  connection((db) => {
    let dbInstance = db.db('TaskManagerAppDB');
    dbInstance.collection('Boards')
      .find({
        "boardId": boardId
      })
      .toArray()
      .then((board) => {
        res.json(board[0]);
      })
      .catch((err) => {
        sendError(err, res);
      });
  });
});

router.get('/users/all', (req, res) => {
  const boardId = req.params.boardId;

  connection((db) => {
    let dbInstance = db.db('TaskManagerAppDB');
    dbInstance.collection('Users')
      .find()
      .toArray()
      .then((users) => {
        res.json(users);
      })
      .catch((err) => {
        sendError(err, res);
      });
  });
});

router.post('/board/saveBoard', (req, res) => {
  // This is for testing until we have google authentication
  let tempUserId = "1";
  const board = req.body;

  board.boardId = uuidv4();

  connection((db) => {
    let dbInstance = db.db('TaskManagerAppDB');
    dbInstance.collection('Boards')
      .insertOne(board)
      .then(() => {
        console.log("board saved");
        res.status(200).json({});
      })
      .catch((err) => {
        sendError(err, res);
      });
  });
});

router.post('/addNewTask', (req, res) => {
  const task = req.body
  task.taskId = uuidv4();
  
  connection((db) => {
    let dbInstance = db.db('TaskManagerAppDB');
    dbInstance.collection('Boards').update(
      {"boardId": task.boardId},
      {"$push": {"tasks": task}}
    ).then((board) => {
      res.json(board[0]);
    })
    .catch((err) => {
      sendError(err, res);
    });
  });
});

router.post('/updateTask', (req, res) => {
  const task = req.body

  connection((db) => {
    let dbInstance = db.db('TaskManagerAppDB');
    dbInstance.collection('Boards').updateOne(
      { "boardId": task.boardId, "tasks.taskId": task.taskId},
      {"$set": {"tasks.$": task}}
    ).then((board) => {
      res.status(200).json({});
    })
    .catch((err) => {
      sendError(err, res);
    });
  });
});

module.exports = router;
