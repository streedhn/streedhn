/* =========================================================
   🔴🔴🔴 EDITA AQUÍ LOS PRODUCTOS DE "ADEMÁS TE PUEDE GUSTAR" 🔴🔴🔴
   ---------------------------------------------------------
========================================================= */

const RECOMMENDATION_PRODUCTS = [
  {
    category: "CAMISAS",
    page: "../Camisas/",
    name: "good things tee",
    price: 350,
    image: "../images/ejemplo3.PNG"
  },
  {
    category: "GORRAS",
    page: "../Gorras/",
    name: "f#ck cap",
    price: 200,
    image: "../images/cap3.PNG"
  },
  {
    category: "HOODIES",
    page: "../Hoodies/",
    name: "STREED HOODIE",
    price: 450,
    image: "../images/hoodie1.PNG"
  }
];

(function(){
  const grid=document.getElementById("randomRecommendationGrid");
  if(!grid) return;

  const money=v=>{
    const n=Number(v);
    return Number.isFinite(n) ? `L ${n.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}` : "";
  };

  grid.innerHTML=RECOMMENDATION_PRODUCTS.map(product=>`
    <a class="random-recommendation-product" href="${product.page}">
      <div class="random-recommendation-image-wrap">
        <img class="random-recommendation-image" src="${product.image}" alt="${product.name}" loading="lazy">
      </div>
      <div class="random-recommendation-info">
        <div class="random-recommendation-kicker">${product.category}</div>
        <div class="random-recommendation-name">${product.name}</div>
        <div class="random-recommendation-price">${money(product.price)}</div>
		<span class="random-recommendation-cta">VER PRODUCTO →</span>
      </div>
    </a>
  `).join("");
})();
;

    /* ==================================================
       ELEMENTOS
    ================================================== */

    const pageLoader =
      document.getElementById("pageLoader");

    const loaderLogo =
      pageLoader.querySelector(".loader-logo");

    const menuButton =
      document.getElementById("menuButton");

    const menuPanel =
      document.getElementById("menuPanel");

    const searchButton =
      document.getElementById("searchButton");

    const searchPanel =
      document.getElementById("searchPanel");

    const searchInput =
      document.getElementById("searchInput");

    const cartButton =
      document.getElementById("cartButton");

    const cartPanel =
      document.getElementById("cartPanel");

    const cartClose =
      document.getElementById("cartClose");

    const backToTopButton =
      document.getElementById("backToTopButton");


    /* ==================================================
       OCULTAR LOADER
    ================================================== */

    function hidePageLoader() {

      if (!pageLoader) return;

      pageLoader.classList.add("hide");

      setTimeout(() => {

        pageLoader.style.display = "none";

      }, 600);

    }


    /* ==================================================
       MOSTRAR + REINICIAR ANIMACIÓN
    ================================================== */

    function showPageLoader() {

      if (!pageLoader) return;

      pageLoader.style.display = "flex";

      pageLoader.classList.remove("hide");


      if (loaderLogo) {

        loaderLogo.style.animation = "none";

        /*
          Fuerza al navegador a reiniciar
          la animación desde cero.
        */

        void loaderLogo.offsetWidth;

        loaderLogo.style.animation =
          "streedLoader .9s cubic-bezier(.22, 1, .36, 1) both";

      }

    }


    /* ==================================================
       CARGA INICIAL
    ================================================== */

    window.addEventListener(
      "load",
      () => {

        setTimeout(
          hidePageLoader,
          650
        );

      }
    );


    window.addEventListener(
      "pageshow",
      event => {

        if (event.persisted) {

          hidePageLoader();

        }

      }
    );


    /* ==================================================
       BOTÓN SCROLL & REGRESAR ARRIBA
    ================================================== */

    window.addEventListener(
      "scroll",
      () => {
        const scroll = window.scrollY || window.pageYOffset;
        if (scroll > 300) {
          backToTopButton.classList.add("show");
        } else {
          backToTopButton.classList.remove("show");
        }
      },
      { passive: true }
    );

    backToTopButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });


    /* ==================================================
       BOTÓN MENU
       
       IMPORTANTE:
       AQUÍ NO SE ACTIVA LA ANIMACIÓN.
       SOLO ABRE / CIERRA EL MENU.
    ================================================== */

    menuButton.addEventListener(
      "click",
      event => {

        event.stopPropagation();

        const isOpen =
          menuPanel.classList.contains("open");


        menuPanel.classList.toggle(
          "open",
          !isOpen
        );


        menuButton.classList.toggle(
          "active",
          !isOpen
        );


        menuButton.setAttribute(
          "aria-expanded",
          String(!isOpen)
        );


        /* Cerrar buscador */

        searchPanel.classList.remove("open");

        searchButton.classList.remove("active");

        searchButton.setAttribute(
          "aria-expanded",
          "false"
        );


        /* Cerrar carrito */

        cartPanel.classList.remove("open");

        cartButton.classList.remove("active");

        cartButton.setAttribute(
          "aria-expanded",
          "false"
        );

      }
    );


    /* ==================================================
       BUSCADOR
    ================================================== */

    searchButton.addEventListener(
      "click",
      event => {

        event.stopPropagation();

        const isOpen =
          searchPanel.classList.contains("open");


        searchPanel.classList.toggle(
          "open",
          !isOpen
        );


        searchButton.classList.toggle(
          "active",
          !isOpen
        );


        searchButton.setAttribute(
          "aria-expanded",
          String(!isOpen)
        );


        if (!isOpen) {

          setTimeout(
            () => searchInput.focus(),
            100
          );

        }


        /* Cerrar menu */

        menuPanel.classList.remove("open");

        menuButton.classList.remove("active");

        menuButton.setAttribute(
          "aria-expanded",
          "false"
        );


        /* Cerrar carrito */

        cartPanel.classList.remove("open");

        cartButton.classList.remove("active");

        cartButton.setAttribute(
          "aria-expanded",
          "false"
        );

      }
    );


    /* ==================================================
       BUSQUEDA
    ================================================== */

    function escapeHtml(value) {
      return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
    }

    function handleSearch(event) {
      event.preventDefault();

      const query = searchInput.value.trim().toLowerCase();
      const cards = document.querySelectorAll(".product-card");
      const status = document.getElementById("catalogSearchStatus");
      let found = 0;

      cards.forEach(card => {
        const name = (card.dataset.productName || "").toLowerCase();
        const matches = !query || name.includes(query);
        card.style.display = matches ? "" : "none";
        if (matches) found++;
      });

      document.querySelectorAll(".collection").forEach(collection => {
        const visible = Array.from(collection.querySelectorAll(".product-card"))
          .some(card => card.style.display !== "none");
        collection.style.display = visible ? "" : "none";
      });

      if (status) {
        if (query) {
          status.innerHTML = found
            ? `RESULTADOS PARA: <strong>${escapeHtml(searchInput.value.trim())}</strong> · ${found} producto(s)`
            : `NO HAY RESULTADOS PARA: <strong>${escapeHtml(searchInput.value.trim())}</strong>`;
          status.style.display = "block";
        } else {
          status.style.display = "none";
        }
      }

      searchPanel.classList.remove("open");
      searchButton.classList.remove("active");
      searchButton.setAttribute("aria-expanded", "false");

      const catalog = document.getElementById("streed-sets");
      if (catalog) catalog.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    // BUSCADOR RECIBIDO DESDE OTRA PÁGINA
    const incomingSearch = new URLSearchParams(window.location.search).get("search");
    if (incomingSearch) {
      searchInput.value = incomingSearch;
      handleSearch({ preventDefault(){} });
    }

    searchInput.addEventListener("input", () => {
      if (!searchInput.value.trim()) {
        document.querySelectorAll(".product-card").forEach(card => card.style.display = "");
        document.querySelectorAll(".collection").forEach(collection => collection.style.display = "");
        const status = document.getElementById("catalogSearchStatus");
        if (status) status.style.display = "none";
      }
    });


    /* ==================================================
       CARRITO
    ================================================== */

    /* ==================================================
       CARRITO FUNCIONAL
       Se guarda en localStorage.
    ================================================== */

    const CART_KEY = "streed_cart_v1";
    let cart = [];

    try {
      cart = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
      if (!Array.isArray(cart)) cart = [];
    } catch (error) {
      cart = [];
    }

    const cartContent = document.getElementById("cartContent");
    const cartItems = document.getElementById("cartItems");
    const cartFooter = document.getElementById("cartFooter");
    const cartTotal = document.getElementById("cartTotal");
    const cartCount = document.getElementById("cartCount");
    const cartWhatsappButton = document.getElementById("cartWhatsappButton");

    function formatPrice(value) {
      return "L " + Number(value).toFixed(2);
    }

    function saveCart() {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    }

    function updateCartCount() {
      const quantity = cart.reduce((sum, item) => sum + Number(item.quantity), 0);
      cartCount.textContent = quantity;
      cartCount.style.display = quantity ? "block" : "none";
    }

    function animateCartAdded() {
      cartButton.classList.remove("cart-added");
      void cartButton.offsetWidth;
      cartButton.classList.add("cart-added");
      setTimeout(() => cartButton.classList.remove("cart-added"), 550);
    }

    function renderCart() {
      const cartWasOpen = cartPanel.classList.contains("open");
      updateCartCount();

      if (!cart.length) {
        cartContent.style.display = "block";
        cartItems.innerHTML = "";
        cartFooter.style.display = "none";
        cartTotal.textContent = "L 0.00";
        cartWhatsappButton.disabled = true;
        return;
      }

      cartContent.style.display = "none";
      cartFooter.style.display = "block";
      cartWhatsappButton.disabled = false;
      if (cartWasOpen) {
        cartPanel.classList.add("open");
        cartButton.classList.add("active");
        cartButton.setAttribute("aria-expanded", "true");
      }

      cartItems.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
          <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}">
          <div class="cart-item-info">
            <div class="cart-item-name">${escapeHtml(item.name)}</div>
            <div class="cart-item-price">${formatPrice(item.price)} c/u</div>
            <div class="cart-item-subtotal">SUBTOTAL: ${formatPrice(Number(item.price) * Number(item.quantity))}</div>
            <div style="font-family:Arial,sans-serif;font-size:10px;color:#888;margin-top:5px;">${item.size ? `TALLA: ${escapeHtml(item.size)} · ` : ""}${item.fit ? `ESTILO: ${escapeHtml(item.fit)} · ` : ""}CANTIDAD: ${item.quantity}</div>
          </div>
          <div style="display:flex;align-items:center;gap:4px;">
            <button type="button" class="cart-remove" style="font-size:16px;width:24px;height:28px;" onclick="changeCartQuantity(${index},-1)" aria-label="Restar">−</button>
            <button type="button" class="cart-remove" style="font-size:16px;width:24px;height:28px;" onclick="changeCartQuantity(${index},1)" aria-label="Sumar">+</button>
            <button type="button" class="cart-remove" onclick="removeFromCart(${index})" aria-label="Eliminar">×</button>
          </div>
        </div>
      `).join("");

      const total = cart.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0);
      cartTotal.textContent = formatPrice(total);
      cartTotal.classList.remove("total-updated");
      void cartTotal.offsetWidth;
      cartTotal.classList.add("total-updated");
      setTimeout(() => cartTotal.classList.remove("total-updated"), 450);
    }

    cartItems.addEventListener("click", event => event.stopPropagation());

    function addToCart(product) {
      const existing = cart.find(item => item.name === product.name && item.price === product.price && item.image === product.image);

      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }

      saveCart();
      renderCart();
    }

    function changeCartQuantity(index, amount) {
      if (!cart[index]) return;
      cart[index].quantity += amount;
      if (cart[index].quantity <= 0) cart.splice(index, 1);
      saveCart();
      renderCart();
    }

    function removeFromCart(index) {
      cart.splice(index, 1);
      saveCart();
      renderCart();
    }

    /* PRODUCT DETAIL + WHATSAPP */
    const WHATSAPP_NUMBER = "504XXXXXXXX"; // Reemplaza por el número de STREED, sin + ni espacios.
    const productModal = document.getElementById("productModal");
    const productModalClose = document.getElementById("productModalClose");
    const productModalImage = document.getElementById("productModalImage");
    const productModalTitle = document.getElementById("productModalTitle");
    const productModalPrice = document.getElementById("productModalPrice");
    const productModalSubtotal = document.getElementById("productModalSubtotal");
    const productModalDescription = document.getElementById("productModalDescription");
    const productSizeOptions = document.getElementById("productSizeOptions");
    const productFitOptions = document.getElementById("productFitOptions");
    const productQty = document.getElementById("productQty");
    const productQtyMinus = document.getElementById("productQtyMinus");
    const productQtyPlus = document.getElementById("productQtyPlus");
    const productAddCart = document.getElementById("productAddCart");
    const productOrderWhatsapp = document.getElementById("productOrderWhatsapp");

    let activeProduct=null, selectedSize="M", selectedFit="REGULAR", selectedQuantity=1;

    function getProductData(card){
      return {name:card.dataset.productName||"PRODUCTO",price:Number(card.dataset.productPrice||0),image:card.dataset.productImage||"",description:card.dataset.productDescription||"Una prenda STREED diseñada para llevar el estilo de la marca a tu manera.",sizes:(card.dataset.productSizes||"S,M,L,XL,XXL").split(",").map(v=>v.trim()).filter(Boolean),fits:(card.dataset.productFits||"REGULAR,OVERSIZE").split(",").map(v=>v.trim()).filter(Boolean)};
    }
    function renderProductOptions(){
      productSizeOptions.innerHTML=activeProduct.sizes.map(size=>`<button type="button" class="product-option ${size===selectedSize?"active":""}" data-size="${escapeHtml(size)}">${escapeHtml(size)}</button>`).join("");
      productFitOptions.innerHTML=activeProduct.fits.map(fit=>`<button type="button" class="product-option ${fit===selectedFit?"active":""}" data-fit="${escapeHtml(fit)}">${escapeHtml(fit)}</button>`).join("");
      productSizeOptions.querySelectorAll("[data-size]").forEach(b=>b.onclick=()=>{selectedSize=b.dataset.size;renderProductOptions()});
      productFitOptions.querySelectorAll("[data-fit]").forEach(b=>b.onclick=()=>{selectedFit=b.dataset.fit;renderProductOptions()});
    }
    function openProductModal(card){
      activeProduct=getProductData(card); selectedSize=activeProduct.sizes.includes("M")?"M":activeProduct.sizes[0]; selectedFit=activeProduct.fits.includes("REGULAR")?"REGULAR":activeProduct.fits[0]; selectedQuantity=1;
      productModalImage.src=activeProduct.image; productModalImage.alt=activeProduct.name; productModalTitle.textContent=activeProduct.name; productModalPrice.textContent=formatPrice(activeProduct.price); productModalSubtotal.textContent=formatPrice(activeProduct.price); productModalDescription.textContent=activeProduct.description; productQty.textContent=1; renderProductOptions(); productModal.classList.add("open"); productModal.setAttribute("aria-hidden","false"); document.body.style.overflow="hidden";
    }
    function closeProductModal(){productModal.classList.remove("open");productModal.setAttribute("aria-hidden","true");document.body.style.overflow="";activeProduct=null}
    function getConfiguredProduct(){return activeProduct?{name:activeProduct.name,price:activeProduct.price,image:activeProduct.image,size:"",fit:"",quantity:selectedQuantity}:null}
    function animateProductToCart(source){
      if(!source || !cartButton) return;
      const img = source.querySelector ? source.querySelector("img") : null;
      const sourceRect = img ? img.getBoundingClientRect() : source.getBoundingClientRect();
      const targetRect = cartButton.getBoundingClientRect();
      const clone = document.createElement("img");
      clone.className = "cart-fly-clone";
      clone.src = img ? img.currentSrc || img.src : (activeProduct ? activeProduct.image : "");
      const size = Math.min(sourceRect.width || 80, 90);
      clone.style.width = size + "px";
      clone.style.height = size + "px";
      clone.style.left = sourceRect.left + (sourceRect.width-size)/2 + "px";
      clone.style.top = sourceRect.top + (sourceRect.height-size)/2 + "px";
      clone.style.setProperty("--fly-x", (targetRect.left + targetRect.width/2 - (sourceRect.left + sourceRect.width/2)) + "px");
      clone.style.setProperty("--fly-y", (targetRect.top + targetRect.height/2 - (sourceRect.top + sourceRect.height/2)) + "px");
      document.body.appendChild(clone);
      clone.addEventListener("animationend",()=>clone.remove(),{once:true});
    }

    function addConfiguredProduct(){
      const product=getConfiguredProduct(); if(!product)return;
      const existing=cart.find(item=>item.name===product.name&&Number(item.price)===Number(product.price)&&item.image===product.image&&item.size===product.size&&item.fit===product.fit);
      if(existing) existing.quantity+=product.quantity; else cart.push({...product}); saveCart(); renderCart(); animateCartAdded(); return product;
    }
    function buildWhatsappMessage(){
      const lines=["Hola STREED 👋, quiero hacer el siguiente pedido:",""];
      cart.forEach((item,i)=>{lines.push(`${i+1}. ${item.name}`);if(item.size)lines.push(`   Talla: ${item.size}`);if(item.fit)lines.push(`   Corte: ${item.fit}`);lines.push(`   Cantidad: ${item.quantity}`);lines.push(`   Precio: ${formatPrice(item.price)} c/u`);lines.push("")});
      const total=cart.reduce((sum,item)=>sum+Number(item.price)*Number(item.quantity),0); lines.push(`TOTAL: ${formatPrice(total)}`,"","Quedo pendiente para coordinar el pedido. ¡Gracias!"); return lines.join("\n");
    }
    function orderCartByWhatsapp(){
      if(!cart.length)return; const message=encodeURIComponent(buildWhatsappMessage()); const clean=WHATSAPP_NUMBER.replace(/\D/g,""); const url=(clean.length>=10&&!clean.includes("XXXXXXXX"))?`https://wa.me/${clean}?text=${message}`:`https://wa.me/?text=${message}`; window.open(url,"_blank","noopener,noreferrer");
    }
    function updateProductModalSubtotal(){ if(!activeProduct)return; productQty.textContent=selectedQuantity; productModalSubtotal.textContent=formatPrice(Number(activeProduct.price)*selectedQuantity); }
    productQtyMinus.onclick=()=>{selectedQuantity=Math.max(1,selectedQuantity-1);updateProductModalSubtotal()};
    productQtyPlus.onclick=()=>{selectedQuantity=Math.min(99,selectedQuantity+1);updateProductModalSubtotal()};
    productAddCart.onclick=()=>{animateProductToCart(document.querySelector(".product-modal-image-wrap"));addConfiguredProduct();animateCartAdded();productAddCart.classList.add("added");productAddCart.textContent="AÑADIDO ✓";setTimeout(()=>{productAddCart.textContent="AÑADIR AL CARRITO";productAddCart.classList.remove("added")},900)};
    productOrderWhatsapp.onclick=()=>{animateProductToCart(document.querySelector(".product-modal-image-wrap"));addConfiguredProduct();orderCartByWhatsapp()};
    productModalClose.onclick=closeProductModal;
    productModal.onclick=e=>{if(e.target===productModal)closeProductModal()};
    document.addEventListener("keydown",e=>{if(e.key==="Escape"&&productModal.classList.contains("open"))closeProductModal()});
    document.querySelectorAll(".product-card").forEach(card=>{
      card.tabIndex=0;
      card.onclick=e=>{if(!e.target.closest("button"))openProductModal(card)};
      card.onkeydown=e=>{if((e.key==="Enter"||e.key===" ")&&!e.target.closest("button")){e.preventDefault();openProductModal(card)}};
    });
    document.querySelectorAll("[data-add-cart]").forEach(button=>{
      button.addEventListener("click",()=>{
        const card=button.closest(".product-card"); if(!card)return; animateProductToCart(card); const product=getProductData(card); const existing=cart.find(item=>item.name===product.name&&Number(item.price)===Number(product.price)&&item.image===product.image&&item.size===""&&item.fit===""); if(existing)existing.quantity+=1;else cart.push({...product,size:"",fit:"",quantity:1}); saveCart();renderCart(); animateCartAdded();
        const originalText=button.textContent;button.textContent="AÑADIDO ✓";button.classList.add("added");setTimeout(()=>{button.textContent=originalText;button.classList.remove("added")},900);
      });
    });
    cartWhatsappButton.addEventListener("click",orderCartByWhatsapp);
    renderCart();

    // Si el usuario vuelve desde INICIO u otra página del mismo sitio,
    // recuperamos el carrito guardado en localStorage.
    window.addEventListener("pageshow", () => {
      try {
        const savedCart = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
        cart = Array.isArray(savedCart) ? savedCart : [];
      } catch (error) {
        cart = [];
      }
      renderCart();
    });

    cartButton.addEventListener(
      "click",
      event => {

        event.stopPropagation();

        const isOpen =
          cartPanel.classList.contains("open");


        cartPanel.classList.toggle(
          "open",
          !isOpen
        );


        cartButton.classList.toggle(
          "active",
          !isOpen
        );


        cartButton.setAttribute(
          "aria-expanded",
          String(!isOpen)
        );


        /* Cerrar menu */

        menuPanel.classList.remove("open");

        menuButton.classList.remove("active");

        menuButton.setAttribute(
          "aria-expanded",
          "false"
        );


        /* Cerrar buscador */

        searchPanel.classList.remove("open");

        searchButton.classList.remove("active");

        searchButton.setAttribute(
          "aria-expanded",
          "false"
        );

      }
    );


    /* ==================================================
       CERRAR CARRITO
    ================================================== */

    cartClose.addEventListener(
      "click",
      () => {

        cartPanel.classList.remove(
          "open"
        );

        cartButton.classList.remove(
          "active"
        );

        cartButton.setAttribute(
          "aria-expanded",
          "false"
        );

      }
    );


    cartPanel.addEventListener("click", event => event.stopPropagation());

    /* ==================================================
       CLICK AFUERA
    ================================================== */

    document.addEventListener(
      "click",
      event => {

        /* MENU */

        if (
          !menuPanel.contains(event.target) &&
          !menuButton.contains(event.target)
        ) {

          menuPanel.classList.remove(
            "open"
          );

          menuButton.classList.remove(
            "active"
          );

          menuButton.setAttribute(
            "aria-expanded",
            "false"
          );

        }


        /* SEARCH */

        if (
          !searchPanel.contains(event.target) &&
          !searchButton.contains(event.target)
        ) {

          searchPanel.classList.remove(
            "open"
          );

          searchButton.classList.remove(
            "active"
          );

          searchButton.setAttribute(
            "aria-expanded",
            "false"
          );

        }


        /* CART */

        if (
          !cartPanel.contains(event.target) &&
          !cartButton.contains(event.target)
        ) {

          cartPanel.classList.remove(
            "open"
          );

          cartButton.classList.remove(
            "active"
          );

          cartButton.setAttribute(
            "aria-expanded",
            "false"
          );

        }

      }
    );


    /* ==================================================
       LINKS DEL MENU
       
       AQUÍ ES DONDE APARECE LA ANIMACIÓN
    ================================================== */

    menuPanel
      .querySelectorAll("a")
      .forEach(link => {

        link.addEventListener(
          "click",
          event => {

            const href =
              link.getAttribute("href");


            /*
              INICIO:
              funciona normalmente.
            */

            if (
              !href ||
              !href.startsWith("#")
            ) {

              menuPanel.classList.remove(
                "open"
              );

              menuButton.classList.remove(
                "active"
              );

              menuButton.setAttribute(
                "aria-expanded",
                "false"
              );

              return;

            }


            /*
              SECCIONES:
              CAMISAS
              GORRAS
              PHONE CASES
              STREED SETS
              PERSONALIZACIÓN
            */

            event.preventDefault();


            /* Cerrar menu */

            menuPanel.classList.remove(
              "open"
            );

            menuButton.classList.remove(
              "active"
            );

            menuButton.setAttribute(
              "aria-expanded",
              "false"
            );


            /*
              Mostrar animación
              cada vez que se toca
              una sección.
            */

            showPageLoader();


            /*
              Esperar a que termine
              la animación del logo.
            */

            setTimeout(
              () => {

                hidePageLoader();


                /*
                  Buscar la sección
                */

                const target =
                  document.querySelector(href);


                if (target) {

                  target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                  });

                }

              },
              950
            );

          }
        );

      });


    const headerLogo = document.querySelector(".logo-link");

    function updateHeaderLogo() {
      if (!headerLogo) return;
      headerLogo.classList.toggle("logo-hidden", window.scrollY > 12);
    }

    window.addEventListener("scroll", updateHeaderLogo, { passive: true });
    updateHeaderLogo();

  
