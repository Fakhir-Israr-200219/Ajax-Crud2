$(document).ready(function () {
    alert("jquery is runnog")
    ShowData();
})

$('#OpenModal').click(function () {
    $('#modal').modal('show');
})

function ShowData() {
    $.ajax({
        url: 'https://localhost:7215/User/Get',
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json;charset=utf-8',
        success: function (result, ststus, xhr) {
            var html = '';
            $.each(result, function (index,item) {
                html += '<tr>';
                html += '<td>' + item.id + '</td>';
                html += '<td>' + item.userName + '</td>';
                html += '<td>' + item.email + '</td>';
                html += '<td>' + item.password + '</td>';
                html += '<td><button class="btn btn-primary" onclick="EditForm(' + item.id + ')">Edit</button><button class="btn btn-danger" onclick="DeleteUser(' + item.id + ')">Delete</button></td>';
                html += '/<tr>';
            })
            $('#tableData').html(html)
        },
        error: function () {
            alert("data can't be reach")
        }
    })
}

function AddUSer() {
    var objData = {
        userName: $('#UserName').val(),
        email:$('#Email').val(),
        password: $('#Password').val()
    }
    $.ajax({
        url: 'https://localhost:7215/User/AddUser',
        type: 'POST',
        data:objData,
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        success: function (response) {
            alert(response)
            ShowData();
        },
        error: function () {

        }
    })
}

function DeleteUser(id) {
    $.ajax({
        url: 'https://localhost:7215/User/Delete/' + id,
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        success: function (response) {
            alert(response);
            ShowData();
        },
        error: function () {
            alert("some isssue acoure while delete")
        }
    })
}
//open edit form
function EditForm(id) {
    $.ajax({
        url: 'https://localhost:7215/User/EditOpenForm/' + id,
        type: 'Get',
        dataType: 'json',
        contentType: 'application/json',
        success: function (res) {
            $('#modal').modal('show');
            $('#id').val(res.id)
            $('#UserName').val(res.userName),
            $('#Email').val(res.email),
            $('#Password').val(res.password)
        },
        error: function () {

        }
    })
}


function EditUser() {
    var objData = {
        id: $('#id').val(),
        userName: $('#UserName').val(),
        email: $('#Email').val(),
        password: $('#Password').val()
    }
    $.ajax({
        url: 'https://localhost:7215/User/Edit',
        type: 'POST',
        data: objData,
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        success: function (response) {
            alert(response)
            ShowData();
        },
        error: function () {

        }
    })
}