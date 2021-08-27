jQuery(document).ready(function (object) {
    // 1.- ARREGLO PARA PÁGINA SELECCIONADA
    //Muestra la página de categorías activa
    var pag = jQuery("#pag-active").val();

    //esconde todas las paginas
    jQuery(".uc-navbar_nav").hide();

    //muestra la correcta
    jQuery("#pag_category_" + pag).css("display", "flex");

    // 2.- ARREGLO PARA ANCLA MENÚ CON ICONOS
    var menu_iconos = jQuery("#ing-has-menu-iconos").val();

    if (menu_iconos == 1 && jQuery(window).width() < 990)
        jQuery(window).scrollTop(jQuery(".ing-app-content").offset().top);

    // 3.- ARREGLO BORDE DERECHO PREVIO A PESTAÑA ACTIVA
    jQuery(".ing-btn-menu-active-url")
        .prev()
        .addClass("ing-btn-menu-active-url-prev");

    // 4.- ARREGLO TÍTULO
    jQuery("#ing-app-title").html(jQuery("#ing-titulo-real").val());
});

jQuery(document).mouseup(function (e) {
    //esconde cuando se hace click fuera del menú
    if (jQuery(e.target).closest(".ing-menu").length === 0) {
        jQuery(".ing-menu").hide();
        jQuery(".ing-menu").removeClass("ing-menu-active");
        jQuery(".ing-menu-row-options").hide();
        jQuery(".uc-navbar").removeClass("uc-navbar-active");
        jQuery(".ing-btn-menu").removeClass("ing-btn-menu-active");
        jQuery(".ing-btn-menu").removeClass("ing-btn-menu-active-before");
        jQuery("li").removeClass("ing-category-active");
        jQuery(".tmp-inactive").addClass("ing-btn-menu-active-url");
        jQuery(".tmp-inactive-prev").addClass("ing-btn-menu-active-url-prev");
        jQuery(".tmp-inactive").removeClass("tmp-inactive");
        jQuery(".tmp-inactive-prev").removeClass("tmp-inactive-prev");
    }

    jQuery(".ing-mobile-sub-list").click(function () {
        window.location = jQuery(this).find("a").attr("href");
        return false;
    });
});

function showCategoriesMobile() {
    if (
        jQuery(".uc-navbar_mobile-button").hasClass("js-accordion-active-element")
    ) {
        jQuery(".uc-navbar_mobile-button").removeClass(
            "js-accordion-active-element"
        );
        jQuery(".uc-navbar_mobile-content").hide();
        jQuery(".uc-navbar_mobile-content").attr("data-open", "false");
        jQuery(".ing-mobile-list").removeClass("ing-mobile-list-active");
        return;
    }

    jQuery(".uc-navbar_mobile-button").addClass("js-accordion-active-element");
    jQuery(".uc-navbar_mobile-content").attr("data-open", "true");
    jQuery(".uc-navbar_mobile-content").slideDown();
}

function showMenuContextualMobile() {
    if (jQuery(".ing-dropdown-icon").hasClass("ing-dropdown-icon-reverse")) {
        jQuery(".ing-dropdown-icon").removeClass("ing-dropdown-icon-reverse");
        jQuery(".ing-dropdown-icon").animate(
            { deg: 0 },
            {
                duration: 200,
                step: function (now) {
                    jQuery(".ing-dropdown-icon").css({
                        transform: "rotate(" + now + "deg)",
                    });
                },
            }
        );
        jQuery(".ing-menu-lateral").hide();
        return;
    }

    jQuery(".ing-dropdown-icon").addClass("ing-dropdown-icon-reverse");
    jQuery(".ing-dropdown-icon").animate(
        { deg: 180 },
        {
            duration: 200,
            step: function (now) {
                jQuery(".ing-dropdown-icon").css({
                    transform: "rotate(" + now + "deg)",
                });
            },
        }
    );
    jQuery(".ing-menu-lateral").slideDown();
}

function showOptionsMobile(id) {
    if (jQuery("#Mobile_category_" + id).hasClass("ing-mobile-list-active")) {
        jQuery(".ing-mobile-list").removeClass("ing-mobile-list-active");
        jQuery("#Mobile_category_" + id)
            .find(".uc-icon")
            .animate(
                { deg: 0 },
                {
                    duration: 200,
                    step: function (now) {
                        jQuery("#Mobile_category_" + id)
                            .find(".uc-icon")
                            .css({ transform: "rotate(" + now + "deg)" });
                    },
                }
            );
        jQuery(".ing-mobile-category-submenu").hide();
        return;
    }

    jQuery(".ing-mobile-category-submenu").hide();
    jQuery(".ing-mobile-list").removeClass("ing-mobile-list-active");
    jQuery("#Mobile_category_" + id).addClass("ing-mobile-list-active");
    jQuery("#Mobile_category_" + id)
        .find(".uc-icon")
        .animate(
            { deg: 180 },
            {
                duration: 200,
                step: function (now) {
                    jQuery("#Mobile_category_" + id)
                        .find(".uc-icon")
                        .css({ transform: "rotate(" + now + "deg)" });
                },
            }
        );
    jQuery("#Mobile_category_submenu_" + id).slideDown();
}

function showCategories(id) {
    //se define cual menú se mostrará
    var menu = jQuery("#Category_" + id);
    var nav = jQuery(".uc-navbar");
    var btn = jQuery("#TopMenu_textcell_" + id);

    //esconde todo primero
    jQuery(".ing-menu").hide();
    jQuery(".ing-btn-menu-active-url").addClass("tmp-inactive");
    jQuery(".ing-btn-menu-active-url-prev").addClass("tmp-inactive-prev");
    jQuery(".ing-btn-menu-active-url").removeClass("ing-btn-menu-active-url");
    jQuery(".ing-btn-menu-active-url-prev").removeClass(
        "ing-btn-menu-active-url-prev"
    );
    jQuery(".ing-menu").removeClass("ing-menu-active");
    jQuery(".ing-btn-menu").removeClass("ing-btn-menu-active");
    jQuery(".ing-btn-menu").removeClass("ing-btn-menu-active-before");
    jQuery(".ing-menu-row-options").hide();

    //si se escoge la misma categoría activa se cierra el menú
    if (jQuery("#active-category").val() === id) {
        jQuery("#active-category").val("");
        jQuery(".tmp-inactive").addClass("ing-btn-menu-active-url");
        jQuery(".tmp-inactive-prev").addClass("ing-btn-menu-active-url-prev");
        jQuery(".tmp-inactive").removeClass("tmp-inactive");
        jQuery(".tmp-inactive-prev").removeClass("tmp-inactive-prev");
        return;
    }

    //muestra la categoría que debería mostrar (y marca la anterior para eliminar el borde)
    jQuery(menu).slideDown("fast");
    jQuery(menu).addClass("ing-menu-active");
    jQuery(nav).addClass("uc-navbar-active");
    jQuery(btn).addClass("ing-btn-menu-active");
    jQuery(btn).prev().addClass("ing-btn-menu-active-before");
    jQuery("#active-category").val(id);

    //muestra la primera de las opciones
    var arrDivOpciones = jQuery(menu).find(".ing-menu-row-options");
    var arrCategorias2 = jQuery(menu).find(".ing-menu-categories").find("li");
    jQuery(arrDivOpciones[0]).css("display", "flex");
    jQuery(arrCategorias2[0]).addClass("ing-category-active");
}

function showOptions(id, category) {
    //esconde todas las opciones primero
    jQuery(".ing-menu-row-options").hide();
    jQuery("li").removeClass("ing-category-active");

    //muestra la que tiene que mostrar
    jQuery("#Options_" + id).css("display", "flex");
    jQuery(category).addClass("ing-category-active");
}

function showDestacados(id, category) {
    //esconde todas las opciones primero
    jQuery(".ing-menu-row-options").hide();
    jQuery("li").removeClass("ing-category-active");

    //muestra la que tiene que mostrar
    jQuery("#" + id).css("display", "flex");
    jQuery(category).addClass("ing-category-active");
}

function showOtros(id, category) {
    //esconde todas las opciones primero
    jQuery(".ing-menu-row-options").hide();
    jQuery("li").removeClass("ing-category-active");

    //muestra la que tiene que mostrar
    jQuery("#" + id).css("display", "flex");
    jQuery(category).addClass("ing-category-active");
}

function changePagCategory(direction, pag) {
    //elige que pag mostrar
    switch (direction) {
        case "next":
            pag++;
            break;
        case "prev":
            pag--;
            break;
        default:
            return;
            break;
    }

    //esconde todas las paginas
    jQuery(".uc-navbar_nav").hide();

    //muestra la correcta
    jQuery("#pag_category_" + pag).css("display", "flex");
}
Query(document).ready(function (object) {
    // 1.- ARREGLO PARA PÁGINA SELECCIONADA
    //Muestra la página de categorías activa
    var pag = jQuery("#pag-active").val();

    //esconde todas las paginas
    jQuery(".uc-navbar_nav").hide();

    //muestra la correcta
    jQuery("#pag_category_" + pag).css("display", "flex");

    // 2.- ARREGLO PARA ANCLA MENÚ CON ICONOS
    var menu_iconos = jQuery("#ing-has-menu-iconos").val();

    if (menu_iconos == 1 && jQuery(window).width() < 990)
        jQuery(window).scrollTop(jQuery(".ing-app-content").offset().top);

    // 3.- ARREGLO BORDE DERECHO PREVIO A PESTAÑA ACTIVA
    jQuery(".ing-btn-menu-active-url")
        .prev()
        .addClass("ing-btn-menu-active-url-prev");

    // 4.- ARREGLO TÍTULO
    jQuery("#ing-app-title").html(jQuery("#ing-titulo-real").val());
});

jQuery(document).mouseup(function (e) {
    //esconde cuando se hace click fuera del menú
    if (jQuery(e.target).closest(".ing-menu").length === 0) {
        jQuery(".ing-menu").hide();
        jQuery(".ing-menu").removeClass("ing-menu-active");
        jQuery(".ing-menu-row-options").hide();
        jQuery(".uc-navbar").removeClass("uc-navbar-active");
        jQuery(".ing-btn-menu").removeClass("ing-btn-menu-active");
        jQuery(".ing-btn-menu").removeClass("ing-btn-menu-active-before");
        jQuery("li").removeClass("ing-category-active");
        jQuery(".tmp-inactive").addClass("ing-btn-menu-active-url");
        jQuery(".tmp-inactive-prev").addClass("ing-btn-menu-active-url-prev");
        jQuery(".tmp-inactive").removeClass("tmp-inactive");
        jQuery(".tmp-inactive-prev").removeClass("tmp-inactive-prev");
    }

    jQuery(".ing-mobile-sub-list").click(function () {
        window.location = jQuery(this).find("a").attr("href");
        return false;
    });
});

function showCategoriesMobile() {
    if (
        jQuery(".uc-navbar_mobile-button").hasClass("js-accordion-active-element")
    ) {
        jQuery(".uc-navbar_mobile-button").removeClass(
            "js-accordion-active-element"
        );
        jQuery(".uc-navbar_mobile-content").hide();
        jQuery(".uc-navbar_mobile-content").attr("data-open", "false");
        jQuery(".ing-mobile-list").removeClass("ing-mobile-list-active");
        return;
    }

    jQuery(".uc-navbar_mobile-button").addClass("js-accordion-active-element");
    jQuery(".uc-navbar_mobile-content").attr("data-open", "true");
    jQuery(".uc-navbar_mobile-content").slideDown();
}

function showMenuContextualMobile() {
    if (jQuery(".ing-dropdown-icon").hasClass("ing-dropdown-icon-reverse")) {
        jQuery(".ing-dropdown-icon").removeClass("ing-dropdown-icon-reverse");
        jQuery(".ing-dropdown-icon").animate(
            { deg: 0 },
            {
                duration: 200,
                step: function (now) {
                    jQuery(".ing-dropdown-icon").css({
                        transform: "rotate(" + now + "deg)",
                    });
                },
            }
        );
        jQuery(".ing-menu-lateral").hide();
        return;
    }

    jQuery(".ing-dropdown-icon").addClass("ing-dropdown-icon-reverse");
    jQuery(".ing-dropdown-icon").animate(
        { deg: 180 },
        {
            duration: 200,
            step: function (now) {
                jQuery(".ing-dropdown-icon").css({
                    transform: "rotate(" + now + "deg)",
                });
            },
        }
    );
    jQuery(".ing-menu-lateral").slideDown();
}

function showOptionsMobile(id) {
    if (jQuery("#Mobile_category_" + id).hasClass("ing-mobile-list-active")) {
        jQuery(".ing-mobile-list").removeClass("ing-mobile-list-active");
        jQuery("#Mobile_category_" + id)
            .find(".uc-icon")
            .animate(
                { deg: 0 },
                {
                    duration: 200,
                    step: function (now) {
                        jQuery("#Mobile_category_" + id)
                            .find(".uc-icon")
                            .css({ transform: "rotate(" + now + "deg)" });
                    },
                }
            );
        jQuery(".ing-mobile-category-submenu").hide();
        return;
    }

    jQuery(".ing-mobile-category-submenu").hide();
    jQuery(".ing-mobile-list").removeClass("ing-mobile-list-active");
    jQuery("#Mobile_category_" + id).addClass("ing-mobile-list-active");
    jQuery("#Mobile_category_" + id)
        .find(".uc-icon")
        .animate(
            { deg: 180 },
            {
                duration: 200,
                step: function (now) {
                    jQuery("#Mobile_category_" + id)
                        .find(".uc-icon")
                        .css({ transform: "rotate(" + now + "deg)" });
                },
            }
        );
    jQuery("#Mobile_category_submenu_" + id).slideDown();
}

function showCategories(id) {
    //se define cual menú se mostrará
    var menu = jQuery("#Category_" + id);
    var nav = jQuery(".uc-navbar");
    var btn = jQuery("#TopMenu_textcell_" + id);

    //esconde todo primero
    jQuery(".ing-menu").hide();
    jQuery(".ing-btn-menu-active-url").addClass("tmp-inactive");
    jQuery(".ing-btn-menu-active-url-prev").addClass("tmp-inactive-prev");
    jQuery(".ing-btn-menu-active-url").removeClass("ing-btn-menu-active-url");
    jQuery(".ing-btn-menu-active-url-prev").removeClass(
        "ing-btn-menu-active-url-prev"
    );
    jQuery(".ing-menu").removeClass("ing-menu-active");
    jQuery(".ing-btn-menu").removeClass("ing-btn-menu-active");
    jQuery(".ing-btn-menu").removeClass("ing-btn-menu-active-before");
    jQuery(".ing-menu-row-options").hide();

    //si se escoge la misma categoría activa se cierra el menú
    if (jQuery("#active-category").val() === id) {
        jQuery("#active-category").val("");
        jQuery(".tmp-inactive").addClass("ing-btn-menu-active-url");
        jQuery(".tmp-inactive-prev").addClass("ing-btn-menu-active-url-prev");
        jQuery(".tmp-inactive").removeClass("tmp-inactive");
        jQuery(".tmp-inactive-prev").removeClass("tmp-inactive-prev");
        return;
    }

    //muestra la categoría que debería mostrar (y marca la anterior para eliminar el borde)
    jQuery(menu).slideDown("fast");
    jQuery(menu).addClass("ing-menu-active");
    jQuery(nav).addClass("uc-navbar-active");
    jQuery(btn).addClass("ing-btn-menu-active");
    jQuery(btn).prev().addClass("ing-btn-menu-active-before");
    jQuery("#active-category").val(id);

    //muestra la primera de las opciones
    var arrDivOpciones = jQuery(menu).find(".ing-menu-row-options");
    var arrCategorias2 = jQuery(menu).find(".ing-menu-categories").find("li");
    jQuery(arrDivOpciones[0]).css("display", "flex");
    jQuery(arrCategorias2[0]).addClass("ing-category-active");
}

function showOptions(id, category) {
    //esconde todas las opciones primero
    jQuery(".ing-menu-row-options").hide();
    jQuery("li").removeClass("ing-category-active");

    //muestra la que tiene que mostrar
    jQuery("#Options_" + id).css("display", "flex");
    jQuery(category).addClass("ing-category-active");
}

function showDestacados(id, category) {
    //esconde todas las opciones primero
    jQuery(".ing-menu-row-options").hide();
    jQuery("li").removeClass("ing-category-active");

    //muestra la que tiene que mostrar
    jQuery("#" + id).css("display", "flex");
    jQuery(category).addClass("ing-category-active");
}

function showOtros(id, category) {
    //esconde todas las opciones primero
    jQuery(".ing-menu-row-options").hide();
    jQuery("li").removeClass("ing-category-active");

    //muestra la que tiene que mostrar
    jQuery("#" + id).css("display", "flex");
    jQuery(category).addClass("ing-category-active");
}

function changePagCategory(direction, pag) {
    //elige que pag mostrar
    switch (direction) {
        case "next":
            pag++;
            break;
        case "prev":
            pag--;
            break;
        default:
            return;
            break;
    }

    //esconde todas las paginas
    jQuery(".uc-navbar_nav").hide();

    //muestra la correcta
    jQuery("#pag_category_" + pag).css("display", "flex");
}
