$(function() {
    $(function() {
        $("#telephoneList").iziModal();
    });

    $(document).on('click', 'a.phoneResponse', function () {
    	var companyId = $(this).attr('id').split('-')[1];
    	var data = 'companyId=' + companyId;

        $.ajax({
            type: 'POST',
            url: '/mobile/ajax/phoneresponse/',
            data: data,
            handleAs: 'json',
            success: function () {
            }
        });
    });
});
