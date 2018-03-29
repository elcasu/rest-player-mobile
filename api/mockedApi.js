const API_DOMAIN = 'http://pi.home.lan:7000'
import mockedResponse from './mockedVideos'

export const baseUrl = 'http://10.0.2.2:3000'

export async function getVideos() {
  return new Promise((resolve, reject) => {
    resolve(mockedResponse)
  })
}

export async function playVideo(video) {
  return new Promise((resolve, reject) => {
    resolve()
  })
}

export async function stopVideo() {
  return new Promise((resolve, reject) => {
    resolve()
  })
}

export async function volumeUp() {
  return new Promise((resolve, reject) => {
    resolve()
  })
}

export async function volumeDown() {
  return new Promise((resolve, reject) => {
    resolve()
  })
}

