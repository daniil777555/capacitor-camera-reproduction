<template>
  <div class="app">
    <button class="app__btn" @click="onUpload">Upload image</button>
    <div v-if="img" class="app__img-wrapper">
      <img :src="img" alt="Image" class="app__img">
    </div>
  </div>
</template>

<script setup lang="ts">
import { Camera, CameraResultType } from '@capacitor/camera'
import { Dialog } from '@capacitor/dialog'

/**
 * Bug report
 * 
 * Camera won't open on a first attempt to take a photo. It has been tested on Android APIs 33,34,35
 * For old versions of Android it works fine
 * 
 * This bug is noticed when saveToGallery is set to true but if it's false then it works
 * 
 * Also additional bug, that Camera.requestPermissions() doesn't requesting permissions on Android
 * 
 * More detailed explanation, after initial loading or restarting the app, clicking button you see a prompt
 * to choose whether to take a photo or choose from gallery, but after choosing to take a photo, camera won't open
 * you must click the button again and choose Take a photo again, then camera will open.
 * After you did it once, camera will open on a first attempt until you restart the app.
 */

const img = ref<string>('');

// Requesting permissions here doesn't work too
Camera.requestPermissions()

const onUpload = async () => {
  try {
    // Uncomment the line below and you may see that here code stops, like the Promise has never been resolved
    // await Camera.requestPermissions({ permissions: ['camera', 'photos'] })
    // await Camera.requestPermissions() also is not resolved
    // Somehow this separate requests are ok but they do nothing, no permission was requested and granted
    await Camera.requestPermissions({ permissions: ['camera'] })
    await Camera.requestPermissions({ permissions: ['camera'] })

    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      saveToGallery: true,
      resultType: CameraResultType.DataUrl,
      correctOrientation: false
    })

    if (image.dataUrl) {
      img.value = image.dataUrl
    }

    // Followig alerts are here to show that code is executed
    // So if you get no alerts I believe it means await Camera.getPhoto promise is not resolved and never will be
    Dialog.alert({
      message: 'Image taken'
    })
  } catch (e) {
    console.log(e)
    Dialog.alert({
      message: 'Error taking image'
    })
  } finally {
    Dialog.alert({
      message: 'Finally block in function'
    })
  }
}
</script>

<style lang="scss" scoped>
* {
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

.app {
  max-width: 468px;
  margin: 0 auto;
  padding: 20px;

  &__btn {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 25px;
    font-weight: 700;
    width: 100%;
    cursor: pointer;
  }

  &__img-wrapper {
    margin-top: 20px;
    width: 100%;
    height: 100%;
  }

  &__img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>

