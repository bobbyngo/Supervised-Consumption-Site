import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/FormQuestion.css';
import axios from 'axios';
const FormQuestion = ({ questions }) => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState([]);
    const [submissionSuccess, setSubmissionSuccess] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [newQuestionData, setNewQuestionData] = useState({
        form_id: '', // Sample form_id, you may need to adjust this
        question_type_id: 0,
        is_required: true,
        is_mandatoryhc: true,
        question_text: '',
        question_option: [],
    });
    const [updatingQuestionId, setUpdatingQuestionId] = useState(null);
    const [deletingQuestionId, setDeletingQuestionId] = useState(null);

    useEffect(() => {
        if (questions.length === 0) {
            setSubmissionSuccess(false); // Reset submission success when there are no questions
        }
    }, [questions]);

    const renderQuestionInput = (question) => {
        switch (question.question_type_id) {
            case 0:
                return (
                    <input
                        type='text'
                        id={question.question_id}
                        onChange={(e) =>
                            handleAnswerChange(
                                question.question_id,
                                null,
                                e.target.value
                            )
                        }
                    />
                );
            case 1:
                return renderMultipleChoice(question);
            case 2:
                return renderCheckbox(question);
            case 3:
                return (
                    <input
                        type='date'
                        id={question.question_id}
                        onChange={(e) =>
                            handleAnswerChange(
                                question.question_id,
                                null,
                                e.target.value
                            )
                        }
                    />
                );
            default:
                return null;
        }
    };

    const renderMultipleChoice = (question) => {
        return (
            <div>
                {question.question_option.map((option) => (
                    <label
                        key={option.question_option_id}
                        className='radio-label'
                    >
                        <input
                            type='radio'
                            name={question.question_id}
                            value={option.question_option_id}
                            onChange={() =>
                                handleAnswerChange(
                                    question.question_id,
                                    option.question_option_id,
                                    null
                                )
                            }
                        />
                        {option.determined_answer}
                    </label>
                ))}
            </div>
        );
    };

    const renderCheckbox = (question) => {
        return (
            <div>
                {question.question_option.map((option) => (
                    <label
                        key={option.question_option_id}
                        className='checkbox-label'
                    >
                        <input
                            type='checkbox'
                            name={question.question_id}
                            value={option.question_option_id}
                            onChange={(e) =>
                                handleCheckboxChange(
                                    question.question_id,
                                    option.question_option_id,
                                    e.target.checked
                                )
                            }
                        />
                        {option.determined_answer}
                    </label>
                ))}
            </div>
        );
    };

    const handleAnswerChange = (questionId, optionId, value) => {
        const existingAnswerIndex = answers.findIndex(
            (answer) => answer.question_id === questionId
        );
        if (existingAnswerIndex !== -1) {
            const updatedAnswers = [...answers];
            if (optionId !== null) {
                updatedAnswers[existingAnswerIndex].question_option_id =
                    optionId;
            } else {
                updatedAnswers[existingAnswerIndex].answer_text = value;
            }
            setAnswers(updatedAnswers);
        } else {
            const newAnswer = {
                question_id: questionId,
                question_option_id: optionId,
                answer_text: value,
            };
            setAnswers((prevAnswers) => [...prevAnswers, newAnswer]);
        }
    };

    const handleCheckboxChange = (questionId, optionId, checked) => {
        setAnswers((prevAnswers) => {
            const existingAnswerIndex = prevAnswers.findIndex(
                (answer) => answer.question_id === questionId
            );
            if (existingAnswerIndex !== -1) {
                const updatedAnswers = [...prevAnswers];
                if (checked) {
                    if (
                        !updatedAnswers[
                            existingAnswerIndex
                        ].question_option_id.includes(optionId)
                    ) {
                        updatedAnswers[
                            existingAnswerIndex
                        ].question_option_id.push(optionId);
                    }
                } else {
                    updatedAnswers[existingAnswerIndex].question_option_id =
                        updatedAnswers[
                            existingAnswerIndex
                        ].question_option_id.filter((id) => id !== optionId);
                }
                return updatedAnswers;
            } else {
                const newAnswer = {
                    question_id: questionId,
                    question_option_id: [optionId],
                    answer_text: null,
                };
                return [...prevAnswers, newAnswer];
            }
        });
        console.log(answers);
    };

    const handleSubmit = async () => {
        const formId = questions.length > 0 ? questions[0].form_id : null;
        console.log(answers);
        try {
            const response = await axios.post(
                `http://localhost:4000/api/form/${formId}/answers/submit`,
                { answers },
                {
                    withCredentials: true,
                }
            );
            setSubmissionSuccess(true);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleCreateQuestion = async () => {
        // Logic to create a new question
        // Send a request to the backend API to create a new question
        // Update the UI with the new question
        setShowCreateModal(false);
        // Sample form_id, you may need to adjust this
        setNewQuestionData({
            form_id: '',
            question_type_id: 0,
            is_required: true,
            is_mandatoryhc: true,
            question_text: '',
            question_option: [],
        });
    };

    const handleUpdateQuestion = async (questionId) => {
        setUpdatingQuestionId(questionId);
        // Logic to update an existing question
        // Send a request to the backend API to update the question
        // Update the UI with the updated question
        setShowUpdateModal(false);
        setNewQuestionData({
            form_id: '',
            question_type_id: 0,
            is_required: true,
            is_mandatoryhc: true,
            question_text: '',
            question_option: [],
        });
    };

    const handleDeleteQuestion = async (questionId) => {
        // Logic to delete a question
        // Send a request to the backend API to delete the question
        // Update the UI by removing the deleted question
        setDeletingQuestionId(null);
    };

    const handleAddOption = () => {
        setNewQuestionData((prevState) => ({
            ...prevState,
            question_option: [
                ...prevState.question_option,
                { determined_answer: '' },
            ],
        }));
    };

    const handleOptionChange = (index, value) => {
        setNewQuestionData((prevState) => {
            const updatedOptions = [...prevState.question_option];
            updatedOptions[index].determined_answer = value;
            return {
                ...prevState,
                question_option: updatedOptions,
            };
        });
    };

    const handleUpdateModalOpen = (question) => {
        setShowUpdateModal(true);
        setUpdatingQuestionId(question.question_id);
        setNewQuestionData({
            form_id: question.form_id,
            question_type_id: question.question_type_id,
            is_required: question.is_required,
            is_mandatoryhc: question.is_mandatoryhc,
            question_text: question.question_text,
            question_option: [...question.question_option],
        });
    };

    return (
        <div className='mt-5'>
            <div className='survey-container mt-5'>
                {questions.map((question) => (
                    <div className='question' key={question.question_id}>
                        <div className='question-card'>
                            <label
                                className='question-label'
                                htmlFor={question.question_id}
                            >
                                {question.question_text}
                            </label>
                            <div className='question-input'>
                                {renderQuestionInput(question)}
                            </div>
                            <button
                                onClick={() => {
                                    handleUpdateQuestion(question.question_id);
                                    setShowUpdateModal(true);
                                }}
                            >
                                Update
                            </button>
                            <button
                                onClick={() =>
                                    setDeletingQuestionId(question.question_id)
                                }
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
                {questions.length > 0 && (
                    <button className='submit-button' onClick={handleSubmit}>
                        Submit
                    </button>
                )}
                <button onClick={() => setShowCreateModal(true)}>
                    Create New Question
                </button>
            </div>
            {/* Pop-up window for successful submission */}
            {submissionSuccess && (
                <div className='popup'>
                    <div className='popup-content'>
                        <span
                            className='close'
                            onClick={() => {
                                navigate('/form-list');
                                setSubmissionSuccess(false);
                            }}
                        >
                            &times;
                        </span>
                        <p>Submission successful!</p>
                    </div>
                </div>
            )}

            {showCreateModal && (
                <div className='modal'>
                    <div className='modal-content'>
                        <span
                            className='close'
                            onClick={() => setShowCreateModal(false)}
                        >
                            &times;
                        </span>
                        <input
                            type='text'
                            value={newQuestionData.question_text}
                            onChange={(e) =>
                                setNewQuestionData((prevState) => ({
                                    ...prevState,
                                    question_text: e.target.value,
                                }))
                            }
                            placeholder='Enter question text'
                        />
                        <select
                            value={newQuestionData.question_type_id}
                            onChange={(e) =>
                                setNewQuestionData((prevState) => ({
                                    ...prevState,
                                    question_type_id: parseInt(e.target.value),
                                }))
                            }
                        >
                            <option value={0}>Text</option>
                            <option value={1}>Multiple Choice</option>
                            <option value={2}>Checkbox</option>
                            <option value={3}>Date</option>
                        </select>
                        {newQuestionData.question_type_id === 1 && ( // Render options input only for Multiple Choice type
                            <div>
                                {newQuestionData.question_option.map(
                                    (option, index) => (
                                        <input
                                            key={index}
                                            type='text'
                                            value={option.determined_answer}
                                            onChange={(e) =>
                                                handleOptionChange(
                                                    index,
                                                    e.target.value
                                                )
                                            }
                                            placeholder={`Option ${index + 1}`}
                                        />
                                    )
                                )}
                                <button onClick={handleAddOption}>
                                    Add Option
                                </button>
                            </div>
                        )}
                        {newQuestionData.question_type_id === 2 && ( // Render options input only for Checkbox type
                            <div>
                                {newQuestionData.question_option.map(
                                    (option, index) => (
                                        <input
                                            key={index}
                                            type='text'
                                            value={option.determined_answer}
                                            onChange={(e) =>
                                                handleOptionChange(
                                                    index,
                                                    e.target.value
                                                )
                                            }
                                            placeholder={`Option ${index + 1}`}
                                        />
                                    )
                                )}
                                <button onClick={handleAddOption}>
                                    Add Option
                                </button>
                            </div>
                        )}
                        <button onClick={handleCreateQuestion}>Create</button>
                    </div>
                </div>
            )}

            {showUpdateModal && (
                <div className='modal'>
                    <div className='modal-content'>
                        <span
                            className='close'
                            onClick={() => setShowUpdateModal(false)}
                        >
                            &times;
                        </span>
                        <input
                            type='text'
                            value={newQuestionData.question_text}
                            onChange={(e) =>
                                setNewQuestionData((prevState) => ({
                                    ...prevState,
                                    question_text: e.target.value,
                                }))
                            }
                            placeholder='Enter question text'
                        />
                        <select
                            value={newQuestionData.question_type_id}
                            onChange={(e) =>
                                setNewQuestionData((prevState) => ({
                                    ...prevState,
                                    question_type_id: parseInt(e.target.value),
                                }))
                            }
                        >
                            <option value={0}>Text</option>
                            <option value={1}>Multiple Choice</option>
                            <option value={2}>Checkbox</option>
                            <option value={3}>Date</option>
                        </select>
                        {newQuestionData.question_type_id === 1 && ( // Render options input only for Multiple Choice type
                            <div>
                                {newQuestionData.question_option.map(
                                    (option, index) => (
                                        <input
                                            key={index}
                                            type='text'
                                            value={option.determined_answer}
                                            onChange={(e) =>
                                                handleOptionChange(
                                                    index,
                                                    e.target.value
                                                )
                                            }
                                            placeholder={`Option ${index + 1}`}
                                        />
                                    )
                                )}
                                <button onClick={handleAddOption}>
                                    Add Option
                                </button>
                            </div>
                        )}
                        {newQuestionData.question_type_id === 2 && ( // Render options input only for Checkbox type
                            <div>
                                {newQuestionData.question_option.map(
                                    (option, index) => (
                                        <input
                                            key={index}
                                            type='text'
                                            value={option.determined_answer}
                                            onChange={(e) =>
                                                handleOptionChange(
                                                    index,
                                                    e.target.value
                                                )
                                            }
                                            placeholder={`Option ${index + 1}`}
                                        />
                                    )
                                )}
                                <button onClick={handleAddOption}>
                                    Add Option
                                </button>
                            </div>
                        )}
                        <button onClick={handleUpdateQuestion}>Update</button>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deletingQuestionId && (
                <div className='modal'>
                    <div className='modal-content'>
                        <span
                            className='close'
                            onClick={() => setDeletingQuestionId(null)}
                        >
                            &times;
                        </span>
                        <p>Are you sure you want to delete this question?</p>
                        <button
                            onClick={() =>
                                handleDeleteQuestion(deletingQuestionId)
                            }
                        >
                            Delete
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FormQuestion;
