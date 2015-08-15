"use strict"

export default function Queue(){
  this.__publisherQueue = []
  this.__consumerQueue = []
}

Object.assign(Queue.prototype, {
  push: function(task){
    if (this.__consumerQueue.length === 0){
      this.__publisherQueue.push(task)
    } else {
      this.__consumerQueue.shift()(task)
    }
  },

  pop: function(){
    if (this.__publisherQueue.length === 0){
      return new Promise(resolve => this.__consumerQueue.push(resolve))
    } else {
      return Promise.resolve(this.__publisherQueue.shift())
    }
  },

  size: function(){
    return this.__publisherQueue.length
  },
})
