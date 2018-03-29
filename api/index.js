const API_DOMAIN = 'http://pi.home.lan:7000'
const BASE_API_URL = `${API_DOMAIN}/api`

export const baseUrl = BASE_API_URL

export async function getVideos() {
  try {
    const response = await fetch(`${BASE_API_URL}/videos`)
    if (!response.ok) {
      throw new Error('Response error')
    }
    const json = await response.json()
    return json
  }
  catch (e) {
    console.error(e)
    throw e
  }
}

export async function playVideo(video) {
  try {
    await fetch(`${BASE_API_URL}/videos/${video._id}/play`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })
  }
  catch (e) {
    console.error(e)
  }
}

export async function stopVideo() {
  try {
    await fetch(`${BASE_API_URL}/videos/stop`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })
  }
  catch (e) {
    console.error(e)
  }
}

export async function volumeUp() {
  try {
    await fetch(`${BASE_API_URL}/videos/volUp`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })
  }
  catch (e) {
    console.error(e)
  }
}

export async function volumeDown() {
  try {
    await fetch(`${BASE_API_URL}/videos/volDown`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })
  }
  catch (e) {
    console.error(e)
  }
}

