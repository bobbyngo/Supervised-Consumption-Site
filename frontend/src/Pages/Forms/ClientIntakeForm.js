import React from 'react';
import jsonData from './clientintakeform.json';
import './form.css';

const ClientIntakeForm = () => {
  // Function to render form elements based on their type
  const renderElement = (element) => {
    switch (element.type) {
      case 'textField':
        return (
          <div key={element.id} className="form-group">
            <label>{element.properties.titleEn}</label>
            <input type="text" placeholder={element.properties.descriptionEn} required={element.properties.validation.required} />
          </div>
        );
      case 'checkbox':
        return (
          <div key={element.id} className="form-group">
            <label>{element.properties.titleEn}</label>
            {element.properties.choices.map((choice, index) => (
              <div key={index}>
                <input type="checkbox" id={`${element.id}_${index}`} />
                <label htmlFor={`${element.id}_${index}`}>{choice.en}</label>
              </div>
            ))}
          </div>
        );
      case 'dropdown':
        return (
          <div key={element.id} className="form-group">
            <label>{element.properties.titleEn}</label>
            <select required={element.properties.validation.required}>
              {element.properties.choices.map((choice, index) => (
                <option key={index} value={choice.en}>{choice.en}</option>
              ))}
            </select>
          </div>
        );
      case 'radio':
        return (
          <div key={element.id} className="form-group">
            <label>{element.properties.titleEn}</label>
            {element.properties.choices.map((choice, index) => (
              <div key={index}>
                <input type="radio" name={element.id} id={`${element.id}_${index}`} />
                <label htmlFor={`${element.id}_${index}`}>{choice.en}</label>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="form-container">
      <h1>{jsonData.titleEn}</h1>
      <p>{jsonData.introduction.descriptionEn}</p>
      <form>
        {jsonData.elements.map(renderElement)}
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default ClientIntakeForm;
