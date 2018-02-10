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
import {
  getTheme,
  mdl
} from 'react-native-material-kit'
import NavigationBar from 'react-native-navbar'
import { Icon } from 'react-native-elements'
import {
  getVolume,
  setVolume,
  getMaxVolume,
  onVolumeChange
} from 'react-native-volume'
import {
  getVideos,
  playVideo,
  stopVideo,
  volumeUp,
  volumeDown
} from './api'
import { styles } from './style'

const theme = getTheme()

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
  }

  async componentDidMount() {
    const videos = await getVideos()
    this.setState({
      videos,
      isLoading: false
    })
    onVolumeChange(volume => alert(volume))
  }

  async _onVideoPress (video) {
    this.setState({
      isPlaying: true,
      currentVideo: video
    })
    await playVideo(video)
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
        <ScrollView style={styles.scrollView}>
          {
            this.state.isPlaying && 
              <View style={{ alignItems: 'center' }}>
                {
                  this.state.currentVideo &&
                    <Text style={ styles.legendLabel }>
                      { this.state.currentVideo.name }
                    </Text>
                }
                <View style={ styles.controlsContainer }>
                  <Icon style={ styles.stopIco } name='controller-stop' type='entypo' onPress={ this.stop } />
                  <View style={{ flex: 1, justifyContent: 'flex-end', flexDirection: 'row' }}>
                    <Icon style={ styles.volIco } name='arrow-bold-left' type='entypo' onPress={ volumeUp } />
                    <Icon style={ styles.volIco } name='volume-2' type='feather' />
                    <Icon style={ styles.volIco } name='arrow-bold-right' type='entypo' onPress={ volumeDown } />
                  </View>
                </View>

              </View>
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
