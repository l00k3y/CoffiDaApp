import { StyleSheet } from 'react-native';

const commonStyles = StyleSheet.create({
  baseText: {
    fontFamily: 'Cochin',
  },
  titleText: {
    fontSize: 26,
    fontWeight: 'bold',
    paddingBottom: '2%',
  },
  mainView: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#845D3E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContentView: {
    flex: 1,
    flexDirection: 'column',
    width: '90%',
    backgroundColor: '#845D3E',
  },
  textInput: {
    width: '90%',
    backgroundColor: '#845D3E',
    borderColor: '#36222D',
    borderWidth: 1,
    borderRadius: 8,
    padding: '1%',
  },
  headerStyle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export { commonStyles };
