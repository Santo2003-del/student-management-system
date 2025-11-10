
let eduForm = document.getElementById("educationForm");
let eduTableBody = document.getElementById("eduTableBody");
let eduPrevBtn = document.getElementById("eduPrevBtn");
let eduNextBtn = document.getElementById("eduNextBtn");
let eduPageInfo = document.getElementById("eduPageInfo");
let eduSearchBox = document.getElementById("eduSearchInput");
let eduRowsDropdown = document.getElementById("eduRowsPerPage");
let eduTotalRecords = document.getElementById("totalEduRecords");
let backBtn = document.getElementById("backBtn");




let eduClassInput = document.getElementById("edu_class");
let eduSubjectInput = document.getElementById("edu_subject");
let eduMarkInput = document.getElementById("edu_mark");
let submitEduBtn = document.getElementById("submitEduBtn");




let studentList = JSON.parse(localStorage.getItem("students")) || [];
let selectedIndex = parseInt(localStorage.getItem("selectedIndex")); 



let editEduIndex = null; 
let rowsPerPage = parseInt(eduRowsDropdown.value);
let currentPage = 1;
let currentStudent = studentList[selectedIndex];



if (isNaN(selectedIndex) || selectedIndex < 0 || selectedIndex >= studentList.length || !studentList[selectedIndex]) {
    window.location.href = "index.html"; 
}

if (!currentStudent.education) {
    currentStudent.education = [];
}


let educationList = currentStudent.education; 
let currentEduDataList = educationList.slice();
 


eduForm.onsubmit =function(event){

event.preventDefault();

let eduClass = eduClassInput.value.trim();
let  eduSubject= eduSubjectInput.value;
let  eduMark= eduMarkInput.value;

if (!eduClass || !eduSubject || !eduMark) {
        alert("Please fill all fields!");
        return
}
 if(isNaN(eduMark) ||  eduMark<0 || eduMark>100){
    alert("pelease enter  valid marak between 0 to 100");
 }
//  for(let i=0;i<=educationList.length;i++){

//  if(editEduIndex !== null || i === editEduIndex){
//     continue  
//  }
//  if(educationList[i] && )

let newRecord = {
        class: eduClass,
        subject: eduSubject,
        mark: eduMark
    };

    if (editEduIndex !== null) {
    
        educationList[editEduIndex] = newRecord;
        editEduIndex = null;
        submitEduBtn.textContent = "Add Record";
    } else {
        
        educationList.push(newRecord);
    }
    localStorage.setItem("students", JSON.stringify(studentList)); 

    eduForm.reset();
    currentEduDataList = educationList.slice(); 
    showEducationTable();
    alert("Education record saved successfully!");
};

function showEducationTable(){
    eduTableBody.innerHTML="";
    let startIndex = (currentPage - 1) * rowsPerPage;
    let endIndex = startIndex + rowsPerPage;
    let pageData = currentEduDataList.slice(startIndex, endIndex);
    if (pageData.length === 0) {
      eduTableBody.innerHTML = "<tr><td colspan='5'>No Education Records Found</td></tr>"; 
    } else {
    
        for (let i = 0; i < pageData.length; i++) {
            let eduRecord = pageData[i];
            let originalIndex = educationList.indexOf(eduRecord);  
            let row = `
                <tr>
                    <td>${startIndex + i + 1}</td>
                    <td>${eduRecord.class}</td>
                    <td>${eduRecord.subject}</td>
                    <td>${eduRecord.mark}</td>
                    <td>
                        <button onclick="editEducation(${originalIndex})">Edit</button>
                        <button onclick="deleteEducation(${originalIndex})">Delete</button>
                    </td>
                </tr>
            `;
            eduTableBody.innerHTML += row; 
        }
    }
    eduTotalRecords.textContent = currentEduDataList.length; // Total records dikhana
    updateEducationPagination();
};

function updateEducationPagination()
{
    let  totalPages=Math.ceil(currentEduDataList.length/rowsPerPage);
    eduPageInfo.textContent=`Page ${currentPage} of ${totalPages|| 1}`

    eduPrevBtn.disabled = currentPage === 1;
    eduNextBtn.disabled=currentPage === totalPages || totalPages === 0
};

eduPrevBtn.onclick=function(){
    if(currentPage>1){
        currentPage--;
        showEducationTable();
    }
}


eduNextBtn.onclick=function(){
   let  totalPages=Math.ceil(currentEduDataList.length/rowsPerPage)
    if(currentPage<totalPages)
        currentPage++;
         showEducationTable();
}

eduRowsDropdown.onchange=function(){
    rowsPerPage=parseInt(eduRowsDropdown.value);
    currentPage=1;
    showEducationTable();
}


function  deleteEducation(index){
    if(confirm("are want to delete Education detail")){
    educationList.splice(index,1);
    localStorage.setItem("students", JSON.stringify(studentList));

    currentEduDataList = educationList.slice();
    
    let totalPages = Math.ceil(currentEduDataList.length / rowsPerPage);

    if (currentPage > totalPages && currentPage > 1) {
            currentPage--;
        }
        showEducationTable();
        alert("Record deleted successfully!");
 }
};


function editEducation(index){
    let recordToEdit = educationList[index];
    
    eduClassInput.value = recordToEdit.class;
    eduSubjectInput.value = recordToEdit.subject;
    eduMarkInput.value = recordToEdit.mark;

    editEduIndex = index;
    submitEduBtn.textContent = "Update Record";
}

eduSearchBox.oninput = function () {
    let text = eduSearchBox.value.toLowerCase().trim();
    currentEduDataList = educationList.filter(function (record) {

        return (
            record.class.toLowerCase().includes(text) ||
            record.subject.toLowerCase().includes(text)
        );
    });
    currentPage = 1; 
    showEducationTable(); 
};


backBtn.onclick = function(){
     window.location.href = "index.html";
}  


 showEducationTable(); 
