import React, { useState } from 'react';
import './form.css';
import jsonData from './clientintakeform.json';

const ClientForm = () => {
  const [formData, setForm] = useState(jsonData); // Initial form data from JSON
  const [newQuestion, setNewQuestion] = useState({ type: 'text', content: '', options: [] });
  const [questions, setQuestions] = useState([]); // Array to hold new questions
  const [isPublished, setIsPublished] = useState(false);

  const handleQuestionContentChange = (e) => {
    setNewQuestion({ ...newQuestion, content: e.target.value });
  };

  const handleQuestionTypeChange = (e) => {
    setNewQuestion({ ...newQuestion, type: e.target.value, options: [] }); // Reset options on type change
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...newQuestion.options];
    updatedOptions[index] = value;
    setNewQuestion({ ...newQuestion, options: updatedOptions });
  };

  const addOption = () => {
    setNewQuestion({ ...newQuestion, options: [...newQuestion.options, ''] });
  };

  const removeOption = (index) => {
    const updatedOptions = [...newQuestion.options];
    updatedOptions.splice(index, 1);
    setNewQuestion({ ...newQuestion, options: updatedOptions });
  };

  const saveQuestion = () => {
    setQuestions([...questions, newQuestion]);
    setNewQuestion({ type: 'text', content: '', options: [] }); // Reset new question
  };

  const editQuestion = () => {
       // edit a created new question
  };

  const removeQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const publishForm = async () => {
    try {
      // Assuming formData has a unique identifier, e.g., formData.id
      const response = await fetch(`/api/form/${formData.id}/publish`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          // Include authorization token if needed, e.g., 'Authorization': 'Bearer <token>'
        },
      });

      if (response.ok) {
        setIsPublished(true); // Update state to reflect the form is now published
        console.log("Form published successfully");
      } else {
        // Handle errors, e.g., response status code is not OK
        console.error("Failed to publish form");
      }
    } catch (error) {
      // Handle network errors
      console.error("Error publishing form:", error);
    }
  };

  return (
    <div className="form-container">
      <h1>{formData.titleEn}</h1>
      {/* Display pre-filled questions */}
      {formData.elements.map((question, index) => (
        <div key={index} className="question">
            <label>{question.properties.titleEn}</label>
            
            {/* Text Field */}
            {question.type === 'textField' && (
            <input type="text" placeholder={question.properties.descriptionEn} disabled />
            )}

            {/* Dropdown */}
            {question.type === 'dropdown' && (
            <select disabled>
                {question.properties.choices.map((choice, choiceIndex) => (
                <option key={choiceIndex} value={choice.en}>
                    {choice.en}
                </option>
                ))}
            </select>
            )}

            {/* Checkbox */}
            {question.type === 'checkbox' && question.properties.choices.map((choice, choiceIndex) => (
            <div key={choiceIndex}>
                <input type="checkbox" id={`${question.id}_${choiceIndex}`} disabled />
                <label htmlFor={`${question.id}_${choiceIndex}`}>{choice.en}</label>
            </div>
            ))}

            {/* Radio Buttons */}
            {question.type === 'radio' && question.properties.choices.map((choice, choiceIndex) => (
            <div key={choiceIndex}>
                <input type="radio" name={question.id} id={`${question.id}_${choiceIndex}`} disabled />
                <label htmlFor={`${question.id}_${choiceIndex}`}>{choice.en}</label>
            </div>
            ))}
        </div>
    ))}
  
      {/* New question interface */}
      <div className="new-question">
        <input type="text" value={newQuestion.content} onChange={handleQuestionContentChange} placeholder="Question" />
        <select value={newQuestion.type} onChange={handleQuestionTypeChange}>
          <option value="text">Text</option>
          <option value="date">Date</option>
          <option value="dropdown">Dropdown</option>
          <option value="radio">Radio</option>
          <option value="checkbox">Checkbox</option>
        </select>
        {['dropdown', 'radio', 'checkbox'].includes(newQuestion.type) && newQuestion.options.map((option, index) => (
          <div key={index}>
            <input type="text" value={option} onChange={(e) => handleOptionChange(index, e.target.value)} placeholder="Option" />
            <button onClick={() => removeOption(index)}>Remove Option</button>
          </div>
        ))}
        {['dropdown', 'radio', 'checkbox'].includes(newQuestion.type) && <button onClick={addOption}>Add Option</button>}
        <button onClick={saveQuestion}>Save Question</button>
      </div>
  
      {/* Render new questions */}
      {questions.map((q, index) => (
        <div key={index} className="question">
          {q.content}
          <button onClick={() => editQuestion(index)}>Edit</button>
          <button onClick={() => removeQuestion(index)}>Remove</button>
        </div>
      ))}
  
      {/* Button to trigger form publishing */}
      <button onClick={publishForm} disabled={isPublished}>
          Publish Form
      </button>

      {/* Optionally display a message or indicator that the form is published */}
      {isPublished && <p>Form has been published.</p>}
    </div>
  );
};

export default ClientForm;
