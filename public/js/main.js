$(function () {
    $('.data').mask('00/00/0000')


    function validarData(value){
        var fromDate = new Date("1900-02-01");//inicio
        var toDate =  new Date(Date.now());//fim

        //formatar data dd/mm/aaaa para aaaa-mm-dd
        let dateSplit = value.split("/");
        value = dateSplit[2] + '-' + dateSplit[1] + '-' + dateSplit[0]

        try {
            var date = new Date(value);
            if (date >= fromDate && date <= toDate) {
                return true;
            }
        } catch (e) { return false; }
        return false;
    }

    $.validator.addMethod(
        "validarData",
        function (value,element) {
            return validarData(value);
        },
        "Data inválida"
    );

    $('#btn').click(function (e) {
        e.preventDefault();
        var valid = $("#form").validate({
            rules: {
                nome: { required: true },
                nascimento: { required: true, validarData:true },
                cargo: { required: true }
            }
        }).form();
        if (valid) {
            $('#form').submit();
        }
    });

})