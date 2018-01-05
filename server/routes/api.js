const express = require('express');
const router = express.Router();

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
    res.json([{
        title: "פרוייקט גמר",
        boardId: 2
      },{
        title: "ארגון יום הולדת לעדי",
        boardId: 3
      },{
        title: "פרוייקט גמר",
        boardId: 2
      },{
        title: "ארגון יום הולדת לעדי",
        boardId: 3
      },{
        title: "פרוייקט גמר",
        boardId: 2
      },{
        title: "ארגון יום הולדת לעדי",
        boardId: 3
      }]);
});

router.get('/boardsUserIsManagerOf', (req, res) => {
  res.json([{
      title: "לוח בניהולי 1",
      boardId: 4
    },{
      title: "לוח בניהולי 2",
      boardId: 5
    }]);
});

router.get('/userTasks', (req, res) => {  
  res.json([{
    title: "להזמין כרטיסים",
    boardName: "יציאה לסרט",
    boardId: 1,
    owner: "אדם מורג",
    overallTime: 6,
    remainingTime: 4
  }, {
    title: "לדאוג לרכב",
    boardName: "יציאה לסרט",
    boardId: 1,
    owner: "אדם מורג",
    overallTime: 6,
    remainingTime: 4        
  },{
    title: "לצאת בזמן",
    boardName: "יציאה לסרט",
    boardId: 1,
    owner: "אדם מורג",
    overallTime: 6,
    remainingTime: 0
  }, {
    title: "לראות את הסרט",
    boardName: "יציאה לסרט",
    boardId: 1,
    owner: "אדם מורג",
    overallTime: 16,
    remainingTime: 4        
  }]);
});

router.get('/board/:boardId', (req, res) => {
  setTimeout(() => {
    
  
  res.json({
    boardName: "הלוח של אדם",
    boardMembers: [
      "אדם",
      "יעל",
      "אריאל",
      "אופיר",
      "נאור"
    ],
    tasks: [{      
      boardId: 5,
      boardName: "הלוח של אדם",
      owner: "אדם",
      title: "נוסעים לסרט",
      status: 'waiting',
      overallTime: 6,
      remainingTime: 4
    }, {
      boardId: 5,
      boardName: "הלוח של אדם",
      owner: "אדם",
      title: "חוזרים מהסרט",
      status: 'waiting',
      overallTime: 6,
      remainingTime: 4
    },{
      boardId: 5,
      boardName: "הלוח של אדם",
      owner: "אדם",
      title: "מזמינים כרטיסים",
      status: 'done',
      overallTime: 6,
      remainingTime: 4
    },
    {
      boardId: 5,
      boardName: "הלוח של אדם",
      owner: "אדם",
      title: "מזמינים כרטיסים",
      status: 'active',
      overallTime: 6,
      remainingTime: 4
    }]  
  });
}, 10000);
});

module.exports = router;