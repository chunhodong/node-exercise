class Singleton {
    constructor () {
      if (!Singleton.instance) {
        Singleton.instance = this
      }
      // Initialize object
      return Singleton.instance
    }
    // Properties & Methods
  }
  
  const instance = new Singleton()
  Object.freeze(instance);
  
  export default instance