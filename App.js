/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react'
import {
  Text,
  View,
  ListView,
  ScrollView,
  Alert,
  TouchableHighlight,
  StatusBar
} from 'react-native'
import NavigationBar from 'react-native-navbar'
import { Icon } from 'react-native-elements'
import {
  getVolume,
  setVolume,
  getMaxVolume,
  onVolumeChange
} from 'react-native-volume'
import io from 'socket.io-client'

// material
// import {
//   Card,
//   CardTitle,
//   CardContent,
//   CardAction,
//   CardButton
// } from 'react-native-material-ui/Card'
import {
  getTheme,
  MKButton
} from 'react-native-material-kit'
const theme = getTheme()

import { ThemeProvider } from 'react-native-material-ui'

import {
  getVideos,
  playVideo,
  stopVideo,
  volumeUp,
  volumeDown,
  baseUrl
} from './api/mockedApi'

import Card from './components/card'

import { styles, rawStyles } from './style'

export default class App extends Component<{}> {
  constructor() {
    super()
    this.state = {
      isPlaying: false,
      isLoading: true,
      volume: 50,
      videos: []
    }
    this.stop = this.stop.bind(this)
    this._updateHeader = this._updateHeader.bind(this)
    this._playVideo = this._playVideo.bind(this)
    this.socket = io(baseUrl, {
      transports: ['websocket']
    })
    this.socket.on('player', result => {
      this._updateHeader(result)
    })
  }

  async _updateHeader(result) {
    switch (result.state.status) {
      case 'STOPPED':
        this.setState({
          isPlaying: false,
          currentVideo: undefined
        })
        break
      case 'PLAYING':
        this.setState({
          isPlaying: true,
          currentVideo: result.state.video
        })
        break
    }
  }

  async componentDidMount() {
    const response = await getVideos()
    this.setState({
      videos: response.videos,
      isLoading: false
    })
    onVolumeChange(volume => alert(volume))
  }

  async _playVideo(video) {
    this.setState({
      isPlaying: true,
      currentVideo: video
    })
    await playVideo(video)
  }

  async _onVideoPress (video) {
    if (this.state.isPlaying) {
      Alert.alert(
        `Ya se está reproduciendo ${this.state.currentVideo.name}`,
        `Seguro que querés reproducir ${video.name}?`,
        [
          {
            text: 'Si, reproducir',
            onPress: async () => {
              await this._playVideo(video)
            }
          },
          {
            text: 'No, seguir con el actual',
            style: 'cancel'
          },
        ]
      )
    }
    else {
      await this._playVideo(video)
    }
  }

  async stop() {
    this.setState({ isPlaying: false })
    await stopVideo()
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
        <ThemeProvider>
          <View style={ styles.headerWrapper }>
            {
              this.state.isPlaying ? (
              <View style={styles.header}>
                {
                  this.state.currentVideo &&
                    <Text style={ styles.legendLabel }>
                      { this.state.currentVideo.name }
                    </Text>
                }
                <View style={ styles.controlsContainer }>
                  <Icon
                    style={ styles.stopIco }
                    name='controller-stop'
                    type='entypo'
                    onPress={ this.stop }
                  />
                  <View style={{ flex: 1, justifyContent: 'flex-end', flexDirection: 'row' }}>
                    <Icon
                      style={ styles.volIco }
                      name='arrow-bold-left'
                      type='entypo'
                      onPress={ volumeDown }
                    />
                    <Icon
                      style={ styles.volIco }
                      name='volume-2'
                      type='feather'
                    />
                    <Icon
                      style={ styles.volIco }
                      name='arrow-bold-right'
                      type='entypo'
                      onPress={ volumeUp }
                    />
                  </View>
                </View>
              </View>
              ) : (
                <View style={styles.header}>
                  <Text style={ styles.legendLabel }>
                    Ninguna peli en reproducción
                  </Text>
                </View>
              )
            }
            <ScrollView style={styles.scrollView}>
              <View>
                {
                  this.state.videos.map(video => {
                    const oldStyle = (
                      <View key={video._id} style={ theme.cardStyle }>
                        <Text style={ theme.cardTitleStyle }>{ video.name }</Text>
                        <View style={{ padding: 15 }}>
                          <View style={ theme.cardAction }>
                            {
                              this.state.currentVideo &&
                              this.state.currentVideo._id === video._id ? (
                                <View style={ styles.playingWrapper }>
                                  <Text style={ styles.playingText }>REPRODUCIENDO...</Text>
                                </View>
                              ) : (
                                <MKButton onPress={() => this._onVideoPress(video)}>
                                  <Text>Reproducir</Text>
                                </MKButton>
                              )
                            }
                          </View>
                        </View>
                      </View>
                    )

                    const placeholder = `${baseUrl}/poster-placeholder.png`
                    const current = this.state.currentVideo
                    const isPlaying = current && current._id === video._id

                    return (
                      <Card 
                        key={ video._id }
                        title={ video.name }
                        imageUrl={ video.image ? video.image.url : placeholder }
                        onAction={ () => this._onVideoPress(video) }
                        isPlaying={ isPlaying }
                      />
                    )
                  })
                }
              </View>
            </ScrollView>
          </View>
        </ThemeProvider>
      )
    }
  }
}
