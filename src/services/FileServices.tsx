import * as firebase from 'firebase'
import uuid from 'uuid'
import { Facebook, ImagePicker, Permissions, FileSystem } from 'expo'

const storageRef = firebase.storage().ref()

//upload image handler
// first assign unique id of image
// upload to firebase object storage service
// return image url from object storage
export async function uploadImage(
  image: ImagePicker.ImageInfo,
): Promise<string> {
  const imagesRef = storageRef.child(
    'images/' + uuid.v4() + findImageType(image),
  )
  try {
    const res = await fetch(image.uri)
    const blob = await res.blob()
    const imageRef = await imagesRef.put(blob)
    // link to store in reflection
    return await imagesRef.getDownloadURL()
  } catch (error) {
    console.log(error)
    return ''
  }
}

export async function getDownloadUrl(path: string) {
  try {
    let url = storageRef.child(path).getDownloadURL()
  } catch (error) {
    console.log('err', error)
  }
}

function findImageType(image: ImagePicker.ImageInfo): string {
  let type: string = ''
  if (image.uri.indexOf('.jpg') > -1) {
    type = '.jpg'
  } else if (image.uri.indexOf('.png') > -1) {
    type = '.png'
  } else if (image.uri.indexOf('.jpeg') > -1) {
    type = '.jpeg'
  }
  return type
}

export async function pickImage(): Promise<string> {
  const { status: existingStatus } = await Permissions.askAsync(
    Permissions.CAMERA_ROLL,
  )
  if (existingStatus === 'granted') {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
    })

    if (result.cancelled) {
      return ''
    }

    return await uploadImage(result)
  }
  return ''
}
