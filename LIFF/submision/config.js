var minuman = [
    {
        id: 1,
        name: 'Jus Jeruk',
        price: 20000,
        image: './img/minuman1.jpg',
        order: 0,
    },
    {
        id: 2,
        name: 'Coffe Susu',
        price: 15000,
        image: './img/minuman2.jpg',
        order: 0,
    }
];
function loadMinuman() {

    var product_minuman = "";

    for(var i = 0; i < minuman.length; i++){
        product_minuman += '<div class="col-xs-6 col-md-6 col-lg-6 mt-4">'
                                +'<div class="d-flex justify-content-center">'
                                    +'<img class="rounded img-fluid picture" src="'+minuman[i].image+'" alt="Minuman">'
                                    +'<div class="body-product">'
                                    +'<h5 class="title">'+minuman[i].name+'</h5>'
                                    +'<p class="price">Rp. '+minuman[i].price.toLocaleString()+'</p>'
                                    +'</div>'
                                    +'<div class="button-order">'
                                        +'<div class="d-flex justify-content-center">'
                                            +'<button type="button" class="btn btn-sm btn-success" href="javascript:void(0)" onclick="tambahMinuman(\'' + minuman[i].id + '\')">+</button>'
                                            +'<h3 class="angka" id="minuman_order_'+i+'">'+minuman[i].order+'</h3>'
                                            +'<button type="button" class="btn btn-sm btn-success" href="javascript:void(0)" onclick="kurangiMinuman(\'' + minuman[i].id + '\')">-</button>'
                                        +'</div>'
                                   +'</div>'
                                +'</div>'
                            +'</div>'
    }
    $('#minuman').html(product_minuman);
    $('#minuman').hide();
    $('#minuman').fadeIn(100);
}
var makanan = [
    {
        id: 1,
        name: 'Pancacke',
        price: 25000,
        image: './img/makanan1.jpg',
        order: 0,
    },
    {
        id: 2,
        name: 'Burger',
        price: 20000,
        image: './img/makanan2.jpg',
        order: 0,
    }
];
function loadMakanan() {
    var product_makanan = "";
    for(var y = 0; y < makanan.length; y++){
        product_makanan += '<div class="col-xs-6 col-md-6 col-lg-6 mt-4">'
                                +'<div class="d-flex justify-content-center">'
                                    +'<img class="rounded img-fluid picture" src="'+makanan[y].image+'" alt="Makanan">'
                                    +'<div class="body-product">'
                                    +'<h5 class="title">'+makanan[y].name+'</h5>'
                                    +'<p class="price">Rp. '+makanan[y].price.toLocaleString()+'</p>'
                                    +'</div>'
                                    +'<div class="button-order">'
                                        +'<div class="d-flex justify-content-center">'
                                            +'<button type="button" class="btn btn-sm btn-success" href="javascript:void(0)" onclick="tambahMakanan(\'' + makanan[y].id + '\')">+</button>'
                                            +'<h3 class="angka" id="makanan_order_'+y+'">'+makanan[y].order+'</h3>'
                                            +'<button type="button" class="btn btn-sm btn-success" href="javascript:void(0)" onclick="kurangiMakanan(\'' + makanan[y].id + '\')">-</button>'
                                       +'</div>'
                                    +'</div>'
                                +'</div>'
                            +'</div>'
    }
    $('#makanan').html(product_makanan);
    $('#makanan').hide();
    $('#makanan').fadeIn(100);
}
function loadData() {
    //remove all localstorage
    localStorage.clear();
    loadMakanan();
    loadMinuman();
    detailPesanan();
}
function tambahMinuman(dt) {
    //change order value 
    let id = dt - 1;
    let order = 0;
    if(dt == 1){
       order = minuman[0].order = minuman[0].order + 1;
    }else if(dt == 2){
        order = minuman[1].order = minuman[1].order + 1;
    }
    $('#minuman_order_'+id).html(order);
    detailPesanan();
}
function kurangiMinuman(dt) {
    //change order value 
    let id = dt - 1;
    let order = 0;
    if(dt == 1){
        if(minuman[0].order > 0){
            order = minuman[0].order = minuman[0].order - 1;
        }
    }else if(dt == 2){
        if(minuman[1].order > 0){
            order = minuman[1].order = minuman[1].order - 1;
        }
    }
    // console.log(minuman)
    $('#minuman_order_'+id).html(order);
    detailPesanan();
}
function tambahMakanan(dt){
    //change order value 
    let id = dt - 1;
    let order = 0;
    if(dt == 1){
       order = makanan[0].order = makanan[0].order + 1;
    }else if(dt == 2){
       order = makanan[1].order = makanan[1].order + 1;
    }
    $('#makanan_order_'+id).html(order);
    detailPesanan();
}
function kurangiMakanan(dt){
     //change order value 
     let id = dt - 1;
     let order = 0;
     if(dt == 1){
         if(makanan[0].order > 0){
             order = makanan[0].order = makanan[0].order - 1;
         }
     }else if(dt == 2){
         if(makanan[1].order > 0){
             order = makanan[1].order = makanan[1].order - 1;
         }
     }
     // console.log(minuman)
     $('#makanan_order_'+id).html(order);
     detailPesanan();
}
function detailPesanan() {
    getOrder();
    var detail = "";
    var data = JSON.parse(localStorage.getItem("order"));
    if(Object.entries(data).length === 0){
        detail += '<tr>'
                    +'<th scope="row" class="text-center text-danger" colspan="2">Order Data Kosong</th>'
                +'</tr>'
    }else{
        var total_harga = 0;
        var total_order = 0;
        //loop data
        for(var dt in data){
            detail += '<tr>'
                        +'<th scope="row" class="text-center">'+data[dt].name+'</th>'
                        +'<th scope="row" class="text-center">'+data[dt].order+'</th>'
                    +'</tr>';
            //total harga
            total_harga += parseInt(data[dt].price) * parseInt(data[dt].order);
            //total order 
            total_order += parseInt(data[dt].order)
        }
        detail += '<tr>'
                    +'<th scope="row" class="text-center text-info">Total</th>'
                    +'<th scope="row" class="text-center text-info">'+total_order+'</th>'
                +'</tr>'
                +'<tr>'
                    +'<th scope="row" class="text-center text-info">Total Harga</th>'
                    +'<th scope="row" class="text-center text-info">Rp '+total_harga.toLocaleString()+'</th>'
                +'</tr>';
    }
    $('#ringkasan').html(detail);
    $('#ringkasan').hide();
    $('#ringkasan').fadeIn(100);
}
function getOrder() {
    var order = {};
    if(minuman[0].order > 0){
        order.minuman_0 = minuman[0];
    }else{
        delete order.minuman_0;
    }
    if(minuman[1].order > 0){
        order.minuman_1 = minuman[1];
    }else{
        delete order.minuman_1;
    }
    if(makanan[0].order > 0){
        order.makanan_0 = makanan[0];
    }else{
        delete order.makanan_0;
    }
    if(makanan[1].order > 0){
        order.makanan_1 = makanan[1];
    }else{
        delete order.makanan_1;
    }
    localStorage.setItem("order", JSON.stringify(order));
}

function registerButtonHandlers() {
    var name = 'Customer'
    if(liff.isLoggedIn()) {
        liff.getProfile()
            .then(profile => {
                name = profile.displayName
                $('#customer').html(name);
            })
            .catch((err) => {
                
            });
    }
    document.getElementById('openWindowButton').addEventListener('click', function() {
        liff.openWindow({
            url: 'https://project-dicoding.herokuapp.com/', // Isi dengan Endpoint URL aplikasi web Anda
            external: true
        });
    });
 
    document.getElementById('liffLoginButton').addEventListener('click', function() {
        if (!liff.isLoggedIn()) {
            liff.login();
        }
    });
 
    document.getElementById('liffLogoutButton').addEventListener('click', function() {
        if (liff.isLoggedIn()) {
            liff.logout();
            window.location.reload();
        }else{
            window.location.reload();
        }
    });

    document.getElementById('sendMessageButton').addEventListener('click', function() {
        if (!liff.isInClient()) {
            alert('This button is unavailable as LIFF is currently being opened in an external browser.');
        } else {
            var data = JSON.parse(localStorage.getItem("order"));
            if(Object.entries(data).length === 0){
                alert("Order Anda Masih Kosong!")
            }else{
                var pesanan = "";
                var order = 0;
                var total = 0;
                for(var d in data){
                    pesanan += "\n* "+ data[d].name +" jumlah "+data[d].order+" harga per item: Rp."+data[d].price.toLocaleString()
                    //total harga
                    total += parseInt(data[d].price) * parseInt(data[d].order);
                    //total order 
                    order += parseInt(data[d].order)
                }
                pesanan += "\nTotal Order: "+order;
                pesanan += "\nTotal Harga: Rp."+total.toLocaleString();

                liff.sendMessages([{
                    'type': 'text',
                    'text': "Hai "+name+", \n"
                    +"\nTerimakasih telah memesan makanan / minuman, berikut adalah review pesanannya: \n"+ pesanan
                    +"\n\nPesanan kakak akan segera diproses dan akan di beritahu jika sudah bisa di ambil. \n\nMohon di tunggu ya!"
                }]).then(function() {
                    window.alert('Terimakasih Atas Pesanan Anda');
                    liff.closeWindow();
                }).catch(function(error) {
                    window.alert('Error sending message: ' + error);
                });
            }
        }
    });
}