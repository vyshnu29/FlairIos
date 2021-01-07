import storage from '@react-native-firebase/storage';

export const uploadToStorage = (
  file,
  filePath,
  fileName,
  type,
  storageListener
) => {
  const sizeValidate = {
    profilePic: {
      size: 5000000, // 5 MB
      exp: "5MB",
    },
    file: {
      size: 10000000, // 10 MB
      exp: "10MB",
    },
  }
  console.log("Aa",sizeValidate[type].size)
  const filePathWithExtension = `${filePath}.${file.fileName.split(".")[1]}`
  return new Promise((resolve, reject) => {
    if (file.size > sizeValidate[type].size) {
      reject("invalid size")
      alert("File size should be less than " + sizeValidate[type].exp)
    } else {
      const storageRef = storage().ref(filePathWithExtension)
      storageRef.putFile(file.path).on(
        "state_changed",
        (snapshot) => {
          const progress1 = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          )
          console.log(progress1)
        },
        (error) => {
          console.log("upload failed")
          reject(error)
        },
        () => {
          storageRef.getDownloadURL().then((url) => {
            console.log("uploaded")
            resolve(url)
          })
        }
      )
    }
  })
}


// uploadToStorage = (file, filePath, fileNames, type) => {
//   const sizeValidate = {
//     'profilePic' : {
//       size : 5000000,   // 5 MB
//       exp : '5MB'
//     },
//     'file' : {
//       size : 10000000,  // 10 MB
//       exp : '10MB'
//     },
//   }
//   return new Promise((resolve, reject) => {
//     if(file.size > sizeValidate[type].size){
//       reject('invalid size')
//       alert("File size should be less than "+sizeValidate[type].exp)
//     }
//     else{   
//       const task = storage().ref(filePath)
//       task.putFile(file.path).on('state_changed', 
//         (snapshot) => {
//           const progress1 = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
//           console.log(progress1)
//         }, 
//         (error) => {
//           console.log('upload failed')
//           reject(error)
//         }, 
//         () => {
//             task.getDownloadURL().then(url => {
//               console.log('uploaded')
//               resolve(url)
//           })
//         })
//     }
//   })
// }