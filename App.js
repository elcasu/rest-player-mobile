/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ListView,
  ScrollView,
  Alert,
  TouchableHighlight,
  StatusBar
} from 'react-native'

import {
  getTheme
} from 'react-native-material-kit'

import NavigationBar from 'react-native-navbar'

const theme = getTheme()

const BASE_API_URL = 'http://192.168.3.104:7000/api'

async function getVideos() {
  try {
    const response = await fetch(`${BASE_API_URL}/videos`)
    const json = await response.json()
    return json
  }
  catch (e) {
    console.error(e)
  }
}

async function playVideo(video) {
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

async function stopVideo() {
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

const rightButtonConfig = {
  title: 'Detener',
  handler: async () => {
    this.setState({ isPlaying: false })
    await stopVideo()
  }
}

const titleConfig = {
  title: 'Reproduciendo...'
}

export default class App extends Component<{}> {
  constructor() {
    super()
    this.state = {
      isPlaying: false,
      isLoading: true,
      videos: []
    }
  }

  async componentDidMount() {
    const videos = await getVideos()
    this.setState({
      videos,
      isLoading: false
    })
  }

  async _onVideoPress (video) {
    this.setState({
      isPlaying: true
    })
    await playVideo(video)
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View>
          <Text>Cargando...</Text>
        </View>
      )
    }
    else {
      return (
        <ScrollView style={styles.scrollView}>
          {
            this.state.isPlaying && 
              <NavigationBar
                title={titleConfig}
                rightButton={{
                  title: 'Detener',
                  handler: async () => {
                    this.setState({ isPlaying: false })
                    await stopVideo()
                  }
                }}
              />
          }
          <View style={styles.container}>
            {
              this.state.videos.map(video => {
                return (
                  <TouchableHighlight key={video._id} style={styles.cardStyle} onPress={() => this._onVideoPress(video)}>
                    <View>
                      <Text style={[styles.legendLabel, {padding:0}]}>{video.name}</Text>
                      <Text style={theme.cardContentStyle}>{video.path}</Text>
                    </View>
                  </TouchableHighlight>
                )
              })
            }
          </View>
        </ScrollView>
      )
    }
  }
}

const styles = StyleSheet.create({
  cardStyle: {
    backgroundColor: '#00ff66',
    marginBottom: 10
  },
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
    padding: 20,
    marginTop: Platform.OS === 'android' ? 56 : 0,
  },
  row: {
    flexDirection: 'row',
  },
  col: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: 7, marginRight: 7,
  },
  legendLabel: {
    textAlign: 'center',
    color: '#666666',
    marginTop: 10, marginBottom: 20,
    fontSize: 12,
    fontWeight: '600',
  }
})
