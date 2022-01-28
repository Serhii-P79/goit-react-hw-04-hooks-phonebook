import { useState } from 'react';
import PropTypes from 'prop-types';
import { CssForm } from './ContactForm.styled';

export const ContactForm = ({ initName = '', initNumber = '', onSubmit }) => {
  const [name, setName] = useState(initName);
  const [number, setNumber] = useState(initNumber);

  const handleChangeName = e => setName(e.currentTarget.value);
  const handleChangeNumber = e => setNumber(e.currentTarget.value);

  const addContact = e => {
    e.preventDefault();
    onSubmit({ name, number })
      .then(() => {
        reset();
      })
      .catch(error => {
        console.log(error);
      });
  };

  function reset() {
    setName(initName);
    setNumber(initNumber);
  }

  return (
    <CssForm.Form onSubmit={addContact}>
      <CssForm.Label>
        <span>Name</span>
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          value={name}
          onChange={handleChangeName}
          required
        />
      </CssForm.Label>
      <CssForm.Label>
        <span>Number</span>
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          value={number}
          onChange={handleChangeNumber}
          required
        />
      </CssForm.Label>
      <CssForm.Button type="submit" name="add">
        Add contact
      </CssForm.Button>
    </CssForm.Form>
  );
};

ContactForm.propTypes = { onSubmit: PropTypes.func.isRequired };
