// Questions and corresponding answers
const questions = [
  {
    question: "What is the capital of France?",
    answer: "Paris"
  },
  {
    question: "What is the largest planet in our solar system?",
    answer: "Jupiter"
  }
  // Add more questions here
];

// Puzzles and corresponding solutions
const puzzles = [
  {
    puzzle: "What has keys but can't open locks?",
    solution: "Piano"
  },
  {
    puzzle: "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?",
    solution: "Echo"
  }
  // Add more puzzles here
];

// Locations based on preferences
const locations = {
  shopping: {
    latitude: 40.7128,
    longitude: -74.0060
  },
  food: {
    latitude: 34.0522,
    longitude: -118.2437
  },
  leisure: {
    latitude: 51.5074,
    longitude: -0.1278
  }
};

let currentQuestionIndex = 0;
let currentPuzzleIndex = 0;

function startGame() {
  const rollNumber = document.getElementById("rollNumber").value;
  if (rollNumber === "") {
    alert("Please enter your Roll Number.");
    return;
  }
  
  document.getElementById("gameContainer").style.display = "none";
  document.getElementById("questionContainer").style.display = "block";
  
  displayQuestion();
  displayPuzzle();
}

function displayQuestion() {
  const questionElement = document.getElementById("question");
  questionElement.textContent = questions[currentQuestionIndex].question;
}

function displayPuzzle() {
  const puzzleElement = document.getElementById("puzzle");
  puzzleElement.textContent = puzzles[currentPuzzleIndex].puzzle;
}

function checkAnswer() {
  const answer = document.getElementById("answer").value.trim();
  const puzzleSolution = document.getElementById("puzzleSolution").value.trim().toLowerCase();
  const preference = document.getElementById("preference").value;
  
  const correctQuestion = questions[currentQuestionIndex].answer.toLowerCase();
  const correctPuzzleSolution = puzzles[currentPuzzleIndex].solution.toLowerCase();
  
  if (answer === correctQuestion && puzzleSolution === correctPuzzleSolution) {
    if (preference) {
      const location = locations[preference];
      const mapUrl = `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;
      alert("Correct answer! Redirecting to location on Google Maps.");
      window.location.href = mapUrl;
      
      storeLocation(rollNumber, location.latitude, location.longitude);
      
      currentQuestionIndex++;
      currentPuzzleIndex++;
      resetInputs();
      displayQuestion();
      displayPuzzle();
    } else {
      alert("Please select a preference.");
    }
  } else {
    alert("Incorrect answer. Try again.");
  }
}

function resetInputs() {
  document.getElementById("answer").value = "";
  document.getElementById("puzzleSolution").value = "";
  document.getElementById("preference").value = "";
}

function storeLocation(rollNumber, latitude, longitude) {
  const url = `https://script.google.com/macros/s/1QjzcHki1HWAdIBueB6jp6ibIhHbKUblI5jZhRK4WfrRJdS830nOIr-fW/exec?rollNumber=${rollNumber}&latitude=${latitude}&longitude=${longitude}`;
  
  fetch(url)
    .then(function(response) {
      if (response.ok) {
        console.log("Location stored successfully.");
      } else {
        console.error("Failed to store location.");
      }
    })
    .catch(function(error) {
      console.error("Error:", error);
    });
}