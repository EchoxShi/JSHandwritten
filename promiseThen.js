function promiseThen(onFullfilled, onRejected){
  let self = this
  return new Promise((resolve, reject) => {
    


    switch (self.status){
      case PENDING:
        break
      case FULFILLED:

        break
      case REJECTED:

        break
    }

  })
}
promiseThen.promiseThen(onFullfilled, onRejected)