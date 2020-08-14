import React from 'react';
import {AsyncStorage} from 'react-native';

export default class Storage {
  static async set(key, value) {
    try {
      var item = JSON.stringify(value);
      await AsyncStorage.setItem(key, item);
    } catch (error) {
      console.log(error);
    }
  }

  static setVal(key, value) {
    try {
      AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log(error);
    }
  }

  static async get(key) {
    try {
      let value = await AsyncStorage.getItem(key);
      if (value) {
        var item = JSON.parse(value);
        return item;
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async getVal(key) {
    try {
      let value = await AsyncStorage.getItem(key);
      console.log(value);
      if (value) {
        return value;
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async del(key) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  }
}
