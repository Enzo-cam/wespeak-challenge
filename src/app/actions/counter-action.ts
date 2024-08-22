//SV-Action for the counter
'use server'
import {prisma} from '../../../lib/prisma'


export async function getCounter() {
  const counter = await prisma.counter.findFirst()
  if (!counter) {
    const newCounter = await prisma.counter.create({ data: { value: 0 } })
    return newCounter.value
  }
  return counter.value
}

export async function updateCounter(increment: number) {
  let counter = await prisma.counter.findFirst()
  
  if (!counter) {
    counter = await prisma.counter.create({ data: { value: 0 } })
  }

  const updatedCounter = await prisma.counter.update({
    where: { id: counter.id },
    data: { value: counter.value + increment },
  })

  return updatedCounter.value
}