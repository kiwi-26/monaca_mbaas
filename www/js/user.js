var UserPageController = {
    init : function() {
        $(function() {
            UserPageController.prepare();
        });
    },

    prepare : function() {
        $('#logout').on('tappable-tap', function() {
            UserPageController.logout();
        });

        this.load();
    },

    load : function() {

        var currentUser = ncmb.User.getCurrentUser();
        if (currentUser) {
            console.log(currentUser);
            $('#user-name').text(currentUser.get('userName'));
            $('#create-date').text(new Date(Date.parse(currentUser.get('createDate'))).toDateString());
            $('#memo').text(currentUser.get('memo'));
        } else {
            alert("ログインしていません");
        }
    },

    logout : function() {
        ncmb.User.logout()
            .then(function() {
                alert("ログアウトしました");
                location.href = 'login.html';
            });
    }
};
