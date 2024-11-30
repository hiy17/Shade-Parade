**🎨 SHADE PARADE 🎨**
                                                     by **Tint Titans**


**Project Overview**

This web application allows users to input color hex codes and sort them by lightness or hue using Merge Sort, Quick Sort, and Bubble Sort. Designed for designers, artists, and developers, it helps organize and visualize color palettes for improved consistency and better design decisions.

**System Architecture**

**Frontend**

• Technologies: HTML, CSS, JavaScript.

• Functionality:

I. User interface for inputting color hex codes.

II. Options to select sorting algorithms (Merge Sort, Quick Sort, Bubble Sort).

III. Displays sorted and visualized color palettes.

**Backend**

• Technologies: Local Storage API, HTML Canvas API, The Color API.

• Functionality:

I. Saving History: Use the Local Storage API to store user input and sorting results locally in the browser.

II. Downloading Palette: Use the HTML Canvas API to convert color palettes into JPG format for download.

III. Input Validation and Limitation: Use The Color API to validate hex codes and enforce input restrictions.

• Sorting Algorithms

- Merge Sort, Quick Sort, and Bubble Sort:

I. Implemented in JavaScript.

II. Sort colors based on lightness or hue.

• Data Flow

I. User inputs hex codes → Selects sorting criteria → Algorithm processes data → Sorted palette displayed or downloaded.

• Visualization

I. Color palettes dynamically rendered using HTML and CSS for real-time updates.


**Applied Computer Science Concept**

• Sorting Algorithms 
     they form the core functionality of the application by enabling the organization of color palettes based on lightness or hue. These algorithms—
     
I. **Bubble Sort**

II. **Merge Sort** 

III. **Quick Sort**

—are crucial for achieving the application's goal of providing structured, visually appealing color arrangements for designers, artists, and developers.


**Security Mechanism**


**Development Process and Design Decisions**


**Correctness and Efficiency**

**Correctness**  
• Ensures hex codes are correctly sorted by lightness or hue, providing reliable results.  
• Uses Merge Sort, Quick Sort, and Bubble Sort to guarantee proper arrangement based on the selected attribute.  
• Verifies that only correctly formatted hex codes are processed, preventing errors.  
• Restricts inputs to a maximum of 10 hex codes to maintain reliability and avoid processing invalid or excessive data.  

**Efficiency**  
• Merge Sort and Quick Sort are used for larger datasets, leveraging their O(n log n) time complexity for better performance.  
   Bubble Sort, with O(n²) complexity, is included for smaller datasets or educational use.  
• Combines efficient sorting algorithms to handle varying input sizes effectively.  
• Offers flexibility by integrating both high-performance algorithms and simpler, intuitive options, ensuring usability across different user needs.  

**How to Run the Project**

1. Clone the Repository

 -Run git clone <repository_url> in your terminal.
 
2. Navigate to the Project Folder

-Use cd <project_folder_name> to enter the project directory.

3. Open the HTML File

-Locate and open the main HTML file (e.g., index.html).

4. View the Project

-The main page will display in your browser.

**Contributors**

• Jude/Rain - Frontend Developer

• Mara - Backend Developer

• Princess - Project Manager/Fullstack Developer

**Acknowledgement**

• Ma’am Fatima - Websystem Prof

**Built With**

• Frontend: HTML5, CSS3, JavaScript

• Backend: JavaScript

• APIs/Frameworks: Local Storage API
