import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, Image } from 'react-native'
import { Button } from 'react-native-material-ui'
import style from './style'

class Card extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    imageUrl: PropTypes.string,
    onAction: PropTypes.func
  }

  render () {
    return (
      <View style={ style.card }>
        {
          this.props.imageUrl && (
            <View style={ style.cardImage }>
              <Image
                style={{ width: 100, height: 200 }}
                source={{ uri: this.props.imageUrl }}
              />
            </View>
          )
        }
        <View style={ style.cardRight }>
          <Text style={ style.cardTitle }>{ this.props.title }</Text>
          <Text style={ style.cardDescription }></Text>
          <View style={ style.divider }></View>
          {
            this.props.isPlaying ? (
              <View style={ style.playingWrapper }>
                <Text style={ style.playing }>REPRODUCIENDO...</Text>
              </View>
            ) : (
              <Button primary text='Reproducir' onPress={ this.props.onAction } />
            )
          }
        </View>
      </View>
    )
  }
}

export default Card
