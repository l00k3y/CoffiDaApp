import AsyncStorage from '@react-native-async-storage/async-storage';

export async function setSessionData(loginObject) {
  try {
    await AsyncStorage.setItem('id', loginObject.id);
    await AsyncStorage.setItem('token', loginObject.token);
  } catch (e) {
    console.log(e);
  }
}

export async function getSessionData() {
  try {
    const loginObject = {};
    loginObject.id = await AsyncStorage.getItem('id');
    loginObject.token = await AsyncStorage.getItem('token');
    if (loginObject.token !== null) {
      // value previously stored
      return loginObject;
    }
    return '';
  } catch (e) {
    console.log(e);
    return 'Failed';
  }
}

export async function clearSessionData() {
  try {
    await AsyncStorage.removeItem('id');
    await AsyncStorage.removeItem('token');
  } catch (e) {
    console.log(e);
  }
}
