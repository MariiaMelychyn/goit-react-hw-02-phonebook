import { Component } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import styles from './ContactForm.module.scss';

class ContactForm extends Component {
  // PropTypes как статическое свойство
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  // Стейт формы
  state = {
    name: '',
    number: '',
  };

  // Метод, наблюдающий за инпутами и записывающий в стейт их значения
  hanldeChange = event => {
    const { name, value } = event.currentTarget;

    this.setState({
      [name]: value,
    });
  };

  // Метод на отправке формы. Формирует из стейта контакт и передает во внешний метод
  hanldeSubmit = event => {
    event.preventDefault();

    const contact = {
      id: uuidv4(),
      name: this.state.name,
      number: this.state.number,
    };

    this.props.onSubmit(contact); // Внешний метод в пропсах класса

    this.resetForm();
  };

  // Сброс полей формы (после отправки)
  resetForm = () => {
    this.setState({
      id: '',
      name: '',
      number: '',
    });
  };

  render() {
    return (
      <form className={styles.form} onSubmit={this.hanldeSubmit}>
        <label className={styles.label}>
          Name
          <input
            type="text"
            name="name"
            className={styles.input}
            value={this.state.name} // Пишем значение в стейт
            onChange={this.hanldeChange} // Наблюдающий метод
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            required
          />
        </label>
        <label className={styles.label}>
          Number
          <input
            type="tel"
            name="number"
            className={styles.input}
            value={this.state.number} // Пишем значение в стейт
            onChange={this.hanldeChange} // Наблюдающий метод
            pattern="(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})"
            title="Номер телефона должен состоять из 11-12 цифр и может содержать цифры, пробелы, тире, пузатые скобки и может начинаться с +"
            required
          />
        </label>
        <div className={styles.button__wrapper}>
          <button type="submit" className={styles.button}>
            Add contact
          </button>
        </div>
      </form>
    );
  }
}

export default ContactForm;