import {
  StyleSheet,
  Platform
} from 'react-native'

export const rawStyles = {
  cardStyle: {
    backgroundColor: '#00ff66',
    marginBottom: 10,
    padding: 20
  }
}

export const styles = StyleSheet.create({
  cardStyle: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10
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
  },
  container: {
    flex: 1,
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
    marginTop: 20, marginBottom: 20,
    fontSize: 24,
    // fontWeight: '600',
  },
  header: {
    alignItems: 'center',
    left: 0,
    right: 0,
    height: 150,
    paddingBottom: 20,
    elevation: 1,
  },
  headerWrapper: {
    flex: 1,
    position: 'relative'
  },
  playingWrapper: {
    height: 36,
    marginLeft: 8,
    marginTop: 8,
    marginBottom: 8,
    paddingLeft: 8,
    paddingRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
  },
  playingText: {
    color: '#757575',
  }
})
