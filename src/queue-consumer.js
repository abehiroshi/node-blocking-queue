"use strict"

import Queue from "./queue"
import PromiseSet from "./promise-set"

export default function QueueConsumer(queue){
  this.__queue = queue
  this.__doing = new PromiseSet()
  this.__done  = ()=>{}
}

Object.assign(QueueConsumer.prototype, {
  start: function(consumer, concurrency=1){
    for (let i=0; i<concurrency; i++){
      this.__queue.pop()
        .then(x => this.__doing.add(consumer(x)))
        .then(()=> {
          this.__done()
          this.start(consumer)
        })
    }
  },

  end: function(){
    let p = new Promise(resolve => {this.__done = ()=>{
      if (this.__queue.size() === 0 && this.__doing.size() === 0) resolve()
    }})
    this.__done()
    return p
  },
})
