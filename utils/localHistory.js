const userHistoryCheck = () => {
  if(localStorage.getItem("userHistory") === null) localStorage.setItem('userHistory', JSON.stringify([]))
}

const multipleCheck = (id) => {
  console.log(id)
  let userHistory = JSON.parse(localStorage.getItem('userHistory'))
  console.log("userHistory: ", userHistory)
  const index = userHistory.map(history => history.userData.id).indexOf(id)
  if(index >= 0) {
    userHistory.splice(index, 1)
    localStorage.setItem('userHistory', JSON.stringify(userHistory))
  }
}

export const getHistory = () => {
  userHistoryCheck()
  return JSON.parse(localStorage.getItem('userHistory'))
}

export const addHistory = (userData) => {
  userHistoryCheck()
  multipleCheck(userData.id)
  let history = [...JSON.parse(localStorage.getItem('userHistory'))]
  history.push({userData, dateTime: new Date()})
  history.sort((a, b) => new Date(a.dateTime) > new Date(b.dateTime) ? -1 : 1)
  localStorage.setItem('userHistory', JSON.stringify(history))
  return history
}

export const removeHistory = (id) => {
  userHistoryCheck()
  let userHistory = JSON.parse(localStorage.getItem('userHistory'))
  const index = userHistory.map(history => history.userData.id).indexOf(id)
  if(index >= 0) {
    userHistory.splice(index, 1)
    localStorage.setItem('userHistory', JSON.stringify(userHistory))
  }
  return history
}

export const clearHistory = () => {
  localStorage.removeItem('userHistory')
}

export default {
  getHistory,
  addHistory,
  removeHistory,
  clearHistory,
}