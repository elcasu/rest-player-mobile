const style = {
  card: {
    display: 'flex',
    flexDirection: 'row',
    height: 100,
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
    marginTop: 10,
    padding: 20,
    height: 250,
    backgroundColor: '#fff'
  },
  cardTitle: {
    fontFamily: 'Roboto',
    fontSize: 20,
    color: '#000',
    marginBottom: 10
  },
  cardDescription: {
    height: 100
  },
  cardRight: {
    marginLeft: 20
  },
  divider: {
    height: 1,
    width: 230,
    backgroundColor: '#ddd'
  },
  playingWrapper: {
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    flexDirection: 'row',
  },
  playing: {
    fontWeight: '500',
    fontSize: 14
  }
}

export default style
