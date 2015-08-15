"use strict"

import assert from "power-assert"
import PromiseSet from "../src/promise-set"

describe("PromiseSet", ()=>{
  it("add then", ()=>{
    let s = new PromiseSet()
    let p = s.add(new Promise((resolve)=>{
      setTimeout(()=>resolve("a"), 0)
    }))

    return p.then((x)=>{
      assert(x === "a")
    })
  })

  it("size", ()=>{
    let s = new PromiseSet()
    assert(s.size() === 0)

    let fn = n=>(resolve)=>setTimeout(()=>resolve(), n)

    let p1 = s.add(new Promise(fn(0))).then(()=>{
      assert(s.size() === 2)
    })
    assert(s.size() === 1)

    let p2 = s.add(new Promise(fn(10))).then(()=>{
      assert(s.size() === 1)
    })
    assert(s.size() === 2)

    let p3 = s.add(new Promise(fn(20))).then(()=>{
      assert(s.size() === 0)
    })
    assert(s.size() === 3)

    return Promise.all([p1, p2, p3]).then(()=>{
      assert(s.size() === 0)
    })
  })
})
