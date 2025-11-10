let formBox = document.getElementById("form");
let studentTable = document.getElementById("stuTable");
let saveButton = document.getElementById("submitBtn");
let prevButton = document.getElementById("prevBtn");
let nextButton = document.getElementById("nextBtn");
let pageText = document.getElementById("pageInfo");
let searchBox = document.getElementById("searchInput");
let rowsDropdown = document.getElementById("rowsPerPage");

let totalCount = document.getElementById("totalRecords");

let firstNameInput = document.getElementById("fname");
let lastNameInput = document.getElementById("lname");
let genderInput =document.getElementById("gender");
let phoneInput = document.getElementById("phone");
let emailInput = document.getElementById("email");
let addressInput =document.getElementById("address");


let studentList = JSON.parse(localStorage.getItem("students")) || [];



let editIndex = null;
let rowsPerPage = parseInt(rowsDropdown.value);
let currentPage = 1
let currentDataList = studentList.slice();






formBox.onsubmit = function (event) {
  event.preventDefault();
  let fname = firstNameInput.value;
  let lname = lastNameInput .value;
  let gender = genderInput.value;
  let phone = phoneInput.value;
  let email = emailInput.value;
  let address=addressInput.value;

  if(phone.length !== 10){
    alert("phone number must be 10 digit")
    return;
  }
  if(fname.includes(" ") || lname.includes(" ")){
    alert("First name and  Last Name should not contain spaces");
    return;
  }
 
for(let i=0 ; i< studentList.length; i++){
    if(editIndex !== null && i === editIndex)
    { 
        continue;
    } 
    if (studentList[i].email.toLowerCase() === email.toLowerCase()) {
        alert("This email address already exists!");
        return;
    }
    if (studentList[i].phone === phone) {
        alert("This mobile number already exists!");
        return;
    } 
};

let  newStudent ={
  fname:fname,
  lname:lname,
  gender:gender,
  phone:phone,
  email:email,
  address:address,
  education:[]
};
if(editIndex !== null){
  studentList[editIndex]=newStudent;
  editIndex=null;
  saveButton.textContent="Save"
}
else{
  studentList.push(newStudent);
}

localStorage.setItem("students", JSON.stringify(studentList));

    formBox.reset();
    currentDataList = studentList.slice();
    currentPage = 1;
showTable();
alert("Data saved successfully.")
  
};






function showTable()
{
  studentTable.innerHTML="";
  let  startIndex=(currentPage-1)*rowsPerPage;
  let endIndex=startIndex+rowsPerPage;

  let pageData=currentDataList.slice(startIndex,endIndex);

  if(pageData.length ===  0){
    studentTable.innerHTML="<tr><td colspan='8'>No Data Found</td></tr>"; 
    }
    else{
        for(let i=0; i<pageData.length;i++)
          {
            let s =pageData[i];
           let index= studentList.indexOf(s);

            let row=`
              <tr>
              <td>${startIndex+i+1}</td>
              <td>${s.fname}</td>
              <td>${s.lname}</td>
              <td>${s.gender}</td>
              <td>${s.phone}</td>
              <td>${s.email}</td>
              <td>${s.address}</td>
              <td>
                <button onclick="editStudent(${index})">Edit</button>
                <button onclick="deleteStudent(${index})">Delete</button>
                <button onclick="openEducation(${index})">Education</button>
                <button onclick="viewStudent(${index})">View</button>
              </td>
            </tr >
    `;
              studentTable.innerHTML+=row; 
          }    
          totalCount.textContent = currentDataList.length;
          updatePagination();
    }

};



function  updatePagination(){
  let totalPages=Math.ceil(currentDataList.length / rowsPerPage);
  pageText.textContent = `Page ${ currentPage } of ${ totalPages || 1 } `;
  prevButton.disabled = currentPage === 1;
  nextButton.disabled = currentPage === totalPages || totalPages === 0;
};





prevButton.onclick = function(){
  if(currentPage>1)
  {
    currentPage--;
    showTable();
  }
};





nextButton.onclick=function(){
  let totalPages=Math.ceil(currentDataList.length/rowsPerPage);
  if(currentPage<totalPages){
    currentPage++;
    showTable();
  }
};


rowsDropdown.onchange = function () {

    rowsPerPage = parseInt(rowsDropdown.value);
    currentPage = 1;
  
    showTable();
};


function deleteStudent(index) {
  if(confirm("you want to delete data")){
    studentList.splice(index,1);
    localStorage.setItem("students", JSON.stringify(studentList));
        currentDataList = studentList.slice();
        let totalPages = Math.ceil(currentDataList.length / rowsPerPage);
        if (currentPage > totalPages && totalPages > 0) {
            currentPage--; 
        } else if (totalPages === 0) {

      currentPage = 1;
        }
        showTable();
        alert("Deleted successfully!");
  }

};

function editStudent(index) {
    let selectedStudent = studentList[index];
    
    firstNameInput.value = selectedStudent.fname;
    lastNameInput.value = selectedStudent.lname;
    genderInput.value = selectedStudent.gender;
    phoneInput.value = selectedStudent.phone;
    emailInput.value = selectedStudent.email;
    addressInput.value = selectedStudent.address;
    
    editIndex = index;
    saveButton.textContent = "Update"; 
};



searchBox.oninput = function () {
    let text = searchBox.value.toLowerCase().trim();
    
    currentDataList = studentList.filter(function (s) {
        return (
            s.fname.toLowerCase().includes(text) ||
            s.lname.toLowerCase().includes(text) ||
            s.email.toLowerCase().includes(text)
        );
    });

    currentPage = 1; 
    showTable();    
};



function openEducation(index){
localStorage.setItem("selectedIndex", index);
window.location.href = "education.html";
};


function viewStudent(index)
{
  localStorage.setItem("selectedIndex" ,index)
  window.location="view.html"
};

showTable();