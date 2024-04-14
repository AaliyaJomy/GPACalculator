// Function to dynamically create input fields for each class
function createInputFields() {
    var numClasses = parseInt(document.getElementById('numClasses').value);
    var classInputsDiv = document.getElementById('classInputs');
    classInputsDiv.innerHTML = '';
    
    var idNumber = document.getElementById("idNumber").value;
    if (idNumber == "") {
        alert("Please enter your ID Number.");
    }
    var numClass = (document.getElementById('numClasses').value);
    if (numClass == "") {
        alert("Please enter Number of classes.");
    }
    if (numClass <=0) {
        alert("Please enter a valid positive number of classes.");
    }
    // Loop through each class to create input fields dynamically
    for (var i = 1; i <= numClasses; i++) {
        var div = document.createElement('div');
        div.className = 'mb-4'; // Add Bootstrap margin-bottom class
         // Set inner HTML of the div to include input fields for class name, grade, and course type
        div.innerHTML = '<label for="class' + i + '" class="block font-medium text-blue">Class ' + i + ':</label>' +
            '<input type="text" id="class' + i + '" placeholder="Class Name" required class="form-control">' + // Add form-control class for Bootstrap styling
            '<label for="grade' + i + '" class="block font-medium text-blue">Grade:</label>' +
            '<select id="grade' + i + '" class="mt-1 block w-full rounded-md bg-gray-200 border-transparent focus:border-blue-500 focus:bg-blue focus:ring-0 form-select">' + // Add form-select class for Bootstrap styling
            '<option value="A+">A+</option>' +
            '<option value="A">A</option>' +
            '<option value="A-">A-</option>' +
            '<option value="B+">B+</option>' +
            '<option value="B">B</option>' +
            '<option value="B-">B-</option>' +
            '<option value="C+">C+</option>' +
            '<option value="C">C</option>' +
            '<option value="C-">C-</option>' +
            '<option value="D+">D+</option>' +
            '<option value="D">D</option>' +
            '<option value="D-">D-</option>' +
            '<option value="F">F</option>' +
            '</select>' +
            '<label for="type' + i + '" class="block font-medium text-blue">Course Type:</label>' +
            '<select id="type' + i + '" class="mt-1 block w-full rounded-md bg-gray-200 border-transparent focus:border-blue-500 focus:bg-blue focus:ring-0 form-select">' + // Add form-select class for Bootstrap styling
            '<option value="regular">Regular</option>' +
            '<option value="AP">AP/Honors</option>' +
            '</select>';
        classInputsDiv.appendChild(div);
    }
}

// Function to calculate the weighted GPA based on grades and course types
function calculateUnweightedGPA(numClasses) {
    var totalGradePoints = 0;

    for (var i = 1; i <= numClasses; i++) {
        var grade = document.getElementById('grade' + i).value.trim().toUpperCase();

        var gradePoints;

        switch (grade) {
            case 'A+':
            case 'A':
            case 'A-':
                gradePoints = 4.0;
                break;
            case 'B+':
            case 'B':
            case 'B-':
                gradePoints = 3.0;
                break;
            case 'C+':
            case 'C':
            case 'C-':
                gradePoints = 2.0;
                break;
            case 'D+':
            case 'D':
            case 'D-':
                gradePoints = 1.0;
                break;
            case 'F':
                gradePoints = 0;
                break;
            default:
                alert('Invalid grade entered for class ' + i);
                return;
        }

        totalGradePoints += gradePoints;
    }

    var unweightedGPA = totalGradePoints / numClasses;
    return unweightedGPA;
}

// Function to calculate the unweighted GPA based on grades and course types
function calculateWeightedGPA(numClasses) {
    var totalCredits = 0;
    var totalWeightedGradePoints = 0;

    for (var i = 1; i <= numClasses; i++) {
        var grade = document.getElementById('grade' + i).value.trim().toUpperCase();
        var type = document.getElementById('type' + i).value;

        var gradePoints;

        switch (grade) {
            case 'A+':
            case 'A':
            case 'A-':
                gradePoints = 4.0;
                break;
            case 'B+':
            case 'B':
            case 'B-':
                gradePoints = 3.0;
                break;
            case 'C+':
            case 'C':
            case 'C-':
                gradePoints = 2.0;
                break;
            case 'D+':
            case 'D':
            case 'D-':
                gradePoints = 1.0;
                break;
            case 'F':
                gradePoints = 0;
                break;
            default:
                alert('Invalid grade entered for class ' + i);
                return;
        }

        if (type === 'AP') {
            gradePoints += 0.5;
        }
        totalCredits += 5; 
        totalWeightedGradePoints += gradePoints * 5; // Multiply by the credits for weighted GPA
    }
    // WeightedGPA = (WeightedPoints (ie: A:5)/(TotalCredits:5))))
    var weightedGPA = totalWeightedGradePoints / totalCredits;
    return weightedGPA;
}

// Function to calculate GPA based on the selected calculation method
function calculateGPA() {
    var numClasses = parseInt(document.getElementById('numClasses').value);
    var calculationMethod = document.getElementById('gpaCalculationMethod').value;

    var gpa;
    if (calculationMethod === 'weighted') {
        gpa = calculateWeightedGPA(numClasses);
        document.getElementById('result').innerHTML = 'Your ' + calculationMethod.charAt(0).toUpperCase() + calculationMethod.slice(1) + ' GPA is: ' + gpa.toFixed(2);
    } else if (calculationMethod === 'unweighted') {
        gpa = calculateUnweightedGPA(numClasses);
        document.getElementById('result').innerHTML = 'Your ' + calculationMethod.charAt(0).toUpperCase() + calculationMethod.slice(1) + ' GPA is: ' + gpa.toFixed(2);
    } else if (calculationMethod === 'both') {
      var gpa1 =calculateWeightedGPA(numClasses);
      var gpa2  = calculateUnweightedGPA(numClasses);
    document.getElementById('result').innerHTML = 'Your Unweighted GPA is: ' + gpa1.toFixed(2) +'<br>Your Weighted GPA is: ' + gpa2.toFixed(2);;
    }

    var numClasses = parseInt(document.getElementById('numClasses').value);
    var gradesData = []; // Array to store grade data for each class

    // Collect grade data for each class
    for (var i = 1; i <= numClasses; i++) {
        var grade = document.getElementById('grade' + i).value.trim().toUpperCase();
        gradesData.push(grade);
    }

    // Count the occurrences of each grade
    var gradeCounts = {};
    gradesData.forEach(function(grade) {
        gradeCounts[grade] = (gradeCounts[grade] || 0) + 1;
    });

    // Prepare data for the bar chart
    var labels = Object.keys(gradeCounts);
    var data = Object.values(gradeCounts);

    // Create a canvas element for the chart
    var canvas = document.createElement('canvas');
    canvas.id = 'gpaChart';
    canvas.width = 400;
    canvas.height = 200;
    document.getElementById('result').appendChild(canvas);

    // Initialize the bar chart using Chart.js
    var ctx = canvas.getContext('2d');
    var gpaChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Grade Distribution',
                data: data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 159, 64, 0.5)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Grades',
                        color: 'white' // Change x-axis title color
                    },
                    ticks: {
                        color: 'white' // Change x-axis ticks color
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Number of Classes',
                        color: 'white' // Change y-axis title color
                    },
                    ticks: {
                        color: 'white' // Change y-axis ticks color
                    }
                }
            }
        }
    });
}
