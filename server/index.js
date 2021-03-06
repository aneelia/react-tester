const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const PORT = 3100;

const { tasks } = require('./fakeTasks');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.raw());
app.use(bodyParser.json());

app.get('/api/tasks', (req, res) => {
  res.json({ tasks });
});

const evaluateJavascriptTask = require('./runners/javascript-runner');

// Callee TestContainer.reducer
app.post('/api/tasks', (req, res) => {
  try {
    console.log(typeof req.body);

    console.log(req.body);
    const { id, code } = req.body; //TODO: why it is a string?
    const task = tasks.find(task => task.tabKey === id);

    if (task.mode.lang === 'javascript') {
      evaluateJavascriptTask(task, code);
    }
    
    // In case of success response should look like so
    // res.json({ok: true});
    return res.json({ ok: true });
  } catch (error) {
    console.error(error);
    // In case of error response should look like so
    res.json({ ok: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`App is listening on http://localhost:${PORT}`);
});
