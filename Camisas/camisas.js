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


        searchPanel.classList.remove("open");
        searchButton.classList.remove("active");
        searchButton.setAttribute("aria-expanded", "false");

        cartPanel.classList.remove("open");
        cartButton.classList.remove("active");
        cartButton.setAttribute("aria-expanded", "false");

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


        menuPanel.classList.remove("open");
        menuButton.classList.remove("active");
        menuButton.setAttribute("aria-expanded", "false");

        cartPanel.classList.remove("open");
        cartButton.classList.remove("active");
        cartButton.setAttribute("aria-expanded", "false");

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

      const catalog = document.getElementById("camisas");
      if (catalog) catalog.scrollIntoView({ behavior: "smooth", block: "start" });
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
            <div style="font-family:Arial,sans-serif;font-size:10px;color:#888;margin-top:5px;">${item.size ? `TALLA: ${escapeHtml(item.size)} · ` : ""}${item.color ? `COLOR: ${escapeHtml(item.color)} · ` : ""}CANTIDAD: ${item.quantity}</div>
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
    const WHATSAPP_NUMBER = "50489055186"; 
    const productModal = document.getElementById("productModal");
    const productModalClose = document.getElementById("productModalClose");
    const modalImageTrack = document.getElementById("modalImageTrack");
    const productModalTitle = document.getElementById("productModalTitle");
    const productModalPrice = document.getElementById("productModalPrice");
    const productModalSubtotal = document.getElementById("productModalSubtotal");
    const productModalDescription = document.getElementById("productModalDescription");
    const productSizeOptions = document.getElementById("productSizeOptions");
    const productColorOptions = document.getElementById("productColorOptions");
    const productQty = document.getElementById("productQty");
    const productQtyMinus = document.getElementById("productQtyMinus");
    const productQtyPlus = document.getElementById("productQtyPlus");
    const productAddCart = document.getElementById("productAddCart");
    const productOrderWhatsapp = document.getElementById("productOrderWhatsapp");
    const modalPrevBtn = document.getElementById("modalPrevBtn");
    const modalNextBtn = document.getElementById("modalNextBtn");
    const modalSliderDots = document.querySelectorAll(".modal-dot");

    let activeProduct = null, selectedSize = null, selectedColor = null, selectedQuantity = 1;
    let modalImageIndex = 0;

    function getProductData(card){
      const shirtImg = card.dataset.shirtImages || "";
      const whiteImg = card.dataset.modelWhite || "";
      const blackBaseImg = card.dataset.blackImage || "";
      const blackModelImg = card.dataset.modelBlack || "";
      
      const images = [shirtImg, whiteImg, blackBaseImg, blackModelImg].filter(Boolean);

      return {
        baseName: card.dataset.productName || "PRODUCTO",
        price: Number(card.dataset.productPrice || 0),
        images: images,
        description: card.dataset.productDescription || "Una prenda STREED diseñada para llevar el estilo de la marca a tu manera.",
        sizes: (card.dataset.productSizes || "S,M,L,XL,XXL").split(",").map(v => v.trim()).filter(Boolean),
        colors: ["Blanco", "Negro"]
      };
    }

    function getActiveImage() {
      if (!activeProduct) return "";
      return activeProduct.images[modalImageIndex] || activeProduct.images[0];
    }

    function updateColorFromImageIndex() {
      if (modalImageIndex === 0 || modalImageIndex === 1) {
        selectedColor = "Blanco";
      } else if (modalImageIndex === 2 || modalImageIndex === 3) {
        selectedColor = "Negro";
      }
    }

    function renderProductOptions(){
      productSizeOptions.innerHTML = activeProduct.sizes.map(size => `<button type="button" class="product-option ${size === selectedSize ? "active" : ""}" data-size="${escapeHtml(size)}">${escapeHtml(size)}</button>`).join("");
      
      productColorOptions.innerHTML = activeProduct.colors.map(color => {
        const hex = color === "Negro" ? "#000000" : "#ffffff";
        const isActive = color === selectedColor ? "active" : "";
        return `<button type="button" class="color-option-btn ${isActive}" data-color="${escapeHtml(color)}" style="background-color: ${hex};" title="${escapeHtml(color)}"></button>`;
      }).join("");
      
      productSizeOptions.querySelectorAll("[data-size]").forEach(b => b.onclick = () => { selectedSize = b.dataset.size; renderProductOptions(); });
      productColorOptions.querySelectorAll("[data-color]").forEach(b => b.onclick = () => { 
        selectedColor = b.dataset.color; 
        if(selectedColor === "Blanco") modalImageIndex = 0; 
        if(selectedColor === "Negro") modalImageIndex = 2;  
        renderProductOptions(); 
        updateModalCarousel(); 
      });
    }

    function updateModalCarousel() {
      if (!activeProduct) return;
      
      updateColorFromImageIndex();
      renderProductOptions();

      if (selectedColor) {
        productModalTitle.textContent = `${activeProduct.baseName} (${selectedColor})`;
      } else {
        productModalTitle.textContent = activeProduct.baseName;
      }

      modalImageTrack.style.transform = `translateX(-${modalImageIndex * 100}%)`;

      modalSliderDots.forEach((dot, idx) => {
        dot.classList.toggle("active", idx === modalImageIndex);
        dot.style.display = idx < activeProduct.images.length ? "block" : "none";
      });
    }

    function openProductModal(card){
      activeProduct = getProductData(card); 
      selectedSize = null; 
      modalImageIndex = 0; 
      selectedQuantity = 1;

      modalImageTrack.innerHTML = activeProduct.images.map(img => `<img class="product-modal-image" src="${escapeHtml(img)}" alt="">`).join("");
      
      updateModalCarousel();
      productModalPrice.textContent = formatPrice(activeProduct.price); 
      productModalSubtotal.textContent = formatPrice(activeProduct.price); 
      productModalDescription.textContent = activeProduct.description; 
      productQty.textContent = 1; 
      renderProductOptions(); 
      productModal.classList.add("open"); 
      productModal.setAttribute("aria-hidden", "false"); 
      document.body.style.overflow = "hidden";
    }

    function closeProductModal(){
      productModal.classList.remove("open");
      productModal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      activeProduct = null;
    }

    function getConfiguredProduct(){
      const imgPath = getActiveImage();
      return activeProduct ? {
        name: `${activeProduct.baseName}${selectedColor ? ' (' + selectedColor + ')' : ''}`,
        price: activeProduct.price,
        image: imgPath,
        size: selectedSize,
        color: selectedColor,
        quantity: selectedQuantity
      } : null;
    }

    function animateProductToCart(source){
      if(!source || !cartButton) return;
      const img = source.querySelector ? source.querySelector("img") : null;
      const sourceRect = img ? img.getBoundingClientRect() : source.getBoundingClientRect();
      const targetRect = cartButton.getBoundingClientRect();
      const clone = document.createElement("img");
      clone.className = "cart-fly-clone";
      clone.src = img ? img.currentSrc || img.src : (activeProduct ? getActiveImage() : "");
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
      const product = getConfiguredProduct(); 
      if(!product) return;
      const existing = cart.find(item => item.name === product.name && Number(item.price) === Number(product.price) && item.image === product.image && item.size === product.size && item.color === product.color);
      if(existing) existing.quantity += product.quantity; else cart.push({...product}); 
      saveCart(); 
      renderCart(); 
      animateCartAdded(); 
      return product;
    }

    function buildWhatsappMessage(){
      const lines = ["Hola STREED 👋, quiero hacer el siguiente pedido:",""];
      cart.forEach((item,i)=>{
        lines.push(`${i+1}. ${item.name}`);
        if(item.size) lines.push(`   Talla: ${item.size}`);
        if(item.color) lines.push(`   Color: ${item.color}`);
        lines.push(`   Cantidad: ${item.quantity}`);
        lines.push(`   Precio: ${formatPrice(item.price)} c/u`);
        lines.push("");
      });
      const total = cart.reduce((sum,item)=>sum+Number(item.price)*Number(item.quantity),0); 
      lines.push(`TOTAL: ${formatPrice(total)}`,"","Quedo pendiente para coordinar el pedido. ¡Gracias!"); 
      return lines.join("\n");
    }

    function orderCartByWhatsapp(){
      if(!cart.length) return; 
      const message = encodeURIComponent(buildWhatsappMessage()); 
      const clean = WHATSAPP_NUMBER.replace(/\D/g,""); 
      const url = `https://wa.me/${clean}?text=${message}`; 
      window.open(url,"_blank","noopener,noreferrer");
    }

    function updateProductModalSubtotal(){ 
      if(!activeProduct) return; 
      productQty.textContent = selectedQuantity; 
      productModalSubtotal.textContent = formatPrice(Number(activeProduct.price) * selectedQuantity); 
    }

    const selectionWarningModal = document.getElementById("selectionWarningModal");
    const selectionWarningClose = document.getElementById("selectionWarningClose");
    const selectionWarningMessage = document.getElementById("selectionWarningMessage");
    
    function showSelectionWarning(message){
      if(selectionWarningMessage) selectionWarningMessage.textContent = message;
      selectionWarningModal.classList.add("open");
      selectionWarningModal.setAttribute("aria-hidden", "false");
    }
    function closeSelectionWarning(){
      selectionWarningModal.classList.remove("open");
      selectionWarningModal.setAttribute("aria-hidden", "true");
    }
    
    function validateProductSelection(){
      if(!selectedSize && !selectedColor){ showSelectionWarning("Selecciona una talla y un color antes de continuar."); return false; }
      if(!selectedSize){ showSelectionWarning("Selecciona una talla antes de continuar."); return false; }
      if(!selectedColor){ showSelectionWarning("Selecciona un color antes de continuar."); return false; }
      return true;
    }
    
    selectionWarningClose.onclick = closeSelectionWarning;
    selectionWarningModal.onclick = e => { if(e.target === selectionWarningModal) closeSelectionWarning(); };

    /* GUÍA DE TALLAS MODAL */
    const sizeGuideModal = document.getElementById("sizeGuideModal");
    const openSizeGuideBtn = document.getElementById("openSizeGuideBtn");
    const sizeGuideCloseBtn = document.getElementById("sizeGuideCloseBtn");

    if(openSizeGuideBtn) {
      openSizeGuideBtn.onclick = () => sizeGuideModal.classList.add("open");
    }
    if(sizeGuideCloseBtn) {
      sizeGuideCloseBtn.onclick = () => sizeGuideModal.classList.remove("open");
    }
    sizeGuideModal.onclick = e => { if(e.target === sizeGuideModal) sizeGuideModal.classList.remove("open"); };

    productQtyMinus.onclick = () => { selectedQuantity = Math.max(1, selectedQuantity - 1); updateProductModalSubtotal(); };
    productQtyPlus.onclick = () => { selectedQuantity = Math.min(99, selectedQuantity + 1); updateProductModalSubtotal(); };
    
    productAddCart.onclick = () => {
      if(!validateProductSelection()) return;
      animateProductToCart(document.querySelector(".product-modal-image-wrap"));
      addConfiguredProduct();
      animateCartAdded();
      productAddCart.classList.add("added");
      productAddCart.textContent = "AÑADIDO ✓";
      setTimeout(() => {
        productAddCart.textContent = "AÑADIR AL CARRITO";
        productAddCart.classList.remove("added");
      }, 900);
    };

    productOrderWhatsapp.onclick = () => {
      if(!validateProductSelection()) return;
      animateProductToCart(document.querySelector(".product-modal-image-wrap"));
      addConfiguredProduct();
      orderCartByWhatsapp();
    };

    productModalClose.onclick = closeProductModal;
    productModal.onclick = e => { if(e.target === productModal) closeProductModal(); };
    
    document.addEventListener("keydown", e => {
      if(e.key === "Escape" && selectionWarningModal.classList.contains("open")){ closeSelectionWarning(); return; }
      if(e.key === "Escape" && sizeGuideModal.classList.contains("open")){ sizeGuideModal.classList.remove("open"); return; }
      if(e.key === "Escape" && productModal.classList.contains("open")) closeProductModal();
    });

    /* TARJETAS DEL CATÁLOGO (SIN TRABEOS) */
    document.querySelectorAll(".product-card").forEach(card => {
      card.tabIndex = 0;

      card.onclick = e => { 
        if(!e.target.closest("button")) {
          openProductModal(card); 
        }
      };
      
      card.onkeydown = e => {
        if((e.key === "Enter" || e.key === " ") && !e.target.closest("button")){
          e.preventDefault();
          openProductModal(card);
        }
      };
    });

    /* CARRUSEL FLUIDO TIPO STRIP DENTRO DEL MODAL (RATÓN, MOUSEPAD Y TÁCTIL) */
    const modalImageWrap = document.getElementById("modalImageWrap");
    let modalStartX = 0;
    let modalIsDragging = false;

    if(modalPrevBtn && modalNextBtn) {
      modalPrevBtn.onclick = (e) => {
        e.stopPropagation();
        if(!activeProduct) return;
        modalImageIndex = (modalImageIndex - 1 + activeProduct.images.length) % activeProduct.images.length;
        updateModalCarousel();
      };
      modalNextBtn.onclick = (e) => {
        e.stopPropagation();
        if(!activeProduct) return;
        modalImageIndex = (modalImageIndex + 1) % activeProduct.images.length;
        updateModalCarousel();
      };
    }

    modalSliderDots.forEach(dot => {
      dot.onclick = (e) => {
        e.stopPropagation();
        if(!activeProduct) return;
        const idx = Number(dot.dataset.index);
        if(idx < activeProduct.images.length) {
          modalImageIndex = idx;
          updateModalCarousel();
        }
      };
    });

    if(modalImageWrap) {
      modalImageWrap.addEventListener("mousedown", (e) => {
        modalStartX = e.clientX;
        modalIsDragging = true;
      });

      window.addEventListener("mouseup", (e) => {
        if (!modalIsDragging || !activeProduct) return;
        const diffX = e.clientX - modalStartX;
        if (Math.abs(diffX) > 30) {
          if (diffX < 0) {
            modalImageIndex = (modalImageIndex + 1) % activeProduct.images.length;
          } else {
            modalImageIndex = (modalImageIndex - 1 + activeProduct.images.length) % activeProduct.images.length;
          }
          updateModalCarousel();
        }
        modalIsDragging = false;
      });

      modalImageWrap.addEventListener("touchstart", (e) => {
        modalStartX = e.touches[0].clientX;
      }, {passive: true});

      modalImageWrap.addEventListener("touchend", (e) => {
        if(!activeProduct) return;
        const diffX = e.changedTouches[0].clientX - modalStartX;
        if (Math.abs(diffX) > 30) {
          if (diffX < 0) {
            modalImageIndex = (modalImageIndex + 1) % activeProduct.images.length;
          } else {
            modalImageIndex = (modalImageIndex - 1 + activeProduct.images.length) % activeProduct.images.length;
          }
          updateModalCarousel();
        }
      }, {passive: true});
    }

    cartWhatsappButton.addEventListener("click", orderCartByWhatsapp);

    const RECOMMENDED_PRODUCTS = [
      {
        page: "../Gorras/",
        section: "collection-01",
        image: "../images/cap2.jpeg",
        name: "wor$st girl cap",
        price: 200
      },
      {
        page: "../Hoodies/index.html",
        section: "collection-01",
        image: "../images/case1.PNG",
        name: "bae phone case",
        price: 300
      },
      {
        page: "../Streed%20Sets/",
        section: "collection-01",
        image: "../images/set1.PNG",
        name: "STREED SET 01",
        price: 799
      },
    ];

    function loadRandomRecommendation(){
      const grid = document.getElementById("randomRecommendationGrid");
      if(!grid) return;

      grid.innerHTML = RECOMMENDED_PRODUCTS.slice(0,4).map(product => {
        const price = Number.isFinite(Number(product.price))
          ? `L ${Number(product.price).toFixed(2)}`
          : "";

        return `
          <a class="random-recommendation-product" href="${product.page}#${product.section}">
            <div class="random-recommendation-image-wrap"><img class="random-recommendation-image" src="${product.image}" alt="${product.name}" loading="lazy"></div>
            <div class="random-recommendation-info">
              <div class="random-recommendation-kicker">STREED SELECTED</div>
              <h3 class="random-recommendation-name">${product.name}</h3>
              <div class="random-recommendation-price">${price}</div>
              <span class="random-recommendation-cta">VER PRODUCTO →</span>
            </div>
          </a>`;
      }).join("");
    }

    loadRandomRecommendation();
    renderCart();

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
        const isOpen = cartPanel.classList.contains("open");
        cartPanel.classList.toggle("open", !isOpen);
        cartButton.classList.toggle("active", !isOpen);
        cartButton.setAttribute("aria-expanded", String(!isOpen));

        menuPanel.classList.remove("open");
        menuButton.classList.remove("active");
        menuButton.setAttribute("aria-expanded", "false");

        searchPanel.classList.remove("open");
        searchButton.classList.remove("active");
        searchButton.setAttribute("aria-expanded", "false");
      }
    );

    cartClose.addEventListener(
      "click",
      () => {
        cartPanel.classList.remove("open");
        cartButton.classList.remove("active");
        cartButton.setAttribute("aria-expanded", "false");
      }
    );

    cartPanel.addEventListener("click", event => event.stopPropagation());

    document.addEventListener(
      "click",
      event => {
        if (!menuPanel.contains(event.target) && !menuButton.contains(event.target)) {
          menuPanel.classList.remove("open");
          menuButton.classList.remove("active");
          menuButton.setAttribute("aria-expanded", "false");
        }

        if (!searchPanel.contains(event.target) && !searchButton.contains(event.target)) {
          searchPanel.classList.remove("open");
          searchButton.classList.remove("active");
          searchButton.setAttribute("aria-expanded", "false");
        }

        if (!cartPanel.contains(event.target) && !cartButton.contains(event.target)) {
          cartPanel.classList.remove("open");
          cartButton.classList.remove("active");
          cartButton.setAttribute("aria-expanded", "false");
        }
      }
    );

    /* ==================================================
       LOGO VISIBLE AL INICIO / OCULTO AL HACER SCROLL
    ================================================== */
    const headerLogo = document.querySelector(".logo-link");

    function updateHeaderLogo(){
      if(!headerLogo) return;
      headerLogo.classList.toggle("logo-hidden", window.scrollY > 12);
    }

    window.addEventListener("scroll", updateHeaderLogo, {passive: true});
    updateHeaderLogo();

    menuPanel
      .querySelectorAll("a")
      .forEach(link => {
        link.addEventListener(
          "click",
          event => {
            const href = link.getAttribute("href");

            if (!href || !href.startsWith("#")) {
              menuPanel.classList.remove("open");
              menuButton.classList.remove("active");
              menuButton.setAttribute("aria-expanded", "false");
              return;
            }

            event.preventDefault();

            menuPanel.classList.remove("open");
            menuButton.classList.remove("active");
            menuButton.setAttribute("aria-expanded", "false");

            showPageLoader();

            setTimeout(
              () => {
                hidePageLoader();
                const target = document.querySelector(href);
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

  
;

const RECOMMENDATION_PRODUCTS = [
  {category:"STREED SELECTED",page:"../Camisas/index.html",name:"Bad Bunny tee",price:350,image:"../images/ejemplo1.PNG"},
  {category:"STREED SELECTED",page:"../Hoodies/index.html",name:"baile inolvidable case",price:300,image:"../images/case4.PNG"},
  {category:"STREED SELECTED",page:"../Streed%20Sets/",name:"STREED SET 02",price:1199,image:"../images/set2.PNG"}
];
function renderRecommendations(){
 const grid=document.getElementById("randomRecommendationGrid"); if(!grid)return;
 grid.innerHTML=RECOMMENDATION_PRODUCTS.map((p,i)=>`<a class="random-recommendation-product" href="${p.page}" aria-label="Ver ${p.name}"><div class="random-recommendation-image-wrap"><img class="random-recommendation-image" src="${p.image}" alt="${p.name}" loading="eager" decoding="async" data-rec="${i}"></div><div class="random-recommendation-info"><div class="random-recommendation-kicker">${p.category}</div><div class="random-recommendation-name">${p.name}</div><div class="random-recommendation-price">L ${Number(p.price).toFixed(2)}</div><span class="random-recommendation-cta">VER PRODUCTO →</span></div></a>`).join("");
 grid.querySelectorAll(".random-recommendation-image").forEach((img,i)=>{const original=RECOMMENDATION_PRODUCTS[i].image;const base=original.replace(/\.(PNG|png|JPG|jpg|JPEG|jpeg)$/i,"");const candidates=[original,base+".PNG",base+".png",base+".JPEG",base+".jpeg",base+".JPG",base+".jpg"];let n=0;img.addEventListener("error",()=>{n++;if(n<candidates.length)img.src=candidates[n];});});
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",renderRecommendations);else renderRecommendations();
