// import namor from 'namor'

const range = len => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const newPerson = () => {
  const statusChance = Math.random()
  return {
    Datas: Math.ceil(Math.random() * 30),
    school: Math.ceil(Math.random() * 10),
    petrolStation: Math.ceil(Math.random() * 10),
    hospital: Math.ceil(Math.random() * 10),
    busPark: Math.ceil(Math.random() * 10),
    parking: Math.ceil(Math.random() * 10),
  }
}

export default function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth]
    return range(len).map(d => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      }
    })
  }

  return makeDataLevel()
}