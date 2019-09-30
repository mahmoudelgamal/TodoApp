
$(document).ready(function() {
    $.getJSON('/api/todos')
    .then(AddTodos);

    $('.input').keypress(function(event) {
        if(event.which == 13) {
            createTodo()
        }
    });

    $('.list').on('click', 'span', function(e) {
        e.stopPropagation();
        removeTodo($(this).parent());
    });

    $('.list').on('click', 'li', function() {
        updateTodo($(this));
    });

});

function AddTodos(data) {
    data.forEach(task => {
    addTodo(task)
    });
}

function createTodo() {
    let userInput = $('.input').val()
    $.post('/api/todos', {name: userInput})
    .then(function(newTodo) {
        addTodo(newTodo)
    })
    .catch((err) => console.log(err)) 
}

function addTodo(task) {
        let newTodo = $('<li class="task">' + task.name + '<span>X</span></li>');
        newTodo.data('id', task._id);
        newTodo.data('completed', task.completed);
        if(task.completed) {
            newTodo.addClass('done')
        }
        $('.input').val('')
        $('.list').append(newTodo)
};

function removeTodo(todo) {
        let clickedId = todo.data('id');
        const url = 'api/todos/' + clickedId;
        todo.remove();
        $.ajax({
            method: 'DELETE',
            url: url
        })
        .then(function(data) {
            console.log(data)
        })
        .catch((err) => console.log(err))
    }

function updateTodo(todo) {
        const url = 'api/todos/' + todo.data('id');
        let isdone = !todo.data('completed');
        let updateData = {completed: isdone}
        $.ajax({
            method: 'PUT',
            url: url,
            data: updateData 
        })
        .then(function(data) {
            todo.toggleClass('done');
            todo.data('completed', isdone)
            console.log(data)
        })
        .catch((err) => console.log(err))
    }