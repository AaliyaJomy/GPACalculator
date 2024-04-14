// Function to toggle the visibility of the GPA form
function toggleForm() {
    var form = document.getElementById('gpaForm');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
}

// Function to download GPA information as a text file
function downloadGPA() {
    var studentID = document.getElementById('studentID').value;
    var weightedGPA = document.getElementById('weightedGPA').value;
    var unweightedGPA = document.getElementById('unweightedGPA').value;
    if (studentID == "") {
        alert("Please enter your ID Number.");
        return false;
    }  
    if (weightedGPA == "" && unweightedGPA=="") {
        alert("Please enter your GPA or 'NIL'.");
        return false;
    }
    var gpaInfo = "Student ID: " + studentID + "\nWeighted GPA: " + weightedGPA + "\nUnweighted GPA: " + unweightedGPA;

    var blob = new Blob([gpaInfo], { type: "text/plain;charset=utf-8" });
    var downloadLink = document.createElement("a");
    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.download = "GPA.txt"; // File name
    downloadLink.click();
}

// Function to toggle the visibility of a dropdown menu and clear a message
function toggleDropdown() {
    var dropdown = document.getElementById('dropdown');
    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
    var message = document.getElementById('message');
    message.textContent = ''; // Clear the message when the dropdown is toggled
}

// Function to handle the selection made in the dropdown menu
function submitSelection() {
    var selectedValue = document.getElementById('options').value;
    var message = document.getElementById('message');
    if (selectedValue === 'weighted') {
        message.textContent = "Weighted GPA is a method of calculating a student's grade point average (GPA) that takes into account the difficulty of the courses they have taken. In a weighted GPA system, certain classes are assigned higher point values based on their level of difficulty, typically advanced or honors courses. For example, an A in an honors class might be worth more than an A in a standard class. This system rewards students for taking more challenging coursework and provides a more accurate reflection of their academic performance. Colleges and universities often consider weighted GPAs when evaluating applicants, as they provide insight into a student's ability to excel in rigorous academic environments. To know more, click";
       
        var link = document.createElement('a');
        link.textContent = ' here.';
        link.href = 'about.html';
        message.appendChild(link);
    
    } else if (selectedValue === 'unweighted') {
        message.textContent = "Calculating an unweighted GPA involves straightforward arithmetic. First, assign each letter grade a numerical value, typically on a scale from 0 to 4, with A being 4, B being 3, C being 2, D being 1, and F being 0. Next, add up all the numerical values of your grades. Then, divide the sum by the total number of classes you've taken. This yields your unweighted GPA. For example, if you've earned two A's (4 + 4 = 8) and one B (3), your sum would be 11. Divide 11 by the total number of classes, let's say 3, and your unweighted GPA would be approximately 3.67. To know more, click";
        
        var link = document.createElement('a');
        link.textContent = ' here.';
        link.href = 'about.html';
        message.appendChild(link);
    }
}

