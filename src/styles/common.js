import { StyleSheet } from 'react-native';

const commonStyles = StyleSheet.create({
  baseText: {
    fontFamily: 'Cochin',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  mainView: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#845D3E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    width: '90%',
    backgroundColor: '#845D3E',
    borderColor: '#36222D',
    borderWidth: 1,
    borderRadius: 8,
    padding: '1%',
  },
});

export { commonStyles };
