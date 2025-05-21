// Student Number Selector
// This script implements a random student number selector as specified in the PRD

// DOM Elements
let totalInput;
let gridContainer;
let generateButton;
let selectButton;
let resetButton;

// Initialize the application when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Get DOM elements
  totalInput = document.getElementById('total');
  gridContainer = document.getElementById('grid');
  generateButton = document.getElementById('generate-btn');
  selectButton = document.getElementById('select-btn');
  resetButton = document.getElementById('reset-btn');

  // Set up event listeners
  if (generateButton) generateButton.addEventListener('click', generateGrid);
  if (selectButton) selectButton.addEventListener('click', selectNumber);
  if (resetButton) resetButton.addEventListener('click', resetGrid);

  // Create HTML structure if it doesn't exist
  createHTMLStructure();
  
  // Generate initial grid
  generateGrid();
});

/**
 * Creates the HTML structure if it doesn't exist in the document
 */
function createHTMLStructure() {
  // Check if container exists, if not create it
  let container = document.querySelector('.container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'container';
    document.body.appendChild(container);

    // Create title
    const title = document.createElement('h1');
    title.textContent = 'Student Number Selector';
    container.appendChild(title);

    // Create input group
    const inputGroup = document.createElement('div');
    inputGroup.className = 'input-group';
    container.appendChild(inputGroup);

    // Create input label
    const inputLabel = document.createElement('label');
    inputLabel.setAttribute('for', 'total');
    inputLabel.textContent = 'Total Students:';
    inputGroup.appendChild(inputLabel);

    // Create input field
    totalInput = document.createElement('input');
    totalInput.type = 'number';
    totalInput.id = 'total';
    totalInput.min = '1';
    totalInput.max = '100';
    totalInput.value = '30';
    inputGroup.appendChild(totalInput);

    // Create generate button
    generateButton = document.createElement('button');
    generateButton.id = 'generate-btn';
    generateButton.textContent = 'Generate';
    generateButton.addEventListener('click', generateGrid);
    inputGroup.appendChild(generateButton);

    // Create grid container
    gridContainer = document.createElement('div');
    gridContainer.id = 'grid';
    gridContainer.className = 'grid';
    container.appendChild(gridContainer);

    // Create action buttons container
    const actionButtons = document.createElement('div');
    actionButtons.className = 'action-buttons';
    container.appendChild(actionButtons);

    // Create select button
    selectButton = document.createElement('button');
    selectButton.id = 'select-btn';
    selectButton.textContent = 'Select';
    selectButton.addEventListener('click', selectNumber);
    actionButtons.appendChild(selectButton);

    // Create reset button
    resetButton = document.createElement('button');
    resetButton.id = 'reset-btn';
    resetButton.textContent = 'Reset';
    resetButton.addEventListener('click', resetGrid);
    actionButtons.appendChild(resetButton);

    // Add CSS styles
    addStyles();
  }
}

/**
 * Adds CSS styles to the document
 */
function addStyles() {
  const styleElement = document.createElement('style');
  styleElement.textContent = `
    * {
      box-sizing: border-box;
      font-family: Arial, sans-serif;
    }
    body {
      margin: 0;
      padding: 20px;
      background-color: #f5f5f5;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      text-align: center;
    }
    h1 {
      color: #333;
      margin-top: 0;
    }
    .input-group {
      margin-bottom: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;
    }
    label {
      font-size: 16px;
      font-weight: bold;
      margin-right: 5px;
    }
    input[type="number"] {
      width: 80px;
      padding: 8px;
      font-size: 16px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    button {
      padding: 8px 16px;
      font-size: 16px;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    button:hover {
      background-color: #45a049;
      transform: scale(1.05);
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 10px;
      margin: 20px 0;
    }
    .number {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 60px;
      background-color: white;
      border: 2px solid #333;
      border-radius: 8px;
      font-size: 18px;
      font-weight: bold;
      transition: all 0.3s ease;
    }
    .number:hover {
      border-color: #4CAF50;
    }
    .highlight {
      background-color: #FFFF99;
      border-color: #FFA500;
      transform: scale(1.05);
    }
    .action-buttons {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin-top: 20px;
    }
    #select-btn {
      background-color: #2196F3;
    }
    #select-btn:hover {
      background-color: #0b7dda;
    }
    #reset-btn {
      background-color: #f44336;
    }
    #reset-btn:hover {
      background-color: #d32f2f;
    }
    
    /* Responsive design */
    @media (max-width: 600px) {
      .grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }
    @media (max-width: 400px) {
      .grid {
        grid-template-columns: repeat(2, 1fr);
      }
      .action-buttons {
        flex-direction: column;
        gap: 10px;
      }
    }
  `;
  document.head.appendChild(styleElement);
}

/**
 * Generates the grid of student numbers based on the input value
 */
function generateGrid() {
  // Get the total number of students from input
  const total = parseInt(totalInput.value);
  
  // Validate input
  if (total < 1 || total > 100 || isNaN(total)) {
    alert('Please enter a number between 1 and 100');
    return;
  }
  
  // Clear the grid
  gridContainer.innerHTML = '';
  
  // Create number elements
  for (let i = 1; i <= total; i++) {
    const numberElement = document.createElement('div');
    numberElement.className = 'number';
    numberElement.textContent = i;
    gridContainer.appendChild(numberElement);
  }
}

/**
 * Randomly selects a student number and highlights it
 */
function selectNumber() {
  // Get all number elements
  const numbers = document.querySelectorAll('.number');
  
  // Check if there are any numbers to select
  if (numbers.length === 0) {
    alert('Please generate the grid first');
    return;
  }
  
  // Remove highlight from all numbers
  numbers.forEach(number => number.classList.remove('highlight'));
  
  // Select a random number
  const randomIndex = Math.floor(Math.random() * numbers.length);
  numbers[randomIndex].classList.add('highlight');
  
  // Scroll to the selected number if it's not visible
  numbers[randomIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/**
 * Resets the grid based on the current input value
 */
function resetGrid() {
  // Remove highlight from all numbers
  const numbers = document.querySelectorAll('.number');
  numbers.forEach(number => number.classList.remove('highlight'));
  
  // Regenerate the grid
  generateGrid();
}