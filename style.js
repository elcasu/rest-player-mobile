import {
  StyleSheet,
  Platform
} from 'react-native'

export const styles = StyleSheet.create({
  cardStyle: {
    // backgroundColor: '#00ff66',
    backgroundColor: '#dddddd',
    marginBottom: 10
  },
  controlsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  scrollView: {
    flex: 1,
    position: 'relative'
    // position: 'absolute'
  },
  container: {
    flex: 1,
    // alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
    flexDirection: 'column',
    justifyContent: 'center'
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
  },
  header: {
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: '#03A9F4',
    left: 0,
    right: 0,
    height: 100
  },
  headerWrapper: {
    flex: 1,
    position: 'relative',
    height: 500
  }
})
