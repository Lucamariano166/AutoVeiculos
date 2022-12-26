jQuery(document).ready(function () {


    $('#NovoVeiculo').click(function () {

        $('#modalVeiculo').show();



    });
    $('#CloseVeiculo').click(function () {

        $('#modalVeiculo').hide();

    });

    $('#NovaManutencao').click(function () {

        $('#modalManutencao').show();
        $('#buscarPlaca').show();
        $('#CadastrarManutencao').hide();

    });
    $('#btnPesquisarVeiculo').click(function () {
        $('#buscarPlaca').hide();
        $('#CadastrarManutencao').show();
        let placa = $('#placaDigitada').val();
        preencherDadosVeiculo(placa);
    })

    $('#CloseManutencao').click(function () {

        $('#modalManutencao').hide();

    });

    carregarVeiculos();

    function carregarVeiculos() {
        $.ajax({
            url: '/api/veiculos',
            type: 'GET',
            success: function (data) {
                let html = '';
                for (let i = 0; i < data.length; i++) {
                    html += '<tr>';
                    html += '<td> ' + data[i].proprietario + '</td>';
                    html += '<td> ' + data[i].marca + " " + data[i].modelo + " " + data[i].versao + '</td>';
                    html += '<td> ' + data[i].placa + '</td>';
                    html += '<td> ' + data[i].telefone + '</td>';


                    
                    html += '<td><button type="button" id="delVeiculos" data-id="' + data[i].id + '" class="btn btn-white"><i class="fa fa-trash" aria-hidden="true"></i></button></td>';


                    html += '</tr>';
                }

                $('#tabela_veiculos').html(html);

            }

        });

    }

    carregarManutencoes();

    function carregarManutencoes() {
        id_usuario = $('#id_user').val();
        $.ajax({
            url: '/api/manutencoes/'+ id_usuario,
            type: 'GET',
            success: function (data) {
                let html = '';
                for (let i = 0; i < data.length; i++) {
                    html += '<tr>';
                    html += '<td> ' + data[i].proprietario + '</td>';
                    html += '<td> ' + data[i].marca + " " + data[i].modelo + " " + data[i].versao + '</td>';
                    html += '<td> ' + data[i].placa + '</td>';
                    html += '<td> ' + data[i].telefone + '</td>';
                    html += '<td> ' + data[i].tipo_de_manutencao + '</td>';
                    html += '<td> ' + data[i].descricao + '</td>';
                    html += '<td> ' + data[i].data_para_manutencao + '</td>';


                    html += '</tr>';
                }

                $('#tabela_manutencoes').html(html);

            }

        });

    }


    $("#enviarManutencao").click(function () {
        var id_usuario = $("#id_usuario").val();
        var id_veiculo = $("#id_veiculo").val();
        var tipo_de_manutencao = $("#tipo_de_manutencao").val()  
        var descricao = $("#descricao").val();
        var data_para_manutencao = $("#data_para_manutencao").val();
            $.ajax({
            url: '/api/manutencoes',
            type: 'POST',
            data: {
                id_usuario: id_usuario,
                id_veiculo: id_veiculo,
                tipo_de_manutencao: tipo_de_manutencao,
                descricao: descricao,
                data_para_manutencao: data_para_manutencao
            },
            enctype: "application/json",
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            success: function (data) {

                if (data.msg == 'Cadastrado com sucesso') {
                    carregarManutencoes();
                    $('#modalManutencoes').hide();
                }

            }

        });
    });

    

    function preencherDadosVeiculo(p) {
        let placa = p

        $.ajax({
            url: '/api/search/' + placa,
            type: 'GET',
            success: function (data) {
                for (let i = 0; i < data.length; i++) {
                    $('#proprietario').val(data[i].proprietario);
                    $('#id_veiculo').val(data[i].id);
                    $('#marca').val(data[i].marca);
                    $('#modelo').val(data[i].modelo);
                    $('#versao').val(data[i].versao);
                    $('#placa').val(data[i].placa);

                }


            }

        });

    }



    $("#enviar").click(function () {
        var proprietario = $("#proprietario").val();
        var marca = $("#marca").val();
        var modelo = $("#modelo").val();
        var versao = $("#versao").val();

        var placaSemTratamento = $("#placa").val();
        var placa = placaSemTratamento.replace('-', '');
        var telefoneSemTratamento = $("#telefone").val();
        var telefone = telefoneSemTratamento.replace(/\D/g, '');



        $.ajax({
            url: '/api/veiculos',
            type: 'POST',
            data: {
                proprietario: proprietario,
                marca: marca,
                modelo: modelo,
                versao: versao,
                placa: placa,
                telefone: telefone
            },
            enctype: "application/json",
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            success: function (data) {

                if (data.msg == 'Cadastrado com sucesso') {
                    carregarVeiculos();
                    $('#modalVeiculo').hide();
                }

            }

        });
    });

    $(document).on('click', '#delVeiculos', function () {
        let id = $(this).attr('data-id');

        $.ajax({
            url: '/api/veiculos/' + id,
            type: 'DELETE',
            dataType: 'json',

            success: function (data) {
                carregarVeiculos()


            }

        });


    });


    $("#SalvarVeiculo").click(function () {
        var proprietario = $("#proprietarioV").val();
        var marca = $("#marcaV").val();
        var modelo = $("#modeloV").val();
        var versao = $("#versaoV").val();

        var placaSemTratamento = $("#placaV").val();
        var placa = placaSemTratamento.replace('-', '');
        var telefoneSemTratamento = $("#telefoneV").val();
        var telefone = telefoneSemTratamento.replace(/\D/g, '');



        $.ajax({
            url: '/api/veiculos',
            type: 'POST',
            data: {
                proprietario: proprietario,
                marca: marca,
                modelo: modelo,
                versao: versao,
                placa: placa,
                telefone: telefone
            },
            enctype: "application/json",
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            success: function (data) {
                carregarVeiculos();


            }

        });
    });
    
   
   });
