exports.objconverter = function (values) {
    let output = []
    values.forEach(element => {
      output.push({
      //  name: element.name,
        email: element.email,
        userstatus: element.UserStatus,
        usertype: element.UserType
      }
      )
    })
   
    return output ;
  }