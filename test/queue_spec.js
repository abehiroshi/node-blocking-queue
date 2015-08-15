"use strict"

import assert from "power-assert"
import Queue from "../src/queue"

describe("Queue", ()=>{
  it("push-pop", ()=>{
    let q = new Queue()
    q.push("ok")
    q.push("ok2")
    q.pop().then(x=>assert(x === "ok"))
    return q.pop().then(x=>assert(x === "ok2"))
  })

  it("pop-push", ()=>{
    let q = new Queue()
    q.pop().then(x=>assert(x === "ok"))
    q.push("ok")
    q.push("ok2")
    return q.pop().then(x=>assert(x === "ok2"))
  })
})
