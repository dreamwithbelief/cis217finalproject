$( document ).ready( function() {
    var display_cart = [];
    var display_order = "";
    var soda = "";
    var grand_total = 0;
    var cart = new Object();
    cart.pizza = [];
    cart.soda = [];


    function vibrate( length ) {
        navigator.notification.vibrate( length );
    }


    function addToOrder() {
        var pizza_size = $( 'input[name="pizza_size"]:checked' );
        var pizza_crust = $( 'select[name="crust"] option:selected' );
        var cheese = $( 'input[name="cheese"]:checked' );
        var sauce = $( 'input[name="sauce"]:checked' );
        var toppings = "";
        var cart_toppings = [];
        var toppings_total_price = 0;
        soda = "";
        var cart_soda = [];
        var soda_total_price = 0;
        var order_subtotal = 0;

        $( 'a.added' ).each( function() {
            toppings += "<li data-corners=\"false\" data-shadow=\"false\" data-iconshadow=\"true\" data-wrapperels=\"div\" data-icon=\"\" data-iconpos=\"right\" data-theme=\"c\" class=\"ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-c\">" +
                          "<div class=\"ui-btn-inner ui-li\">" +
                            "<div class=\"ui-btn-text\">" +
                              "<a href=\"#\" class=\"ui-link-inherit\">" +
                                "<p class=\"ui-li-aside ui-li-desc\">" +
                                  "<strong>$" + $( this ).data( 'price' ) + "</strong>" +
                                "</p>" +
                                "<h2 class=\"ui-li-heading\">" +
                                  $( this ).data( 'topping' ) +
                                "</h2>" +
                              "</a>" +
                            "</div>" +
                          "</div>" +
                        "</li>";
            toppings_total_price += parseInt( $( this ).data( 'price' ) );
            cart_toppings.push( $( this ).data( 'topping' ) );
        } );

        if ( toppings == "" ) {
            toppings = "<li data-corners=\"false\" data-shadow=\"false\" data-iconshadow=\"true\" data-wrapperels=\"div\" data-icon=\"\" data-iconpos=\"right\" data-theme=\"c\" class=\"ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-c\">" +
                         "<div class=\"ui-btn-inner ui-li\">" +
                           "<div class=\"ui-btn-text\">" +
                             "<a href=\"#\" class=\"ui-link-inherit\">" +
                               "<h2 class=\"ui-li-heading\">None</h2>" +
                             "</a>" +
                           "</div>" +
                         "</div>" +
                       "</li>";
        }

        $( 'input[name="soda"]').each( function() {
            if ( $(this).val() != 0 ){
                soda_total_price += parseInt( $( this ).data( 'price' ) ) * parseInt( $( this ).val() );
                soda_exists = false;
                for ( var index = 0; index < cart.soda.length; index++ ) {
                    if ( $( this ).data( 'soda' ) == cart.soda[index][0] ) {
                        cart.soda[index][1] += parseInt( $( this ).val() );
                        soda_exists = true;
                        break;
                    }
                }
                if ( cart.soda.length == 0 ) {
                    cart.soda.push( [ $( this ).data( 'soda' ), parseInt( $( this ).val() ) ] )
                } else if ( !soda_exists ) {
                    cart.soda[index] = [ $( this ).data( 'soda' ), parseInt( $( this ).val() ) ];
                }
            }
        } );

        if ( cart.soda.length == 0 ) {
            soda = "<li data-corners=\"false\" data-shadow=\"false\" data-iconshadow=\"true\" data-wrapperels=\"div\" data-icon=\"\" data-iconpos=\"right\" data-theme=\"c\" class=\"ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-c\">" +
                     "<div class=\"ui-btn-inner ui-li\">" +
                       "<div class=\"ui-btn-text\">" +
                         "<a href=\"#\" class=\"ui-link-inherit\">" +
                           "<h2 class=\"ui-li-heading\">None</h2>" +
                         "</a>" +
                       "</div>" +
                     "</div>" +
                   "</li>";
        } else {
            for ( var i = 0; i < cart.soda.length; i++ ){
                soda += "<li data-corners=\"false\" data-shadow=\"false\" data-iconshadow=\"true\" data-wrapperels=\"div\" data-icon=\"\" data-iconpos=\"right\" data-theme=\"c\" class=\"ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-c\">" +
                          "<div class=\"ui-btn-inner ui-li\">" +
                            "<div class=\"ui-btn-text\">" +
                              "<a href=\"#\" class=\"ui-link-inherit\">" +
                                "<p class=\"ui-li-aside ui-li-desc\">" +
                                  "<strong>$" + ( cart.soda[i][1] * 3 ) + "</strong>" +
                                "</p>" +
                                "<h2 class=\"ui-li-heading\">" +
                                  cart.soda[i][0] +
                                "</h2>" +
                                "<p class=\"ui-li-desc\">" +
                                  "<strong>Quantity: " + cart.soda[i][1] + "</strong>" +
                                "</p>" +
                                "<p class=\"ui-li-desc\">" +
                                  "$3 each" +
                                "</p>" +
                              "</a>" +
                            "</div>" +
                          "</div>" +
                        "</li>";
            }
        }

        var crust_price = pizza_crust.data( 'price' ) == 0 ? '' : "<p class=\"ui-li-aside ui-li-desc\"><strong>$" + pizza_crust.data( 'price' ) + "</strong></p>";
        var cheese_price = cheese.data( 'price' ) == 0 ? '' : "<p class=\"ui-li-aside ui-li-desc\"><strong>$" + cheese.data( 'price' ) + "</strong></p>";
        var sauce_price = sauce.data( 'price' ) == 0 ? '' : "<p class=\"ui-li-aside ui-li-desc\"><strong>$" + sauce.data( 'price' ) + "</strong></p>";

        var pizza_number = display_cart.length == 0 ? 1 : display_cart.length + 1;

        display_order = "<li id=\"has_order\" data-role=\"list-divider\" role=\"heading\" class=\"ui-li ui-li-divider ui-bar-a ui-li-has-count\">" +
                  "Pizza" +
                  "<span class=\"ui-li-count ui-btn-up-c ui-btn-corner-all\">" + pizza_number + "</span>" +
                "</li>" +
                "<li data-corners=\"false\" data-shadow=\"false\" data-iconshadow=\"true\" data-wrapperels=\"div\" data-icon=\"\" data-iconpos=\"right\" data-theme=\"c\" class=\"ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-c\">" +
                  "<div class=\"ui-btn-inner ui-li\">" +
                    "<div class=\"ui-btn-text\">" +
                      "<a href=\"#\" class=\"ui-link-inherit\">" +
                        "<p class=\"ui-li-aside ui-li-desc\">" +
                          "<strong>$" + pizza_size.data( 'price' ) + "</strong>" +
                        "</p>" +
                        "<h2 class=\"ui-li-heading\">Size</h2>" +
                        "<p class=\"ui-li-desc\">" +
                          "<strong>" + pizza_size.data( 'pizza-size' ) + "</strong>" +
                        "</p>" +
                      "</a>" +
                    "</div>" +
                  "</div>" +
                "</li>" +
                "<li data-corners=\"false\" data-shadow=\"false\" data-iconshadow=\"true\" data-wrapperels=\"div\" data-icon=\"\" data-iconpos=\"right\" data-theme=\"c\" class=\"ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-c\">" +
                  "<div class=\"ui-btn-inner ui-li\">" +
                    "<div class=\"ui-btn-text\">" +
                      "<a href=\"#\" class=\"ui-link-inherit\">" +
                        crust_price +
                        "<h2 class=\"ui-li-heading\">Crust</h2>" +
                        "<p class=\"ui-li-desc\">" +
                          "<strong>" + pizza_crust.data( 'crust' ) + "</strong>" +
                        "</p>" +
                      "</a>" +
                    "</div>" +
                  "</div>" +
                "</li>" +
                "<li data-corners=\"false\" data-shadow=\"false\" data-iconshadow=\"true\" data-wrapperels=\"div\" data-icon=\"\" data-iconpos=\"right\" data-theme=\"c\" class=\"ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-c\">" +
                  "<div class=\"ui-btn-inner ui-li\">" +
                    "<div class=\"ui-btn-text\">" +
                      "<a href=\"#\" class=\"ui-link-inherit\">" +
                        cheese_price +
                        "<h2 class=\"ui-li-heading\">Cheese</h2>" +
                        "<p class=\"ui-li-desc\">" +
                          "<strong>" + cheese.data( 'cheese' ) + "</strong>" +
                        "</p>" +
                      "</a>" +
                    "</div>" +
                  "</div>" +
                "</li>" +
                "<li data-corners=\"false\" data-shadow=\"false\" data-iconshadow=\"true\" data-wrapperels=\"div\" data-icon=\"\" data-iconpos=\"right\" data-theme=\"c\" class=\"ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-c\">" +
                  "<div class=\"ui-btn-inner ui-li\">" +
                    "<div class=\"ui-btn-text\">" +
                      "<a href=\"#\" class=\"ui-link-inherit\">" +
                        sauce_price +
                        "<h2 class=\"ui-li-heading\">Sauce</h2>" +
                        "<p class=\"ui-li-desc\">" +
                          "<strong>" + sauce.data( 'sauce' ) + "</strong>" +
                        "</p>" +
                      "</a>" +
                    "</div>" +
                  "</div>" +
                "</li>" +
                "<li data-role=\"list-divider\" role=\"heading\" class=\"ui-li ui-li-divider ui-bar-a ui-li-has-count\">" +
                  "Toppings" +
                "</li>" +
                toppings;

        order_subtotal += parseInt( pizza_size.data( 'price' ) );
        order_subtotal += parseInt( pizza_crust.data( 'price' ) );
        order_subtotal += parseInt( cheese.data( 'price' ) );
        order_subtotal += parseInt( sauce.data( 'price' ) );
        order_subtotal += toppings_total_price;
        order_subtotal += soda_total_price;
        grand_total += order_subtotal;
        display_cart.push( display_order );

        if ( cart.pizza.length == 0 ) {
            cart.pizza.push( [ pizza_size.data('pizza-size'), pizza_crust.data('crust'), cheese.data('cheese'), sauce.data('sauce'), cart_toppings ] );
        } else {
            cart.pizza[cart.pizza.length] = [ pizza_size.data('pizza-size'), pizza_crust.data('crust'), cheese.data('cheese'), sauce.data('sauce'), cart_toppings ];
        }
        console.log(cart)
    }

    function getDirections( lat, lng ) {
        navigator.geolocation.getCurrentPosition( function( position ) {
            var mylat = position.coords.latitude;
            var mylng = position.coords.longitude;
            var directions = '<iframe width="300" height="300" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" ' +
                             'src="http://maps.google.com/maps?' +
                             'daddr=' + lat + ',' + lng +
                             '&amp;saddr=' + mylat + ',' + mylng +
                             '&amp;ie=UTF8' +
                             '&amp;t=m' +
                             '&amp;ll=' + ( ( mylat + lat ) / 2 ) + ',' + ( ( mylng + lng ) / 2 ) +
                             '&amp;z=10' +
                             '&amp;output=embed">' +
                             '</iframe><br /><small>' +
                             '<a href="http://maps.google.com/maps?' +
                             'daddr=' + lat + ',' + lng +
                             'saddr=' + mylat + ',' + mylng + '&amp;' +
                             'ie=UTF8&amp;' +
                             't=m&amp;' +
                             'll=' + ( ( mylat + lat ) / 2 ) + ',' + ( ( mylng + lng ) / 2 ) + '&amp;' +
                             'z=10&amp;' +
                             'source=embed"' +
                             '>View Larger Map</a></small>';
            $( '#display_directions' ).html( directions );
        } );
    }

    $( 'a' ).on( 'click', function( event ) {
        if ( $( this ).hasClass( 'soda' ) ) {
            var qty = $( this ).closest( 'li' ).find( 'input' );

            if ( $( this ).data( 'icon' ) == 'plus' ) {
                if ( isNaN( parseInt( qty.val() ) ) ) {
                    qty.val( "0" );
                }
                qty.val( ( parseInt( qty.val() ) + 1 ) );
            } else {
                if ( isNaN( parseInt(qty.val() ) ) ) {
                    return false;
                } else if ( parseInt( qty.val() ) != 0 ) {
                    qty.val( ( parseInt( qty.val() ) - 1 ) );
                } else if ( parseInt( qty.val() ) == 0 ) {
                    qty.val( '' );
                }
            }
            event.preventDefault();
        }

        if ( $( this ).hasClass( 'topping' ) ) {
            $(this).toggleClass( 'added' );

            if ( $(this).hasClass('added') ) {
                $(this).prepend( '<p class="ui-li-aside ui-li-desc" style="margin:2em 0 0.3em;"><strong>Added</strong></p>' );
                $(this).closest('div.ui-btn-inner.ui-li').append( '<span class="ui-icon ui-icon-checked ui-icon-shadow">&nbsp;</span>' );
            } else {
                $(this).find('p:first').remove();
                $(this).closest('div.ui-btn-inner.ui-li').find('span.ui-icon-checked').remove();
            }
            event.preventDefault();
        }

        if ( $(this).data( 'order-option' ) == 'checkout' ) {
            addToOrder();
        }

        if ( $(this).data( 'order-option' ) == 'addorder' ) {
            addToOrder();
        }

        if ( $(this).data( 'order-option' ) == 'checkout' ) {
            var today = new Date().toLocaleDateString();
            var build_order = "<ul id=\"order_exists\" data-role=\"listview\" data-divider-theme=\"a\" data-inset=\"true\" data-icon=\"\" class=\"ui-listview ui-listview-inset ui-corner-all ui-shadow\">" +
                                "<li data-role=\"list-divider\" role=\"heading\" class=\"ui-li ui-li-divider ui-bar-a ui-first-child\">" +
                                  "Order Information" +
                                "</li>" +
                                "<li data-corners=\"false\" data-shadow=\"false\" data-iconshadow=\"true\" data-wrapperels=\"div\" data-icon=\"\" data-iconpos=\"right\" data-theme=\"c\" class=\"ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-c\">" +
                                  "<div class=\"ui-btn-inner ui-li\">" +
                                    "<div class=\"ui-btn-text\">" +
                                      "<a href=\"#\" class=\"ui-link-inherit\">" +
                                        "<p class=\"ui-li-aside ui-li-desc\">" +
                                          "<strong>" + 12345 + "</strong>" +
                                        "</p>" +
                                        "<h2 class=\"ui-li-heading\">" +
                                          "Order Number" +
                                        "</h2>" +
                                        "<p class=\"ui-li-desc\">" +
                                          today +
                                        "</p>" +
                                      "</a>" +
                                    "</div>" +
                                  "</div>" +
                                "</li>";

            for ( i = 0; i < display_cart.length; i++ ) {
                build_order += display_cart[i];
            }

            build_order += "<li data-role=\"list-divider\" role=\"heading\" class=\"ui-li ui-li-divider ui-bar-a ui-li-has-count\">" +
                             "Soda" +
                           "</li>" +
                           soda;

            build_order += "<li data-role=\"list-divider\" role=\"heading\" class=\"ui-li ui-li-divider ui-bar-a\">Grand Total</li>" +
                           "<li data-corners=\"false\" data-shadow=\"false\" data-iconshadow=\"true\" data-wrapperels=\"div\" data-icon=\"\" data-iconpos=\"right\" data-theme=\"c\" class=\"ui-btn ui-btn-up-c ui-btn-icon-right ui-li-has-arrow ui-li ui-last-child\">" +
                             "<div class=\"ui-btn-inner ui-li\">" +
                               "<div class=\"ui-btn-text\">" +
                                 "<a href=\"#\" class=\"ui-link-inherit\">" +
                                   "<p class=\"ui-li-aside order_total ui-li-desc\">" +
                                     "<strong>$" + grand_total + "</strong>" +
                                   "</p>" +
                                   "<h2 class=\"ui-li-heading\">" +
                                     "Your Total Is:" +
                                   "</h2>" +
                                 "</a>" +
                               "</div" +
                             "</div>" +
                           "</li>";
            if ( $('div#order ul#order_exists').length > 0 ) {
                $('#order_exists').remove();
            } else {
                $('div#order .my_order').toggleClass('show_order');
            }
            $('div#order').find('div[data-role="content"]').prepend(build_order);
        }

        if ( $( this ).data( 'order-option' ) == 'submit' ) {
            var URL = 'http://cis217-4.dreamwithbelief.com/process_order.php?'

            URL += "&size=10&crust=stuffed&cheese=extra&sauce=normal&toppings[]"
        }

        if ( $( this ).data( 'save-favorite' ) == 'order' ) {
            var today = new Date().toLocaleDateString();
            var save_order = "<div class=\"ui-panel-inner\"><ul id=\"favorite_order_exists\" data-role=\"listview\" data-divider-theme=\"a\" data-inset=\"true\" data-icon=\"\" class=\"ui-listview ui-listview-inset ui-corner-all ui-shadow\">" +
                               "<li data-role=\"list-divider\" role=\"heading\" class=\"ui-li ui-li-divider ui-bar-a ui-first-child\">" +
                                 "Your Favorite Order" +
                               "</li>" +
                               "<li data-corners=\"false\" data-shadow=\"false\" data-iconshadow=\"true\" data-wrapperels=\"div\" data-icon=\"\" data-iconpos=\"right\" data-theme=\"c\" class=\"ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-c\">" +
                                 "<div class=\"ui-btn-inner ui-li\">" +
                                   "<div class=\"ui-btn-text\">" +
                                     "<a href=\"#\" class=\"ui-link-inherit\">" +
                                       "<h2 class=\"ui-li-heading\">" +
                                         "Saved Date" +
                                       "</h2>" +
                                       "<p class=\"ui-li-desc\">" +
                                         today +
                                       "</p>" +
                                     "</a>" +
                                   "</div>" +
                                 "</div>" +
                               "</li>";

            for ( i = 0; i < display_cart.length; i++ ) {
                save_order += display_cart[i];
            }

            save_order += "<li data-role=\"list-divider\" role=\"heading\" class=\"ui-li ui-li-divider ui-bar-a ui-li-has-count\">" +
                "Soda" +
                "</li>" +
                soda;

            save_order += "<li data-role=\"list-divider\" role=\"heading\" class=\"ui-li ui-li-divider ui-bar-a\">Grand Total</li>" +
                          "<li data-corners=\"false\" data-shadow=\"false\" data-iconshadow=\"true\" data-wrapperels=\"div\" data-icon=\"\" data-iconpos=\"right\" data-theme=\"c\" class=\"ui-btn ui-btn-up-c ui-btn-icon-right ui-li-has-arrow ui-li ui-last-child\">" +
                            "<div class=\"ui-btn-inner ui-li\">" +
                              "<div class=\"ui-btn-text\">" +
                                "<a href=\"#\" class=\"ui-link-inherit\">" +
                                  "<p class=\"ui-li-aside order_total ui-li-desc\">" +
                                    "<strong>$" + grand_total + "</strong>" +
                                  "</p>" +
                                  "<h2 class=\"ui-li-heading\">" +
                                    "Your Total Is:" +
                                  "</h2>" +
                                "</a>" +
                              "</div" +
                            "</div>" +
                          "</li></div>";
            localStorage['favorite_order'] = save_order;
        }

        if ( $(this).data('view-favorite') == 'order' ) {
            if ( localStorage['favorite_order'] != undefined ) {
                $('div#favorite').children().remove();
                $('div#favorite').append(localStorage['favorite_order']);
            }
        }
    } );

    $( 'a.location' ).on( 'click', function() {
        getDirections( parseFloat( $( this ).attr( 'data-lat' ) ), parseFloat( $( this ).attr( 'data-lng' ) ) );
    } );
} );