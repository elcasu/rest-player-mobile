const BASE_API_URL = 'http://192.168.3.101:7000/api'

export async function getVideos() {
  try {
    const response = await fetch(`${BASE_API_URL}/videos`)
    const json = await response.json()
    return json
  }
  catch (e) {
    console.error(e)
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

