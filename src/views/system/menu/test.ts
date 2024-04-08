interface ObjType {
  name: string
  age: number
}

const obj: ObjType = {
  name: '小王',
  age: 33
}

const getObjValue = <T, K extends keyof T>(obj: T, key: K): T[K] => {
  return obj[key]
}

const objName = getObjValue(obj, 'name')
console.log('name', objName)
