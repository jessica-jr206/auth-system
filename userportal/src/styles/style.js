import styled from 'styled-components';

export const StyledComponent = styled.div`

.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
}

.card {
  background-color: #e3d4ff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 20px;
  width: 100%;
  max-width: 400px;
  margin: 20px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

form {
  display: flex;
  flex-direction: column;
}

input {
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  width: 95%;
}

input:focus {
  border-color: #9470d8;
  outline: none;
}

button {
  padding: 10px;
  background-color: #9470d8;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin: 30px 0;
}

button:disabled {
  background-color: #ccc;
}

.error-message {
  color: red;
  font-size: 12px;
  margin-top: -8px;
  display: block !important;
}

.home-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #9470d8;
  color: white;
  padding: 15px 30px;
}

.site-title {
  font-size: 24px;
  font-weight: bold;
}

.header-buttons {
  display: flex;
}

.header-button {
  background-color: white;
  color: #9470d8;
  border: 2px solid #9470d8;
  padding: 10px 20px;
  border-radius: 4px;
  margin-left: 10px;
  margin: 0 10px 0 0 !important;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.header-button:hover {
  background-color: #8760cf;
  color: white;
}

.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  text-align: center;
  padding: 20px;
}

.content-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.content-button {
  padding: 10px 20px;
  background-color: #9470d8;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.content-button:hover {
  background-color: #8760cf;}

.link-button {
  color: #9470d8;
  font-weight: bold;
  text-decoration: none;
  cursor: pointer;
}

.link-button:hover {
  text-decoration: underline;
}

.form-footer {
  margin-top: 15px;
  text-align: center;
}

.form-footer p {
  margin: 0;
}

.remember-me {
  margin-top: 10px;
  display: flex;
  align-items: center;
}

.remember-me label {
  font-size: 14px;
  margin-left: 8px; 
}

.checkbox-input{
  width: auto !important;
  margin: 0 10px;
}

.button-container {
  display: flex;
  justify-content: space-between;
  gap: 10px; 
  margin: 20px;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #f1f1f1;
}

.dashboard-header h1 {
  margin: 0;
}

.header-icons button {
  background: none;
  border: none;
  font-size: 24px;
  margin-left: 15px;
  cursor: pointer;
}

.header-icons button:hover {
  color: #007bff;
}

`;