import React from 'react';

const NewQuestionForm = () => {
  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Form for new questions</h1>
      <div style={questionContainerStyle}>
        <div style={questionStyle}>
          <label style={labelStyle}>Question:</label>
          <input style={inputStyle} type="text" />
        </div>
        <div style={questionStyle}>
          <label style={labelStyle}>Answer:</label>
          <textarea style={textareaStyle} />
        </div>
        <button style={submitButtonStyle} type="submit">
          Save
        </button>
      </div>
    </div>
  );
};

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const headingStyle = {
  marginBottom: '20px',
};

const questionContainerStyle = {
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const questionStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: '10px',
};

const labelStyle = {
  marginBottom: '5px',
};

const inputStyle = {
  padding: '5px 10px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  width: '300px',
};

const textareaStyle = {
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  width: '300px',
  height: '100px',
};

const submitButtonStyle = {
  padding: '10px 20px',
  borderRadius: '5px',
  backgroundColor: '#007BFF',
  color: '#fff',
  border: 'none',
  cursor: 'pointer',
};

export default NewQuestionForm;
