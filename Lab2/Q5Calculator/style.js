import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    justifyContent: 'flex-end',
    padding: 20,
  },
  display: {
    fontSize: 60,
    textAlign: 'right',
    marginBottom: 20,
    color: '#000',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  button: {
    flex: 1,
    margin: 5,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 26,
    color: '#000',
  },
  operatorButton: {
    backgroundColor: '#EDEDED',
  },
  equalButton: {
    backgroundColor: '#FF9800',
  },
  clearButton: {
    backgroundColor: '#E0E0E0',
  },
  zeroButton: {
    flex: 2,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
});
