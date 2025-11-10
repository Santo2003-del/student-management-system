let tableBody = document.getElementById("viewEduTableBody");
let prevBtn = document.getElementById("viewPrevBtn");
let nextBtn = document.getElementById("viewNextBtn");
let pageInfo = document.getElementById("viewPageInfo");
let searchBox = document.getElementById("viewSearchInput");
let rowsDropdown = document.getElementById("viewRowsPerPage");
let totalRecords = document.getElementById("totalViewRecords");
let backBtn = document.getElementById("backBtn");


let firstNameBox = document.getElementById("viewFirstName");
let  lastNameBox = document.getElementById("viewLastName");
let genderBox = document.getElementById("viewGender");
let phoneBox = document.getElementById("viewPhone");
let  emailBox = document.getElementById("viewEmail");
let addressBox = document.getElementById("viewAddress");

let studentList =JSON.parse(localStorage.getItem("students")) || [];
let selectedIndex=parseInt(localStorage.getItem("selectedIndex"));

let student=studentList[selectedIndex];
if (!student) {
    window.location.href = "index.html";
}


function showStudentDetails(){
   firstNameBox.textContent = student.fname;
   lastNameBox.textContent = student.lname;
   genderBox.textContent = student.gender;
   phoneBox.textContent = student.phone;
   emailBox.textContent = student.email;
   addressBox.textContent = student.address;
}
showStudentDetails();


let  eduList = (student && student.education) ? student.education : [];

let rowsToShow = parseInt(rowsDropdown.value);
let currentPage=1;
let  showList = eduList.slice();

function showEduTable(){
    tableBody.innerHTML = "";
    let start = (currentPage - 1) * rowsToShow;
    let  end = start + rowsToShow;
    let  pageData = showList.slice(start, end);
     if(pageData.length===0){
           tableBody.innerHTML = "<tr><td colspan='4'>No Education Records Found</td></tr>";
     }else{
        for(let i=0;i<pageData.length;i++){
            let edu = pageData[i];
            let row =`<tr>
                    <td>${start+ i + 1}</td>
                    <td>${edu.class}</td>
                    <td>${edu.subject}</td>
                    <td>${edu.mark}</td>
            </tr>`;
           tableBody.innerHTML += row;
        }
        
     }
         totalRecords.textContent = showList.length;
         updatePageInfo();
         

}

function updatePageInfo() {
  let totalPages = Math.ceil(showList.length / rowsToShow);
  pageInfo.textContent = "Page " + currentPage + " of " + totalPages;
  prevBtn.disabled = (currentPage === 1);
  nextBtn.disabled = (currentPage === totalPages || totalPages === 0);
}

searchBox.oninput = function () {
  let text = searchBox.value.toLowerCase().trim();
  showList = eduList.filter(function (edu) {
    return (
      edu.class.toLowerCase().includes(text) ||
      edu.subject.toLowerCase().includes(text)
    );
  });
  currentPage = 1;
  showEduTable();
};

rowsDropdown.onchange = function () {
  rowsToShow = parseInt(rowsDropdown.value);
  currentPage = 1;
  showEduTable();
};

prevBtn.onclick= function () {
  if (currentPage > 1) {
    currentPage--;
    showEduTable();
  }
};

nextBtn.onclick = function () {
  let totalPages = Math.ceil(showList.length / rowsToShow);
  if (currentPage < totalPages) {
    currentPage++;
    showEduTable();
  }
};


backBtn.onclick = function () {
  window.location.href = "index.html";
};
showEduTable()
