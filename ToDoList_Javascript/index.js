function addItem() {
    let a_title = document.getElementById('title').value;
    let a_desc = document.getElementById('description').value;

    if (a_title != "" && a_desc != "") {
        if (localStorage.getItem('ItemJson') == null) {
            itemJsonArray = [];
            itemJsonArray.push([a_title, a_desc]);
            localStorage.setItem('ItemJson', JSON.stringify(itemJsonArray));
        }
        else {
            itemJsonArraystr = localStorage.getItem('ItemJson');
            itemJsonArray = JSON.parse(itemJsonArraystr);
            itemJsonArray.push([a_title, a_desc]);
            localStorage.setItem('ItemJson', JSON.stringify(itemJsonArray));
        }
    }
    updateList();

}
function updateList() {

    let tableBody = document.getElementById("listhere");
    let str = "";
    if (localStorage.getItem('ItemJson') == null) {
        itemJsonArray = [];
        localStorage.setItem('ItemJson', JSON.stringify(itemJsonArray));
    }
    else {
        itemJsonArraystr = localStorage.getItem('ItemJson');
        itemJsonArray = JSON.parse(itemJsonArraystr);
        localStorage.setItem('ItemJson', JSON.stringify(itemJsonArray));
    }
    itemJsonArray.forEach((element, index) => {
        str += `
        <tr>
            <th scope="row">${index + 1}</th>
            <td>${element[0]}</td>
            <td>${element[1]}</td>
            <td><button onClick="deleteItem(${index})" class="btn btn-primary">Delete</button></td>
        </tr>`
    });
    listhere.innerHTML = str;
}
function deleteItem(index) {
    itemJsonArraystr = localStorage.getItem('ItemJson');
    itemJsonArray = JSON.parse(itemJsonArraystr);
    itemJsonArray.splice(index, 1);
    localStorage.setItem('ItemJson', JSON.stringify(itemJsonArray));
    updateList();
}
function clearAll() {
    if (confirm("Do You want to delete all acheivements?")) {
        localStorage.clear();
        updateList();
    }
}
add = document.getElementById("submit");
add.addEventListener("click", addItem);
updateList();