"use strict"

export default function PromiseSet(){
  this.promiseSet = new Set();
}

Object.assign(PromiseSet.prototype, {
  add: function(x){
    return this.addPromise(Promise.resolve(x))
  },

  addPromise: function(p){
    this.promiseSet.add(p)
    return p.then(x=>{
      this.promiseSet.delete(p)
      return x
    })
  },

  size: function(){
    return this.promiseSet.size
  },
})
