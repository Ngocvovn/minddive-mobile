import * as firebase from 'firebase'
import { ImagePicker } from 'expo'
import uuid from 'uuid'

const storageRef = firebase.storage().ref()

export async function uploadImage(image: ImagePicker.ImageInfo) {
  const imagesRef = storageRef.child(
    'images/' + uuid.v4() + findImageType(image),
  )
  try {
    const res = await fetch(image.uri)
    const blob = await res.blob()
    const imageRef = await imagesRef.put(blob)
    // link to store in reflection
    let link: string = await imagesRef.getDownloadURL()
  } catch (error) {
    console.log(error)
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

// pick and upload image example
/*private async pickImage(): Promise<void> {
    const { status: existingStatus } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL,
    )
    if (existingStatus === 'granted') {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
      })

      if (result.cancelled) {
        return
      }

      await uploadImage(result)
    }
  } */
