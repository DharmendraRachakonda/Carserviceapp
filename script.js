var selectedRow = null



function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
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
    alert("Successfully Booked");
                       
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
    selectedRow.cells[0].innerHTML = formData.date;
    selectedRow.cells[1].innerHTML = formData.custname;
    selectedRow.cells[2].innerHTML = formData.custnumber;
    selectedRow.cells[3].innerHTML = formData.emailid;
    selectedRow.cells[4].innerHTML = formData.services;
    alert("Successfully Updated ");
}

function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
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
 


// For filtering Data

//Get unique values for the sesired columns

// Get unique values for the desired columns

// {2 : ["M", "F"], 3 : ["RnD", "Engineering", "Design"], 4 : [], 5 : []}

function getUniqueValuesFromColumn() {

    var unique_col_values_dict = {}

    allFilters = document.querySelectorAll(".table-filter")
    allFilters.forEach((filter_i) => {
        col_index = filter_i.parentElement.getAttribute("col-index");
        // alert(col_index)
        const rows = document.querySelectorAll("#employeeList > tbody > tr")

        rows.forEach((row) => {
            cell_value = row.querySelector("td:nth-child("+col_index+")").innerHTML;
            // if the col index is already present in the dict
            if (col_index in unique_col_values_dict) {

                //if the cell value is already present in the array
                if (unique_col_values_dict[col_index].includes(cell_value)) {
                 alert(cell_value + " is already present in the array : " + unique_col_values_dict[col_index])

                } else {
                    unique_col_values_dict[col_index].push(cell_value)
                     alert("Array after adding the cell value : " + unique_col_values_dict[col_index])

                }


            } else {
                unique_col_values_dict[col_index] = new Array(cell_value)
            }
        });

        
    });

    for(i in unique_col_values_dict) {
        alert("Column index : " + i + " has Unique values : \n" + unique_col_values_dict[i]);
    }

    updateSelectOptions(unique_col_values_dict)

};

// Add <option> tags to the desired columns based on the unique values

function updateSelectOptions(unique_col_values_dict) {
    allFilters = document.querySelectorAll(".table-filter")

    allFilters.forEach((filter_i) => {
        col_index = filter_i.parentElement.getAttribute('col-index')

        unique_col_values_dict[col_index].forEach((i) => {
            filter_i.innerHTML = filter_i.innerHTML + `\n<option value="${i}">${i}</option>`
        });

    });
};


// Create filter_rows() function

// filter_value_dict {2 : Value selected, 4:value, 5: value}

function filter_rows() {
    allFilters = document.querySelectorAll(".table-filter")
    var filter_value_dict = {}

    allFilters.forEach((filter_i) => {
        col_index = filter_i.parentElement.getAttribute('col-index')

        value = filter_i.value
        if (value != "all") {
            filter_value_dict[col_index] = value;
        }
    });

    var col_cell_value_dict = {};

    const rows = document.querySelectorAll("#employeeList tbody tr");
    rows.forEach((row) => {
        var display_row = true;

        allFilters.forEach((filter_i) => {
            col_index = filter_i.parentElement.getAttribute('col-index')
            col_cell_value_dict[col_index] = row.querySelector("td:nth-child(" + col_index+ ")").innerHTML
        })

        for (var col_i in filter_value_dict) {
            filter_value = filter_value_dict[col_i]
            row_cell_value = col_cell_value_dict[col_i]
            
            if (row_cell_value.indexOf(filter_value) == -1 && filter_value != "all") {
                display_row = false;
                break;
            }


        }

        if (display_row == true) {
            row.style.display = "table-row"

        } else {
            row.style.display = "none"

        }

    })

}


