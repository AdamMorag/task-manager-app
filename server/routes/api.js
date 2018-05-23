const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const uuidv4 = require('uuid/v4');
const request = require('request-promise-native');

// dbname
const dbName = 'FlowDB';

// Connect
const connection = (closure) => {
  return MongoClient.connect('mongodb://localhost:27017/' + dbName, (err, db) => {
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

router.get('/boardsUserIsShareWith/:userId', (req, res) => {
  const UserId = req.params.userId;

  connection((db) => {
    let dbInstance = db.db(dbName);
    dbInstance.collection('Boards')
      .find({
        $and: [{
          "boardMembers.uid": UserId
        }, {
          "boardOwner.uid": { $ne: UserId }
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

router.get('/boardsUserIsManagerOf/:userId', (req, res) => {
  const UserId = req.params.userId;

  connection((db) => {
    let dbInstance = db.db(dbName);
    dbInstance.collection('Boards')
      .find({
        "boardOwner.uid": UserId
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

router.get('/userTasks/:userId', (req, res) => {
  const UserId = req.params.userId;

  connection((db) => {
    let dbInstance = db.db(dbName);
    dbInstance.collection('Boards')
      .find({
        $and: [{
          "boardMembers.uid": UserId
        }, {
          "tasks.owner.uid": UserId
        }]
      })
      .toArray()
      .then((boards) => {
        let taskArrays = boards.map(board => board.tasks.filter(task => task.owner.uid === UserId));
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
    let dbInstance = db.db(dbName);
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

router.get('/board/delete/:boardId', (req, res) => {
  const boardId = req.params.boardId;

  connection((db) => {
    let dbInstance = db.db(dbName);
    dbInstance.collection('Boards')
      .deleteOne({
        "boardId": boardId
      })
      .then((response) => {
        res.json(response);
      })
      .catch((err) => {
        sendError(err, res);
      });
  });
});

router.get('/users/all', (req, res) => {
  connection((db) => {
    let dbInstance = db.db(dbName);
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
  const board = req.body;

  board.boardId = uuidv4();

  connection((db) => {
    let dbInstance = db.db(dbName);
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

router.get('/board/assignTasks/:boardId', (req, res) => {
  const boardId = req.params.boardId;

  connection((db) => {
    let dbInstance = db.db(dbName);
    dbInstance.collection('Boards')
      .find({
        "boardId": boardId
      })
      .toArray()
      .then((boards) => {
        if (!boards || boards.length === 0) {
          res.status(500).json({ message: "Failed to find board" });
          return;
        }
        return boards[0];
      }).then((board) => {
        if (!board)
          return;

        const boardMembers = board.boardMembers.map(m => m.uid);

        return dbInstance.collection('Calendars')
          .find({
            "uid": {
              $in: [...boardMembers]
            }
          })
          .toArray()
          .then(calenders => {
            return {
              board: board,
              usersCalendars: calenders
            };
          });
      })
      .then(requestObj => {
        var options = {
          method: 'POST',
          uri: 'http://localhost:8080/RunGA',
          body: requestObj,
          json: true // Automatically stringifies the body to JSON
        };

        return request(options);
      }).then((board) => {
        if (!board)
          return;

        return dbInstance.collection('Boards').updateOne({ "boardId": board.boardId },
          {
            $set: {
              tasks: board.tasks
            }
          })
          .then(() => {
            res.status(200).json(board);
          });
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
    let dbInstance = db.db(dbName);
    dbInstance.collection('Boards').update(
      { "boardId": task.boardId },
      { "$push": { "tasks": task } }
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
    let dbInstance = db.db(dbName);
    dbInstance.collection('Boards').updateOne(
      { "boardId": task.boardId, "tasks.taskId": task.taskId },
      { "$set": { "tasks.$": task } }
    ).then((board) => {
      res.status(200).json({});
    })
      .catch((err) => {
        sendError(err, res);
      });
  });
});

router.post('/updateUser', (req, res) => {
  const user = req.body

  connection((db) => {
    let dbInstance = db.db(dbName);
    dbInstance.collection('Users').update(
      { "uid": user.uid }, // TODO: when we have authentication
      user,
      { "upsert": true }).then((user) => {
        console.log("user updates");
        res.json(user[0]);
      })
      .catch((err) => {
        sendError(err, res);
      });

    dbInstance.collection('Boards').update(
      { "boardOwner.uid": user.uid },
      { "$set": { "boardOwner": user } },
      {
        upsert: false,
        multi: true
      }
    ).then((owner) => {
      console.log("board owner updates");
    });

    dbInstance.collection('Boards').update(
      { "boardMembers.uid": user.uid },
      { "$set": { "boardMembers.$[elem]": user } },
      { "arrayFilters": [{ "elem.uid": user.uid }], "multi": true }
    ).then((owner) => {
      console.log("board member updates");
    });


    dbInstance.collection('Boards').update(
      { "tasks.owner.uid": user.uid },
      { "$set": { "tasks.$[elem].owner": user } },
      { "arrayFilters": [{ "elem.owner.uid": user.uid }], "multi": true }
    ).then((owner) => {
      console.log("tasks updates");
    });
  });
});

router.post('/removeTask', (req, res) => {
  const { boardId, taskId } = req.body

  connection((db) => {
    let dbInstance = db.db(dbName);
    dbInstance.collection('Boards').update(
      { "boardId": boardId },
      { "$pull": { "tasks": { "taskId": taskId } } }
    ).then((board) => {
      res.json(board[0]);
    })
      .catch((err) => {
        sendError(err, res);
      });
  });
});

router.post('/calendars/getUserCalendar', (req, res) => {
  const { userId, startTime, endTime } = req.body;

  connection((db) => {
    let dbInstance = db.db(dbName);
    dbInstance.collection('Calendars').find({
      "uid": userId
    })
      .toArray()
      .then(userCalendars => {
        // Validation
        if (!userCalendars || userCalendars.length === 0) {
          res.json([]);
          return;
        }

        let userEvents = userCalendars[0].events;

        if (startTime) {
          userEvents = userEvents.filter(ev => ev.startTime >= startTime && ev.endTime >= startTime);
        }

        if (endTime) {
          userEvents = userEvents.filter(ev => ev.startTime <= startTime && ev.endTime <= startTime);
        }

        res.json(userEvents);
      }).catch((err) => {
        sendError(err, res);
      });
  });
});

router.post('/calendars/saveEvent', (req, res) => {
  // This is for testing until we have google authentication
  const { userId, event } = req.body;

  event.eventId = uuidv4();

  connection((db) => {
    let dbInstance = db.db(dbName);
    dbInstance.collection('Calendars').update(
      { "uid": userId },
      { "$push": { "events": event } },
      { "upsert": true }).then((event) => {

        console.log("event saved");
        res.json(event[0]);
      })
      .catch((err) => {

        console.log("event failed");
        sendError(err, res);
      });
  });
});

router.post('/addUser', (req, res) => {
  const user = req.body

  connection((db) => {
    let dbInstance = db.db(dbName);
    dbInstance.collection('Users').update(
      { "uid": user.uid }, // TODO: when we have authentication
      user,
      { "upsert": true }).then((user) => {
        res.json(user[0]);
      })
      .catch((err) => {
        sendError(err, res);
      });
  });
});

router.post('/removeEvent', (req, res) => {
  const { userId, eventId } = req.body

  connection((db) => {
    let dbInstance = db.db(dbName);
    dbInstance.collection('Calendars').update(
      { "uid": userId },
      { "$pull": { "events": { "eventId": eventId } } }
    ).then((calender) => {
      res.json(calender[0]);
    })
      .catch((err) => {
        sendError(err, res);
      });
  });
});

router.post('/updateEvent', (req, res) => {
  const { userId, event } = req.body

  connection((db) => {
    let dbInstance = db.db(dbName);
    dbInstance.collection('Calendars').updateOne(
      { "uid": userId, "events.eventId": event.eventId },
      { "$set": { "events.$": event } }
    ).then((calender) => {
      res.status(200).json({});
    })
      .catch((err) => {
        console.log("event failed");
        sendError(err, res);
      });
  });
});

router.get('/users/:uid', (req, res) => {
  const userId = req.params.uid;

  connection((db) => {
    let dbInstance = db.db(dbName);
    dbInstance.collection('Users')
      .find({
        "uid": userId
      })
      .toArray()
      .then((user) => {
        res.json(user[0]);
      })
      .catch((err) => {
        sendError(err, res);
      });
  });
});


module.exports = router;
