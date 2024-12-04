🎨**SHADE PARADE**🖌️

by **Tint Titants** 👩🏻👧🏻👩🏻👦🏻

__________________________________________________________________________________________________________________________________________________________________________________________

📝 **Project Overview**

This web application allows users to input color hex codes and sort them by lightness or hue using Merge Sort, Quick Sort, and Bubble Sort. Designed for designers, artists, and developers, it helps organize and visualize color palettes for improved consistency and better design decisions.

__________________________________________________________________________________________________________________________________________________________________________________________

🏗️ **System Architecture**

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

**Sorting Algorithms**

 Merge Sort, Quick Sort, and Bubble Sort:

I. Implemented in JavaScript.

II. Sort colors based on lightness or hue.

**Data Flow**

I. User inputs hex codes → Selects sorting criteria → Algorithm processes data → Sorted palette displayed or downloaded.

**Visualization**

I. Color palettes dynamically rendered using HTML and CSS for real-time updates.

__________________________________________________________________________________________________________________________________________________________________________________________

📚 **Applied Computer Science Concept**

• **Sorting Algorithms**
     are essential to the application, enabling the arrangement of color palettes based on lightness or hue. They ensure the colors are organized logically, making it easier to 
     visualize and maintain design consistency.
__________________________________________________________________________________________________________________________________________________________________________________________

🔄 **Algorithms Used**

I. **Bubble Sort** - a sorting algorithm that compares two adjacent elements and swaps them until they are in the intended order.

     **Time Complexity** 
       Best                            	O(n)
       Worst                          	O(n2)
       Average                        	O(n2)
       Space Complexity               	O(1)
       Stability	                        Yes 


II. **Merge Sort** - one of the most popular sorting algorithms that is based on the principle of Divide and Conquer Algorithm.

     **Time Complexity** 
       Best                           	O(n*log n)
       Worst	                        O(n*log n)
       Average                         	O(n*log n)
       Space Complexity	                O(n)
       Stability	                        Yes


III. **Quick Sort** - a sorting algorithm based on the divide and conquer approach where

     1. An array is divided into subarrays by selecting a pivot element (element selected from the array).

     2. While dividing the array, the pivot element should be positioned in such a way that elements less than pivot are kept on the left side and elements greater than pivot are on the 
        right side of the pivot.
        
     3. The left and right subarrays are also divided using the same approach. This process continues until each subarray contains a single element.
     
     4. At this point, elements are already sorted. Finally, elements are combined to form a sorted array.

     **Time Complexity** 
       Best                            	O(n*log n)
       Worst	                        O(n2)
       Average	                        O(n*log n)
       Space Complexity                     O(log n)
       Stability	                        No

__________________________________________________________________________________________________________________________________________________________________________________________

🔒 **Security Mechanism**

1. **Input Validation**
   - Uses The Color API to validate hex codes, ensuring only properly formatted colors are processed, and limits input to a maximum of 10 hex codes to prevent abuse or overloading.  
2. **Local Storage Security**
   - Encodes sorting data using `JSON.stringify()` before saving to prevent tampering and parses and sanitizes retrieved data to avoid XSS attacks and ensure safe display.  
3. **Canvas Export Protection**
   - Generates downloadable palettes using validated hex codes with the HTML5 Canvas API and ensures proper CORS handling for secure content rendering.  
4. **API Integration**
   - Implements rate limiting for The Color API to prevent overuse and handles invalid or unexpected API responses gracefully to maintain functionality.   

__________________________________________________________________________________________________________________________________________________________________________________________

💡 **Development Process and Design Decisions**

1. **User Needs**: Focused on sorting hex codes by lightness or hue to help designers, artists, and developers visualize palettes effectively.  
2. **Technology Stack**: Used **HTML, CSS, JavaScript**, **Local Storage API** for history, **HTML5 Canvas API** for palette export, and **The Color API** for input validation.  
3. **Algorithm Implementation**: Included **Merge Sort** and **Quick Sort** for efficiency with large datasets and **Bubble Sort** for simpler or smaller data.  
4. **Usability Enhancements**: Limited input to 10 hex codes for performance and ensured a responsive, user-friendly interface.  
__________________________________________________________________________________________________________________________________________________________________________________________

✅⚡ **Correctness and Efficiency**

**Correctness**

• Ensures hex codes are correctly sorted by lightness or hue, providing reliable results:

       I. Lightness: Sorts colors from dark to light.
       
       II. Hue: Sorts colors according to the ROYGBIV spectrum.
        
• Uses Merge Sort, Quick Sort, and Bubble Sort to guarantee proper arrangement based on the selected attribute.

• Verifies that only correctly formatted hex codes are processed, preventing errors.

• Restricts inputs to a maximum of 10 hex codes to maintain reliability and avoid processing invalid or excessive data.

**Efficiency**

• Merge Sort and Quick Sort are used for larger datasets, leveraging their O(n log n) time complexity for better performance.

• Bubble Sort, with O(n²) complexity, is included for smaller datasets or educational use.

• Combines efficient sorting algorithms to handle varying input sizes effectively.

• Offers flexibility by integrating both high-performance algorithms and simpler, intuitive options, ensuring usability across different user needs.

__________________________________________________________________________________________________________________________________________________________________________________________

🚀 **How to Run the Project**

1. Clone the Repository

   -Run git clone <repository_url> in your terminal.
 
2. Navigate to the Project Folder

   -Use cd <project_folder_name> to enter the project directory.

3. Open the HTML File

   -Locate and open the main HTML file (e.g., index.html).

4. View the Project

   -The main page will display in your browser.

__________________________________________________________________________________________________________________________________________________________________________________________

👥 **Contributors**

• Frontend Developer- <a href="https://github.com/rnlyra" target="_blank">Rain Lyrra Panganiban</a> , <a href="https://github.com/hiy17" target="_blank">Jude Tadeja</a>
                    
• Backend Developer-  <a href="https://github.com/mjml1485" target="_blank">Mara Joy Lontok</a>

• Project Manager/Fullstack Developer- <a href="https://github.com/princessdlssnts" target="_blank">Princess Mae Delos Santos</a>

__________________________________________________________________________________________________________________________________________________________________________________________

🌸 **Acknowledgement**

• <a href="https://github.com/marieemoiselle" target="_blank">Ms. Fatima Marie Agdon</a> - Web System and Technologies Instructor
__________________________________________________________________________________________________________________________________________________________________________________________

🛠️ **Built With**

• Frontend: HTML5, CSS3, JavaScript

• Backend: JavaScript

• APIs/Frameworks: Local Storage API, HTML5 Canvas API, The Color API
