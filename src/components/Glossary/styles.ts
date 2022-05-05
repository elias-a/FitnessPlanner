import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: '100%',
    maxHeight: '100%',
    minWidth: '100%',
    maxWidth: '100%',
  },
  viewContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: '90%',
    maxHeight: '90%',
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    minHeight: '10%',
    maxHeight: '10%',
    minWidth: '100%',
    maxWidth: '100%',
  },

  button: {
    width: 70,
    height: 70,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    backgroundColor: '#909090',
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    marginBottom: 20,
  },
  centeredView: {
    alignItems: 'center',
  },
  backButton: {
    width: 50,
    height: 50,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    backgroundColor: '#909090',
  },
  title: {
    paddingTop: 5,
    fontSize: 30,
    fontWeight: '600',
  },
  textInput: {
    width: 300,
    height: 40,
    margin: 32,
    borderWidth: 1,
    padding: 10,
  },
  label: {
    marginTop: 30,
    fontSize: 20,
  },
  fullWidthButton: {
    minWidth: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#909090',
    marginTop: 1,
  },
  addButton: {
    flex: 1,
    width: 350,
    maxHeight: 50,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#909090',
  },
  listContainer: {
    marginTop: 20,
  },
  listItem: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 350,
    height: 50,
    justifyContent: 'center',
    marginRight: 8,
    paddingLeft: 20,
    marginTop: 5,
    backgroundColor: '#b8b8b8',
  },
  itemText: {
    position: 'absolute',
    left: 20,
    top: 5,
    fontSize: 30,
  },
  editButton: {
    position: 'absolute',
    right: 60,
    top: 5,
  },
  deleteButton: {
    position: 'absolute',
    right: 20,
    top: 5,
  },
  splitDetails: {
    position: 'absolute',
    left: 15,
    top: 10,
    height: 50,
  },
  splitDetailsText: {
    fontSize: 26,
    fontWeight: '700',
  },
});

export default styles;
