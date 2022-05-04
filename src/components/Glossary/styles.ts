import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
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
  bottomButtonSection: {
    position: 'absolute',
    bottom: 0,
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
    width: 350,
    height: 50,
    borderRadius: 5,
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
  selectedExerciseList: {
    flex: 1,
  },
});

export default styles;
