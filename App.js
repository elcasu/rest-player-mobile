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
import { Card } from 'react-native-material-ui';
import NavigationBar from 'react-native-navbar'
import { Icon } from 'react-native-elements'
import {
  getVolume,
  setVolume,
  getMaxVolume,
  onVolumeChange
} from 'react-native-volume'
import io from 'socket.io-client'
import {
  getVideos,
  playVideo,
  stopVideo,
  volumeUp,
  volumeDown
} from './api'

import { styles, rawStyles } from './style'

import { COLOR, ThemeProvider } from 'react-native-material-ui';

const uiTheme = {
    palette: {
        primaryColor: COLOR.green500,
    },
    cardStyle: {
      backgroundColor: '#00ff66',
    },
    toolbar: {
        container: {
            height: 50,
        },
    },
}

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
    this.socket = io('http://pi.home.lan:7000', {
      transports: ['websocket']
    })
    this.socket.on('player', result => {
      this._updateHeader(result)
    })
  }

  async _updateHeader(result) {
    switch (result.state.status) {
      case 'STOPPED':
        this.setState({ isPlaying: false })
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
        <ThemeProvider uiTheme={ uiTheme }>
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
                    return (
                      <Card
                        key={video._id}
                        onPress={() => this._onVideoPress(video)}
                      >
                        <Text style={[styles.legendLabel, {padding:0}]}>{video.name}</Text>
                        <Text>{video.path}</Text>
                      </Card>
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
