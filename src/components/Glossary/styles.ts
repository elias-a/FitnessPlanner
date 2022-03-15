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
  header: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
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
  addButton: {
    width: 350,
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    backgroundColor: '#909090',
  },
});

export default styles;
