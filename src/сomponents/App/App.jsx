// import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { GlobalStyle } from './GLobalStyle';
import { ContactForm, Filter, ContactList, CssApp } from 'сomponents';
import * as LocalApi from 'utilities';

export function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contacts = LocalApi.load('contacts');
    contacts && setContacts([...contacts]);
  }, []);

  useEffect(() => {
    //  console.log('save contacts');
    LocalApi.save('contacts', contacts);
  }, [contacts]);

  const formSubmitHandler = data => {
    return new Promise((resolve, reject) => {
      if (
        contacts.some(({ name }) =>
          name.toLowerCase().includes(data.name.toLowerCase())
        )
      ) {
        //  console.log('1');
        alert(`${data.name} is already in contacts.`);
        return reject('Error! Error passed to reject function');
      }
      // console.log('2');
      setContacts(contacts => {
        return [
          ...contacts,
          {
            id: nanoid(),
            name: data.name,
            number: data.number,
          },
        ];
      });
      return resolve('Ok');
    });
  };

  const deleteContact = (e, delId) => {
    setContacts(contacts => {
      return [...contacts.filter(({ id }) => id !== delId)];
    });
  };

  const handleChangeFiltrContacts = evt => {
    setFilter(evt.currentTarget.value);
  };

  const getFilteringContacts = () => {
    const normolizeFiltr = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normolizeFiltr)
    );
  };

  return (
    <CssApp.Contener>
      <GlobalStyle />
      <h1>Phonebook</h1>
      <ContactForm onSubmit={formSubmitHandler} />
      <h2>Contacts</h2>
      <Filter
        value={filter}
        handleChangeFiltrContacts={handleChangeFiltrContacts}
      />
      <ContactList contact={getFilteringContacts()} onDelete={deleteContact} />
    </CssApp.Contener>
  );
}
