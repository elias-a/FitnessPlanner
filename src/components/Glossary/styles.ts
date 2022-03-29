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
  addButton: {
    width: 350,
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    backgroundColor: '#909090',
  },
  listContainer: {
    marginTop: 20,
  },
  listItem: {
    width: 350,
    height: 50,
    justifyContent: 'center',
    marginRight: 8,
    paddingLeft: 20,
    marginTop: 5,
    backgroundColor: '#b8b8b8',
  },
  itemText: {
    fontSize: 30,
  },
});

export default styles;
