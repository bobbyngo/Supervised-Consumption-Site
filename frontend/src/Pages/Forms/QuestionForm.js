import React, { useState } from 'react';
import './form.css';

function QuestionForm() {
  const [formName, setFormName] = useState(''); // State for form name
  const [questions, setQuestions] = useState([]);
  const [isPublished, setIsPublished] = useState(false); // State to track if the form is published

  const handleFormNameChange = (e) => {
    setFormName(e.target.value);
  };

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index] = { ...newQuestions[index], [field]: value };
    setQuestions(newQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const newQuestions = [...questions];
    const options = newQuestions[questionIndex].options || [];
    options[optionIndex] = value;
    newQuestions[questionIndex].options = options;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { content: '', type: '', options: [] }]);
  };

  const addOption = (questionIndex) => {
    const newQuestions = [...questions];
    const options = newQuestions[questionIndex].options || [];
    options.push('');
    newQuestions[questionIndex].options = options;
    setQuestions(newQuestions);
  };

  const removeOption = (questionIndex, optionIndex) => {
    const newQuestions = [...questions];
    const options = newQuestions[questionIndex].options || [];
    options.splice(optionIndex, 1); // Remove the option
    newQuestions[questionIndex].options = options;
    setQuestions(newQuestions);
  };

  const publishForm = () => {
    setIsPublished(true);
    // Placeholder for publishing logic or API call to save the form
    console.log("Publishing form:", formName, questions);
  };

  return (
    <div className="form-container">
      <input
        type="text"
        value={formName}
        onChange={handleFormNameChange}
        placeholder="Form Name"
        className="form-name-input"
      />

      {questions.map((question, index) => (
        <fieldset key={index} className="question-set">
          <label htmlFor={`question-${index}`}>Question Text</label>
          <textarea
            id={`question-${index}`}
            value={question.content}
            onChange={(e) => handleQuestionChange(index, 'content', e.target.value)}
            className="question-text-area"
          />

          <label htmlFor={`question-type-${index}`}>Question Type</label>
          <select
            id={`question-type-${index}`}
            value={question.type}
            onChange={(e) => handleQuestionChange(index, 'type', e.target.value)}
            className="question-sel-type"
          >
            <option value="">Select Type</option>
            <option value="text">Text</option>
            <option value="radio">Radio</option>
            <option value="checkbox">Checkbox</option>
            <option value="dropdown">Dropdown</option>
            <option value="date">Date</option>
          </select>

          {(question.type === 'radio' || question.type === 'checkbox') && (
            <div>
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex} className="form-group">
                  <input
                    type={question.type}
                    id={`question-${index}-option-${optionIndex}`}
                    name={`question-${index}`}
                    value={option}
                    onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
                  />
                  <label htmlFor={`question-${index}-option-${optionIndex}`}>{option || `Option ${optionIndex + 1}`}</label>
                  <button type="button" onClick={() => removeOption(index, optionIndex)}>Remove Option</button>
                </div>
              ))}
              <button type="button" onClick={() => addOption(index)}>Add Option</button>
            </div>
          )}
        </fieldset>
      ))}

      <button type="button" onClick={addQuestion}>Add Question</button>
      <button type="button" onClick={publishForm} disabled={isPublished}>Publish Form</button>
    </div>
  );
}

export default QuestionForm;
