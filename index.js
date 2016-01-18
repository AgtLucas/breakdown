'use strict'

require('heapdump')

var leakyData = []
var nonLeakyData = []

class SimpleClass {

  constructor (text) {
    this.text = text
  }

}

function cleanUpData (dataStore, randomObject) {
  var objectIndex = dataStore.indexOf(randomObject)
  dataStore.splice(objectIndex, 1)
}

function getAndStoreRandomData () {
  var randomData = Math.random().toString()
  var randomObject = new SimpleClass(randomData)

  leakyData.push(randomObject)
  nonLeakyData.push(randomObject)

  // cleanUpData(leakyData, randomObject)
  cleanUpData(nonLeakyData, randomObject)
}

function generateHeapDumpAndStats () {
  try {
    global.gc()
  } catch (e) {
    console.log("You must run program with 'node --expose-gc index.js' or 'npm start'")
    process.exti()
  }

  var heapUsed = process.memoryUsage().heapUsed
  console.log('Program is using ' + heapUsed + ' bytes of heap')

  process.kill(process.pid, 'SIGUSR2')
}

setInterval(getAndStoreRandomData, 5)
setInterval(generateHeapDumpAndStats, 2000)
