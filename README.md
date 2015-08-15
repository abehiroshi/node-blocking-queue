Blocking Queue
----------------------

Bloking FIFO queue and flow control using Promise.

Installation
-------

```
npm install blocking-queue
```

Example
-------

```js
var Queue = require('blocking-queue');
var QueueConsumer = require('blocking-queue').QueueConsumer;

var q = new Queue();
q.push('task1');
q.push('task2');
q.push('task3');

var c = new QueueConsumer(q);
c.start(function(task){
  return new Promise(function(resolve, reject){
    // working on task
    resolve();
  });
}, 5);
c.end().then(function(){
  // on done all tasks
});
```

API Ref
-------

### new Queue()

### Queue.push(task)

   - **task**, *mixed, required*

### Queue.pop() : Promise

### Queue.size() : integer

### new QueueConsumer(queue)

- **queue**, *Queue, required*

### QueueConsumer.start(consumer, [concurrency])

   - **consumer**, *function, required* should be called with 1 parameters: task.
   - **cocurrency**, *integer, optional, default: 1*

### QueueConsumer.end() : Promise

License
-------

MIT.
