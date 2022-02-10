var selectedRow = null
var bookings = JSON.parse(localStorage.getItem("bookings")) || [];

window.onload = ()=>{
    displayTable(bookings)
}

function removeFilters(){
    displayTable(bookings)
    document.getElementById("closefilterIcon").style.display = "none"
    document.getElementById("filterDateSelector").value = ""
}

function savetoLocalStorage(){
    localStorage.setItem("bookings",JSON.stringify(bookings))
}

function filterBookings(){
    const filterRemoveIcon = document.getElementById("closefilterIcon");
    const filterDate = document.getElementById("filterDateSelector").value
    const filteredData = bookings.filter(i => i.date === filterDate)
    console.log(filteredData)
    if(filteredData.length > 0){
    displayTable(bookings.filter(i => i.date === filterDate))
    alert(filteredData.length+" Bookings Found on "+filterDate.split("-").reverse().join("-"))
    filterRemoveIcon.style.display = "inline"
    }else{
    alert("No Bookings Found on "+filterDate.split("-").reverse().join("-"))
    document.getElementById("filterDateSelector").value = ""
    filterRemoveIcon.style.display = "none"
    displayTable(bookings)
    }
}

function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null){
            formData["id"] = Date.now();
            bookings.push(formData)
            insertNewRecord(formData);
        } else
            updateRecord(formData);
        resetForm();
    }
} 

function readFormData() {
    var formData = {};
    formData["date"] = document.getElementById("date").value;
    formData["custname"] = document.getElementById("custname").value;
    formData["custnumber"] = document.getElementById("custnumber").value;
    formData["emailid"] = document.getElementById("emailid").value;         
    formData["services"] = document.getElementById("services").value;
    return formData;    
}

function displayTable(data){
    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0]
    var tbodyStr = ""
    var editImage = '<img onClick="onEdit(this)" id="edit" style=" cursor: pointer; padding-right:20px" src="https://img.icons8.com/material-outlined/18/000000/edit--v1.png"/>'
    var deleteImage = '<img onClick="onDelete(this)" id="delete" style="cursor: pointer; padding-left:20px" src="https://img.icons8.com/material-rounded/18/000000/filled-trash.png"/>`'
    data.forEach(i => {
        tbodyStr += "<tr>"+
        "<td>"+i.date+"</td>"+
        "<td>"+i.custname+"</td>"+
        "<td>"+i.custnumber+"</td>"+
        "<td>"+i.emailid+"</td>"+
        "<td>"+i.services+"</td>"+
        "<td>"+editImage+deleteImage+"</td>"+
        "<td style='display:none;'>"+i.id+"</td>"+
        "</tr>"
    })
    
    table.innerHTML = tbodyStr
}

function insertNewRecord(data) {
    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.date;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.custname;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.custnumber;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.emailid;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = data.services;
    cell5 = newRow.insertCell(5);
    cell5.innerHTML = `<img onClick="onEdit(this)" id="edit" style=" cursor: pointer; padding-right:20px" src="https://img.icons8.com/material-outlined/18/000000/edit--v1.png"/>
    <img onClick="onDelete(this)" id="delete" style="cursor: pointer; padding-left:20px" src="https://img.icons8.com/material-rounded/18/000000/filled-trash.png"/>`;
    cell6 = newRow.insertCell(6);
    cell6.innerHTML = data.id
    cell6.style.display = "none"
    alert("Successfully Booked");  
    savetoLocalStorage()                
}

function resetForm() {
    document.getElementById("date").value = "";
    document.getElementById("custname").value = "";
    document.getElementById("custnumber").value = "";
    document.getElementById("emailid").value = "";
    document.getElementById("services").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("date").value = selectedRow.cells[0].innerHTML;
    document.getElementById("custname").value = selectedRow.cells[1].innerHTML;
    document.getElementById("custnumber").value = selectedRow.cells[2].innerHTML;
    document.getElementById("emailid").value = selectedRow.cells[3].innerHTML;
    document.getElementById("services").value = selectedRow.cells[4].innerHTML;
}
function updateRecord(formData) {
    updateData(formData,selectedRow.cells[6].innerHTML)
    selectedRow.cells[0].innerHTML = formData.date;
    selectedRow.cells[1].innerHTML = formData.custname;
    selectedRow.cells[2].innerHTML = formData.custnumber;
    selectedRow.cells[3].innerHTML = formData.emailid;
    selectedRow.cells[4].innerHTML = formData.services;
    alert("Successfully Updated ");
}

function updateData(formData,id){
    for(let i = 0;i < bookings.length;i++){
        if(bookings[i].id === id){
            bookings[i] = formData
            bookings[i].id = id
        }
    }
    savetoLocalStorage()
}

function deleteData(id){
 bookings = bookings.filter(i => i.id === parseInt(id))
 savetoLocalStorage()
}

function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        deleteData(row.cells[6].innerHTML)
        document.getElementById("employeeList").deleteRow(row.rowIndex);
        resetForm();
    }
}
function validate() {
    isValid = true;
    if (document.getElementById("date").value == "") {
        isValid = false;
        document.getElementById("fullNameValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("fullNameValidationError").classList.contains("hide"))
            document.getElementById("fullNameValidationError").classList.add("hide");
    }
    return isValid;
}
 