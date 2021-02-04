export const makeActionCreator = (type, ...argNames) => function(...args) {
  const action = { type }
  argNames.forEach((arg, index) => {
    action[argNames[index]] = args[index]
  })
  return action
}
