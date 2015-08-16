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
q.push('task4');
q.push('task5');

var c = new QueueConsumer(q);
c.start(function(task){
  return new Promise(function(resolve, reject){
    // working on task
    resolve();
  });
}, 2);

c.end().then(function(){
  // on all tasks done
});
```

API
-------

#### new Queue()

#### Queue.push(task)
 - **task** {Object} *required*

#### Queue.pop()
 - return {Promise}

#### Queue.size()
 - return {integer}

#### new QueueConsumer(queue)
 - **queue** {Queue} *required*

#### QueueConsumer.start(consumer, [concurrency])
 - **consumer** {Function} *required* should be called with 1 parameters: task.
 - **cocurrency** {integer} *optional, default: 1*

#### QueueConsumer.end()
 - return {Promise}

License
-------

MIT.
