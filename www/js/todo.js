
var TODO;

var TODOListController = {

    init : function() {
        $(function() {
            TODO = ncmb.DataStore('TODO');
            TODOListController.prepare();
        });
    },

    prepare : function() {
        $('#add-todo').on('tappable-tap', function() {
            TODOListController.add();
        });

        $('#back').on('tappable-tap', function() {
            location.href = 'index.html';
        });

        TODOListController.refresh();
    },

    add : function() {
        var todo = prompt('TODOを追加');

        if (typeof todo === 'string' && todo.length > 0) {
            // TODOを保存
            new TODO({todo : todo})
                .save()
                .then(function(saved) {
                    alert("TODO追加できました");
                    TODOListController.refresh();
                })
                .catch(function(err) {
                    alert("エラーがおきました");
                });
        }
    },

    refresh : function() {

        showSpinner();

        TODO.fetchAll()
            .then(function(results) {
                TODOListController.render(results);
            })
            .catch(function(error) {
                console.log(JSON.stringify(arguments));
            });
    },

    render : function(todoArray) {
        var tableCellTemplate = $('#table-cell-template')[0];
        var fragment = document.createDocumentFragment();

        todoArray.map(function(todo) {
            var tableCell = tableCellTemplate.cloneNode(true);
            console.log(todo);
            $('p', tableCell).text(todo.get('todo'));

            return tableCell;
        }).forEach(function(tableCell) {
            fragment.appendChild(tableCell);
        });

        $('.table-body').empty().append(fragment);

        hideSpinner();
    }
};
