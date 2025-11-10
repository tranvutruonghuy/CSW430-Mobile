import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuid } from 'uuid';

export const ContactsContext = createContext({
  contacts: [],
  loading: true,
  refresh: async () => {},
  toggleFavorite: async id => {},
  getById: id => null,
});

const STORAGE_KEY = 'contacts_v1';

const mapContacts = contact => {
  const { name, picture, phone, cell, email } = contact;
  return {
    id: uuid(),
    name: name.first + ' ' + name.last,
    avatar: picture.large,
    phone,
    cell,
    email,
    favorite: Math.random() < 0.1 ? true : false,
  };
};

const loadFromRemote = async () => {
  try {
    const data = await fetch('https://randomuser.me/api/?results=50');
    const json = await data.json();
    return json.results.map(mapContacts);
  } catch (e) {
    console.error('ContactsProvider: failed to load remote', e);
    return [];
  }
};

export const ContactsProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const save = async list => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      console.error('ContactsProvider: failed to save', e);
    }
  };

  const refresh = async () => {
    setLoading(true);
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setContacts(JSON.parse(stored));
      } else {
        const remote = await loadFromRemote();
        setContacts(remote);
        await save(remote);
      }
    } catch (e) {
      console.error('ContactsProvider: error refreshing', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const toggleFavorite = async id => {
    const updated = contacts.map(c =>
      c.id === id ? { ...c, favorite: !c.favorite } : c,
    );
    setContacts(updated);
    await save(updated);
    return updated.find(c => c.id === id);
  };

  const getById = id => contacts.find(c => c.id === id);

  return (
    <ContactsContext.Provider
      value={{ contacts, loading, refresh, toggleFavorite, getById }}
    >
      {children}
    </ContactsContext.Provider>
  );
};

export default ContactsProvider;
