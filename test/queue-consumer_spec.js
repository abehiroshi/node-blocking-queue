"use strict"

import assert from "power-assert"
import Queue from "../src/queue"
import QueueConsumer from "../src/queue-consumer"

describe("QueueConsumer", ()=>{
  it("start after push", ()=>{
    let q = new Queue()
    let consumer = new QueueConsumer(q)

    q.push(1)
    q.push(1)
    q.push(1)

    let count = 0
    consumer.start(() => count++)

    return consumer.end().then(() => assert(count === 3))
  })

  it("start before push", ()=>{
    let q = new Queue()
    let consumer = new QueueConsumer(q)

    let count = 0
    consumer.start(() => count++)

    q.push(1)
    q.push(1)
    q.push(1)
    q.push(1)
    return consumer.end().then(() => assert(count === 4))
  })

  it("start concurrency", ()=>{
    let running = 0
    let completed = 0
    let maxConcurrency = 0

    let q = new Queue()
    let consumer = new QueueConsumer(q)

    consumer.start(x=>{
      assert(x === 1)
      running++
      maxConcurrency = Math.max(maxConcurrency, running)

      return new Promise(resolve=>{
        setTimeout(()=>{
          completed++
          running--
          resolve()
        }, 1)
      })
    }, 5)

    for (let i=0; i<20; i++) q.push(1)
    return consumer.end().then(()=>{
      assert(running === 0)
      assert(completed === 20)
      assert(maxConcurrency === 5)
    })
  })

  it("end empty", ()=>{
    let q = new Queue()
    let consumer = new QueueConsumer(q)

    let count = 0
    consumer.start(() => count++)
    return consumer.end().then(() => assert(count === 0))
  })

  it("end 2 times", ()=>{
    let q = new Queue()
    let consumer = new QueueConsumer(q)

    let count = 0
    q.push(1)
    consumer.start(() => count++)

    return consumer.end().then(() => assert(count === 1))
      .then(() => {
        consumer.end().then(assert(count === 1))
      })
  })

})
