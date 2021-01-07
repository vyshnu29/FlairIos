import store from '../store/index/index'

export default class MetaInfo {
  constructor() {
    this.names = store.getState().firestore.ordered.names
    this.clients = store.getState().firestore.ordered.clients_meta_info
  }

  clientIdToName = (id) => {
    try {
      return this.clients[id].businessDisplayName
    } catch (error) {
      console.error(error)
      return id
    }
  }

  emailToName = (id) => {
    const names = this.names[0]
    try {
      return names[id].name
    } catch (error) {
      return id
    }
  }

  getEmployeeKey(id, key) {
    const names = this.names[0]
    try {
      return names[id][key]
    } catch (error) {
      return id
    }
  }

  getCategory = (id) => {
    const names = this.names[0]
    try {
      return names[id].category
    } catch (error) {
      console.error(error)
      return id
    }
  }

  checkSupervisor = (id) => {
    const names = this.names[0]
    try {
      return names[id].isSupervisor ? true : false
    } catch (error) {
      return false
    }
  }
  checkDesignation = (id) => {
    const names = this.names[0]
    try {
      if (names[id].designation === "User") return "Employee"
      return names[id].designation
    } catch (error) {
      return ""
    }
  }

  getGender = (id) => {
    const names = this.names[0]
    try {
      return names[id].gender
    } catch (error) {
      return ""
    }
  }

  toNameCase = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

  getImage = (id) => {
    const names = this.names[0]
    console.log("a",names)
    let url = ""
    try {
      url = names[id].photoURL
    } catch (error) {
      url = ""
    }

    return url
  }
}
