    const logo =
      document.getElementById("logo");

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


    const START_SIZE_DESKTOP = 600;

    const START_SIZE_TABLET = 520;

    const END_SIZE_DESKTOP = 150;


    const MOBILE_START_PERCENT = 72;

    const MOBILE_SMALL_PERCENT = 68;

    const MOBILE_TINY_PERCENT = 65;

    const MOBILE_END_SIZE = 105;


    const ANIMATION_DISTANCE = 100;

    const FINAL_TOP_DESKTOP = 49;

    const FINAL_TOP_MOBILE = 37;

    const SMOOTHNESS_DESKTOP = 0.20;

    const SMOOTHNESS_MOBILE = 0.16;


    let targetProgress = 0;

    let currentProgress = 0;


    function isMobile() {

      return window.innerWidth <= 768;

    }


    function getStartSize() {

      const width =
        window.innerWidth;

      if (width <= 360) {

        return width *
          (MOBILE_TINY_PERCENT / 100);

      }

      if (width <= 390) {

        return width *
          (MOBILE_SMALL_PERCENT / 100);

      }

      if (width <= 768) {

        return width *
          (MOBILE_START_PERCENT / 100);

      }

      if (width <= 1024) {

        return START_SIZE_TABLET;

      }

      return START_SIZE_DESKTOP;

    }


    function getEndSize() {

      if (isMobile()) {

        return MOBILE_END_SIZE;

      }

      return END_SIZE_DESKTOP;

    }


    function getFinalTop() {

      if (isMobile()) {

        return FINAL_TOP_MOBILE;

      }

      return FINAL_TOP_DESKTOP;

    }


    window.addEventListener(

      "scroll",

      () => {

        const scroll =
          window.scrollY || window.pageYOffset;

        targetProgress =
          scroll /
          ANIMATION_DISTANCE;

        targetProgress =
          Math.max(
            0,
            Math.min(
              targetProgress,
              1
            )
          );

        if (targetProgress >= 1) {
          menuButton.classList.add("scrolled-out");
          searchButton.classList.add("scrolled-out");
          cartButton.classList.add("scrolled-out");
        } else {
          menuButton.classList.remove("scrolled-out");
          searchButton.classList.remove("scrolled-out");
          cartButton.classList.remove("scrolled-out");
        }

      },

      {
        passive: true
      }

    );


    function animateLogo() {

      const smoothness =
        isMobile()
          ? SMOOTHNESS_MOBILE
          : SMOOTHNESS_DESKTOP;

      currentProgress +=
        (
          targetProgress -
          currentProgress
        ) *
        smoothness;

      if (
        Math.abs(
          targetProgress -
          currentProgress
        ) < 0.0005
      ) {

        currentProgress =
          targetProgress;

      }

      const progress =
        currentProgress;

      const startSize =
        getStartSize();

      const endSize =
        getEndSize();

      const size =
        startSize +
        (
          endSize -
          startSize
        ) *
        progress;

      logo.style.width =
        `${size}px`;

      const viewportHeight =
        window.innerHeight;

      const startCenterY = isMobile() ? (viewportHeight * 0.35) : (viewportHeight / 2);

      const finalTop =
        getFinalTop();

      const y =
        startCenterY +
        (
          finalTop -
          startCenterY
        ) *
        progress;

      logo.style.top =
        `${y}px`;

      logo.style.left =
        "50%";

      logo.style.transform =
        "translate3d(-50%, -50%, 0)";

      if (
        targetProgress >= 1
      ) {

        if (
          logo.dataset.final !== "true"
        ) {

          logo.dataset.final =
            "true";

          logo.src =
            "images/LOGOTIPO.PNG";

          logo.classList.add(
            "final-logo"
          );

        }

      }

      else {

        if (
          logo.dataset.final === "true"
        ) {

          logo.dataset.final =
            "false";

          logo.src =
            "images/IMG_1806.PNG";

          logo.classList.remove(
            "final-logo"
          );

        }

      }

      requestAnimationFrame(
        animateLogo
      );

    }


    logo.addEventListener(

      "click",

      () => {

        if (
          logo.dataset.final === "true"
        ) {

          window.scrollTo({

            top: 0,

            behavior: "smooth"

          });

        }

      }

    );


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
          setTimeout(() => searchInput.focus(), 100);
        }

        menuPanel.classList.remove("open");
        menuButton.classList.remove("active");
        menuButton.setAttribute("aria-expanded", "false");

      }

    );

    function openSearchResultsModal(results, query) {
      const modal = document.getElementById("siteSearchResultsModal");
      const list = document.getElementById("siteSearchResultsList");
      const title = document.getElementById("siteSearchResultsTitle");
      const count = document.getElementById("siteSearchResultsCount");
      if (!modal || !list) return;

      title.textContent = 'RESULTADOS PARA “' + query.toUpperCase() + '”';
      count.textContent = results.length + (results.length === 1 ? ' PRODUCTO ENCONTRADO' : ' PRODUCTOS ENCONTRADOS');

      list.innerHTML = results.map((item, index) => `
        <button type="button" class="site-search-result" data-result-index="${index}">
          <div class="site-search-result-image-wrap">
            ${item.image ? `<img src="${item.image}" alt="${escapeHtml(item.name)}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">` : ''}
            <div class="site-search-result-placeholder">STREED</div>
          </div>
          <div class="site-search-result-info">
            <span>${escapeHtml(item.section)}</span>
            <strong>${escapeHtml(item.name)}</strong>
            ${item.price ? `<b>${escapeHtml(item.price)}</b>` : ''}
          </div>
        </button>
      `).join('');

      list.querySelectorAll('.site-search-result').forEach(btn => {
        btn.addEventListener('click', () => {
          const item = results[Number(btn.dataset.resultIndex)];
          if (!item) return;
          if (item.url) window.location.href = item.url;
        });
      });

      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('search-results-open');
    }

    function closeSearchResultsModal() {
      const modal = document.getElementById("siteSearchResultsModal");
      if (!modal) return;
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('search-results-open');
    }

    function escapeHtml(value) {
      return String(value || '').replace(/[&<>'"]/g, char => ({
        '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;'
      }[char]));
    }

    async function searchSiteProducts(rawQuery) {
      const query = String(rawQuery || '').trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      if (!query) return [];

      const results = [];
      const seen = new Set();

      function normalizeText(value) {
        return String(value || '').replace(/\s+/g, ' ').trim();
      }

      function normalizeSearch(value) {
        return normalizeText(value).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      }

      function addResult(item) {
        const key = normalizeSearch(item.section) + '|' + normalizeSearch(item.name);
        if (!item.name || seen.has(key)) return;
        seen.add(key);
        results.push(item);
      }

      function extractProducts(doc, pageUrl, sectionName) {
        const cards = Array.from(doc.querySelectorAll('.product-card[data-product-name], .product-card'));

        cards.forEach(card => {
          const name = normalizeText(
            card.getAttribute('data-product-name') ||
            card.querySelector('.product-name, .product-title, h2, h3, h4')?.textContent ||
            card.querySelector('img')?.alt || ''
          );
          if (!name) return;

          const price = normalizeText(
            card.getAttribute('data-product-price') ||
            card.getAttribute('data-price') ||
            card.querySelector('.product-price, .price')?.textContent || ''
          );
          const description = normalizeText(card.getAttribute('data-product-description') || '');
          const sizes = normalizeText(card.getAttribute('data-product-sizes') || '');
          const fits = normalizeText(card.getAttribute('data-product-fits') || '');
          const imageEl = card.querySelector('img');
          const imageSrc = imageEl?.getAttribute('src') || card.getAttribute('data-product-image') || '';
          const image = imageSrc ? new URL(imageSrc, pageUrl).href : '';
          const haystack = normalizeSearch([name, description, sizes, fits, imageEl?.alt || '', sectionName].join(' '));

          if (!haystack.includes(query)) return;

          addResult({
            name,
            image,
            price,
            section: sectionName,
            url: pageUrl
          });
        });
      }

      try {
        const arrivalCards = Array.from(document.querySelectorAll('.arrival-card[data-product-name], .arrival-card'));
        arrivalCards.forEach(card => {
          const name = normalizeText(card.getAttribute('data-product-name') || card.querySelector('.arrival-name')?.textContent || '');
          if (!name) return;
          const price = normalizeText(card.getAttribute('data-price') || card.querySelector('.arrival-price')?.textContent || '');
          const imageEl = card.querySelector('img');
          const imageSrc = imageEl?.getAttribute('src') || '';
          const haystack = normalizeSearch([name, price, imageEl?.alt || '', 'NEW ARRIVALS'].join(' '));
          if (!haystack.includes(query)) return;
          addResult({
            name,
            image: imageSrc ? new URL(imageSrc, location.href).href : '',
            price,
            section: 'NEW ARRIVALS',
            url: new URL('#new-arrivals', location.href).href
          });
        });
      } catch (_) {}

      const pageMap = new Map();
      document.querySelectorAll('a[href]').forEach(link => {
        try {
          const url = new URL(link.getAttribute('href'), location.href);
          if (url.origin !== location.origin) return;
          if (url.pathname === '/' || url.pathname.endsWith('/')) { /* página en carpeta */ } else if (/\.html(?:$|[?#])/i.test(url.pathname)) { /* archivo HTML */ } else return;
          url.hash = '';
          const cleanUrl = url.href;
          if (!pageMap.has(cleanUrl)) {
            const label = normalizeText(link.textContent || '').replace(/\s+/g, ' ');
            pageMap.set(cleanUrl, label || url.pathname.split('/').pop().replace(/\.html$i/, ''));
          }
        } catch (_) {}
      });

      ['Camisas/', 'Gorras/', 'Hoodies/', 'Streed-Sets/', 'Personalizacion/'].forEach(file => {
        try {
          const url = new URL(file, location.href);
          pageMap.set(url.href, file.replace(/\/$/, '').replace(/-/g, ' '));
        } catch (_) {}
      });

      const pageEntries = Array.from(pageMap.entries());
      await Promise.all(pageEntries.map(async ([pageUrl, label]) => {
        try {
          if (new URL(pageUrl).href === new URL(location.href).href.split('#')[0]) {
            extractProducts(document, pageUrl, label || 'INICIO');
            return;
          }

          const response = await fetch(pageUrl, { cache: 'no-store', credentials: 'same-origin' });
          if (!response.ok) return;
          const html = await response.text();
          const doc = new DOMParser().parseFromString(html, 'text/html');
          const heading = normalizeText(doc.querySelector('main h1, h1')?.textContent || label || 'STREED');
          extractProducts(doc, pageUrl, heading);
        } catch (_) {}
      }));

      const fallbackCatalog = [
        {name:'Bad Bunny tee',price:'L 350.00',image:'images/ejemplo1.PNG',section:'CAMISAS',url:'camisas/',description:'camisa tee'},
        {name:'kiss me tee',price:'L 350.00',image:'images/ejemplo2.PNG',section:'CAMISAS',url:'camisas/',description:'camisa tee'},
        {name:'good things tee',price:'L 350.00',image:'images/ejemplo3.PNG',section:'CAMISAS',url:'camisas/',description:'camisa tee'},
        {name:'not your bae tee',price:'L 350.00',image:'images/ejemplo4.PNG',section:'CAMISAS',url:'camisas/',description:'camisa tee'},
      ];

      fallbackCatalog.forEach(item => {
        const haystack = normalizeSearch([item.name, item.description, item.section].join(' '));
        if (haystack.includes(query)) {
          addResult({
            name: item.name,
            image: new URL(item.image, location.href).href,
            price: item.price,
            section: item.section,
            url: new URL(item.url, location.href).href
          });
        }
      });

      return results;
    }

    async function handleSearch(event) {
      event.preventDefault();
      const rawQuery = searchInput.value.trim();
      if (!rawQuery) return;

      searchPanel.classList.remove("open");
      searchButton.classList.remove("active");
      searchButton.setAttribute("aria-expanded", "false");

      const submitButton = document.querySelector('#searchForm button[type="submit"]');
      if (submitButton) submitButton.disabled = true;

      try {
        const results = await searchSiteProducts(rawQuery);
        if (results.length) {
          openSearchResultsModal(results, rawQuery);
        } else {
          openSearchResultsModal([], rawQuery);
          const list = document.getElementById('siteSearchResultsList');
          if (list) list.innerHTML = '<div class="site-search-empty">NO ENCONTRAMOS PRODUCTOS CON ESA BÚSQUEDA.</div>';
        }
      } finally {
        if (submitButton) submitButton.disabled = false;
      }
    }


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

        searchPanel.classList.remove("open");
        searchButton.classList.remove("active");
        searchButton.setAttribute("aria-expanded", "false");

      }

    );


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


    document.addEventListener(

      "click",

      event => {

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


    let resizeTimer;

    window.addEventListener(

      "resize",

      () => {

        clearTimeout(
          resizeTimer
        );

        resizeTimer =
          setTimeout(

            () => {

              const size =
                getStartSize();

              if (
                currentProgress === 0
              ) {

                logo.style.width =
                  `${size}px`;

              }

            },

            100

          );

      }

    );


    logo.style.width =
      `${getStartSize()}px`;

    logo.dataset.final =
      "false";

    requestAnimationFrame(
      animateLogo
    );

  
;

(function () {
  const STORAGE_KEY = "streed_cart_v1";
  const cartItemsEl = document.getElementById("cartItems");
  const cartContentEl = document.getElementById("cartContent");
  const cartFooterEl = document.getElementById("cartFooter");
  const cartTotalEl = document.getElementById("cartTotal");
  const cartCountEl = document.getElementById("cartCount");
  const track = document.getElementById("newArrivalsTrack");
  const cartWhatsappButton = document.getElementById("cartWhatsappButton");

  const WHATSAPP_NUMBER = "50489055186";

  function buildWhatsappMessage() {
    const lines = ["Hola STREED 👋, quiero hacer el siguiente pedido:", ""];
    cart.forEach((item, index) => {
      lines.push(`${index + 1}. ${item.name || "PRODUCTO"}`);
      if (item.size && item.size !== "U") lines.push(`   Talla: ${item.size}`);
      if (item.fit) lines.push(`   Corte: ${item.fit}`);
      if (item.color) lines.push(`   Color: ${item.color}`);
      if (item.model) lines.push(`   Modelo: ${item.model}`);
      lines.push(`   Cantidad: ${Number(item.quantity || 1)}`);
      lines.push(`   Precio: ${money(item.price)} c/u`);
      lines.push("");
    });
    const total = cart.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0), 0);
    lines.push(`TOTAL: ${money(total)}`, "", "Quedo pendiente para coordinar el pedido. ¡Gracias!");
    return lines.join("\n");
  }

  function orderCartByWhatsapp() {
    if (!cart.length) return;
    const clean = WHATSAPP_NUMBER.replace(/\D/g, "");
    const message = encodeURIComponent(buildWhatsappMessage());
    window.open(`https://wa.me/${clean}?text=${message}`, "_blank", "noopener,noreferrer");
  }

  if (cartWhatsappButton) cartWhatsappButton.addEventListener("click", orderCartByWhatsapp);

  function loadCart() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      return Array.isArray(saved) ? saved : [];
    } catch (error) {
      return [];
    }
  }

  let cart = loadCart();

  function money(value) {
    return "L " + Number(value || 0).toFixed(2);
  }

  function saveCart() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }

  function updateCount() {
    const count = cart.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
    cartCountEl.textContent = count;
    cartCountEl.style.display = count > 0 ? "block" : "none";
    cartCountEl.style.visibility = count > 0 ? "visible" : "hidden";
  }

  function renderCart() {
    if (!cart.length) {
      cartContentEl.style.display = "block";
      cartItemsEl.innerHTML = "";
      cartFooterEl.style.display = "none";
      updateCount();
      return;
    }

    cartContentEl.style.display = "none";
    cartFooterEl.style.display = "block";

    cartItemsEl.innerHTML = cart.map((item, index) => {
      const image = item.image || item.img || "";
      const name = item.name || item.title || "PRODUCTO";
      const price = Number(item.price || 0);
      const quantity = Number(item.quantity || 1);
      const options = [];
      if (item.size && item.size !== "U") options.push("TALLA: " + item.size);
      if (item.fit) options.push("CORTE: " + item.fit);
      if (item.color) options.push("COLOR: " + item.color);
      if (item.model) options.push("MODELO: " + item.model);

      return `
        <div style="padding:14px 18px;border-bottom:1px solid #292929;font-family:Arial,sans-serif;">
          <div style="display:flex;justify-content:space-between;gap:10px;align-items:flex-start;">
            <div style="display:flex;gap:12px;min-width:0;align-items:flex-start;">
              ${image ? `<img src="${image}" alt="${name}" style="width:58px;height:70px;object-fit:cover;background:#111;display:block;">` : ""}
              <div style="min-width:0;">
                <div style="font-family:Impact,sans-serif;font-size:18px;color:#fff;line-height:1.05;">${name}</div>
                ${options.length ? `<div style="font-size:11px;color:#aaa;margin-top:6px;line-height:1.5;">${options.join("<br>")}</div>` : ""}
                <div style="font-size:13px;color:#d40000;font-weight:700;margin-top:5px;">${money(price)}</div>
              </div>
            </div>
            <button type="button" data-remove="${index}" style="border:0;background:transparent;color:#fff;font-size:20px;cursor:pointer;line-height:1;">×</button>
          </div>
          <div style="display:flex;align-items:center;gap:10px;margin-top:10px;">
            <button type="button" data-minus="${index}" style="width:27px;height:27px;border:1px solid #555;background:#111;color:#fff;cursor:pointer;">−</button>
            <span style="min-width:18px;text-align:center;color:#fff;">${quantity}</span>
            <button type="button" data-plus="${index}" style="width:27px;height:27px;border:1px solid #555;background:#111;color:#fff;cursor:pointer;">+</button>
            <span style="margin-left:auto;color:#fff;font-size:13px;font-weight:700;">${money(price * quantity)}</span>
          </div>
        </div>
      `;
    }).join("");

    const total = cart.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0), 0);
    cartTotalEl.textContent = money(total);
    updateCount();
  }

  let activeArrivalCard = null;
  let activeArrivalQuantity = 1;
  let activeArrivalSize = null;
  let activeArrivalColor = null;

  const arrivalModal = document.getElementById("arrivalProductModal");
  const arrivalModalClose = document.getElementById("arrivalModalClose");
  const arrivalModalImage = document.getElementById("arrivalModalImage");
  const arrivalModalName = document.getElementById("arrivalModalName");
  const arrivalModalPrice = document.getElementById("arrivalModalPrice");
  const arrivalModalSubtotal = document.getElementById("arrivalModalSubtotal");
  const arrivalModalColors = document.getElementById("arrivalModalColors");
  const siteSearchResultsModal = document.getElementById("siteSearchResultsModal");
  const siteSearchResultsClose = document.getElementById("siteSearchResultsClose");
  if (siteSearchResultsClose) siteSearchResultsClose.addEventListener("click", closeSearchResultsModal);
  if (siteSearchResultsModal) siteSearchResultsModal.addEventListener("click", e => { if (e.target === siteSearchResultsModal) closeSearchResultsModal(); });

  const arrivalWarningModal = document.getElementById("arrivalWarningModal");
  const arrivalWarningMessage = document.getElementById("arrivalWarningMessage");
  const arrivalWarningClose = document.getElementById("arrivalWarningClose");
  const arrivalQty = document.getElementById("arrivalQty");

  // Manejo de desplegables (Acordeones) en el modal
  const sizeGuideBtn = document.getElementById("sizeGuideBtn");
  const sizeGuideContent = document.getElementById("sizeGuideContent");
  const careGuideBtn = document.getElementById("careGuideBtn");
  const careGuideContent = document.getElementById("careGuideContent");

  if(sizeGuideBtn && sizeGuideContent) {
    sizeGuideBtn.addEventListener("click", () => {
      const isOpen = sizeGuideContent.classList.toggle("open");
      sizeGuideBtn.querySelector("span:last-child").textContent = isOpen ? "−" : "+";
    });
  }

  if(careGuideBtn && careGuideContent) {
    careGuideBtn.addEventListener("click", () => {
      const isOpen = careGuideContent.classList.toggle("open");
      careGuideBtn.querySelector("span:last-child").textContent = isOpen ? "−" : "+";
    });
  }

  function updateArrivalSubtotal() {
    const price = activeArrivalCard ? Number(activeArrivalCard.dataset.price || 0) : 0;
    arrivalQty.textContent = activeArrivalQuantity;
    arrivalModalSubtotal.textContent = money(price * activeArrivalQuantity);
  }

  function openArrivalModal(card) {
    activeArrivalCard = card;
    activeArrivalQuantity = 1;
    activeArrivalSize = null;
    activeArrivalColor = null;
    
    // Cerrar acordeones al abrir un modal nuevo
    if(sizeGuideContent) sizeGuideContent.classList.remove("open");
    if(sizeGuideBtn) sizeGuideBtn.querySelector("span:last-child").textContent = "+";
    if(careGuideContent) careGuideContent.classList.remove("open");
    if(careGuideBtn) careGuideBtn.querySelector("span:last-child").textContent = "+";

    const imageEl = card.querySelector(".arrival-image");
    const name = card.dataset.productName || "PRODUCTO";
    const price = Number(card.dataset.price || 0);

    arrivalModalImage.src = imageEl ? imageEl.getAttribute("src") : "";
    arrivalModalImage.alt = name;
    arrivalModalName.textContent = name;
    arrivalModalPrice.textContent = money(price);

    const cardColors = Array.from(card.querySelectorAll(".color-option"));
    arrivalModalColors.innerHTML = cardColors.map((option, index) => {
      const color = option.dataset.color || (index === 0 ? "Blanco" : "Negro");
      const bg = color.toLowerCase().includes("negro") ? "#000" : "#fff";
      return `<button type="button" data-color="${color}" aria-label="${color}" style="background:${bg};"></button>`;
    }).join("");

    arrivalModal.querySelectorAll("#arrivalSizeOptions button").forEach(btn => btn.classList.remove("selected"));
    updateArrivalSubtotal();
    arrivalModal.classList.add("open");
    arrivalModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeArrivalModal() {
    arrivalModal.classList.remove("open");
    arrivalModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    activeArrivalCard = null;
    activeArrivalSize = null;
    activeArrivalColor = null;
  }

  function animateCartAdded() {
    if (typeof cartButton !== "undefined" && cartButton) {
      cartButton.classList.remove("cart-button-added");
      void cartButton.offsetWidth;
      cartButton.classList.add("cart-button-added");
      setTimeout(() => cartButton.classList.remove("cart-button-added"), 650);
    }
    if (cartCountEl) {
      cartCountEl.classList.remove("cart-count-added");
      void cartCountEl.offsetWidth;
      cartCountEl.classList.add("cart-count-added");
      setTimeout(() => cartCountEl.classList.remove("cart-count-added"), 650);
    }
  }

  function showArrivalWarning(message) {
    arrivalWarningMessage.textContent = message;
    arrivalWarningModal.classList.add("open");
    arrivalWarningModal.setAttribute("aria-hidden", "false");
  }

  function closeArrivalWarning() {
    arrivalWarningModal.classList.remove("open");
    arrivalWarningModal.setAttribute("aria-hidden", "true");
  }

  function validateArrivalSelection(actionText) {
    const sizeBtn = arrivalModal.querySelector('#arrivalSizeOptions button.selected');
    const colorBtn = arrivalModalColors.querySelector('button.selected');

    if (!sizeBtn && !colorBtn) {
      showArrivalWarning(`Selecciona una talla y un color antes de ${actionText}.`);
      return null;
    }
    if (!sizeBtn) {
      showArrivalWarning(`Selecciona una talla antes de ${actionText}.`);
      return null;
    }
    if (!colorBtn) {
      showArrivalWarning(`Selecciona un color antes de ${actionText}.`);
      return null;
    }

    activeArrivalSize = sizeBtn.dataset.size || null;
    activeArrivalColor = colorBtn.dataset.color || null;
    return { sizeBtn, color: activeArrivalColor };
  }

  function addArrivalFromModal(event) {
    if (event) event.preventDefault();
    if (!activeArrivalCard) return;

    const selection = validateArrivalSelection('añadir el producto al carrito');
    if (!selection) return;

    const id = activeArrivalCard.dataset.productId;
    const name = activeArrivalCard.dataset.productName;
    const price = Number(activeArrivalCard.dataset.price || 0);
    const size = selection.sizeBtn.dataset.size;
    const color = selection.color;
    const imageEl = activeArrivalCard.querySelector('.arrival-image');
    const image = imageEl ? imageEl.getAttribute('src') : '';

    const existing = cart.find(item => item.id === id && item.color === color && item.size === size);
    if (existing) {
      existing.quantity = Number(existing.quantity || 0) + activeArrivalQuantity;
    } else {
      cart.push({ id, name, price, color, size, image, quantity: activeArrivalQuantity });
    }

    saveCart();
    renderCart();
    animateCartAdded();
    closeArrivalModal();

    cartPanel.classList.add('open');
    cartButton.classList.add('active');
    cartButton.setAttribute('aria-expanded', 'true');
  }

  function orderArrivalByWhatsapp(event) {
    if (event) event.preventDefault();
    if (!activeArrivalCard) return;

    const selection = validateArrivalSelection('pedir por WhatsApp');
    if (!selection) return;

    const name = activeArrivalCard.dataset.productName || 'PRODUCTO';
    const price = Number(activeArrivalCard.dataset.price || 0);
    const size = selection.sizeBtn.dataset.size;
    const color = selection.color;
    const subtotal = price * activeArrivalQuantity;

    const message = encodeURIComponent([
      'Hola STREED 👋, quiero pedir este producto:',
      '',
      `Producto: ${name}`,
      `Talla: ${size}`,
      `Color: ${color}`,
      `Cantidad: ${activeArrivalQuantity}`,
      `Precio: ${money(price)} c/u`,
      `Subtotal: ${money(subtotal)}`,
      '',
      'Quedo pendiente para coordinar el pedido. ¡Gracias!'
    ].join('\n'));

    const clean = String(WHATSAPP_NUMBER).replace(/\D/g, '');
    const whatsappUrl = `https://wa.me/${clean}?text=${message}`;

    const newWindow = window.open(whatsappUrl, '_blank');
    if (!newWindow) window.location.href = whatsappUrl;
  }

  document.querySelectorAll(".arrival-card").forEach(card => {
    const imageWrap = card.querySelector(".arrival-image-wrap");
    if (imageWrap) {
      imageWrap.setAttribute("role", "button");
      imageWrap.setAttribute("tabindex", "0");
      imageWrap.setAttribute("aria-label", "Ver opciones de " + (card.dataset.productName || "producto"));
      imageWrap.addEventListener("click", () => openArrivalModal(card));
      imageWrap.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") { event.preventDefault(); openArrivalModal(card); }
      });
    }

    card.querySelectorAll(".color-option").forEach(option => {
      option.addEventListener("click", event => {
        event.stopPropagation();
        card.querySelectorAll(".color-option").forEach(btn => btn.classList.remove("selected"));
        option.classList.add("selected");
      });
    });
  });

  arrivalModal.querySelectorAll("#arrivalSizeOptions button").forEach(btn => {
    btn.addEventListener("click", () => {
      arrivalModal.querySelectorAll("#arrivalSizeOptions button").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      activeArrivalSize = btn.dataset.size || null;
    });
  });

  arrivalModalColors.addEventListener("click", event => {
    const button = event.target.closest("button[data-color]");
    if (!button) return;
    arrivalModalColors.querySelectorAll("button").forEach(btn => btn.classList.remove("selected"));
    button.classList.add("selected");
    activeArrivalColor = button.dataset.color || null;
  });

  document.getElementById("arrivalQtyMinus").addEventListener("click", () => {
    activeArrivalQuantity = Math.max(1, activeArrivalQuantity - 1);
    updateArrivalSubtotal();
  });
  document.getElementById("arrivalQtyPlus").addEventListener("click", () => {
    activeArrivalQuantity += 1;
    updateArrivalSubtotal();
  });
  document.getElementById("arrivalModalAdd").addEventListener("click", addArrivalFromModal);
  document.getElementById("arrivalModalWhatsapp").addEventListener("click", orderArrivalByWhatsapp);
  arrivalModalClose.addEventListener("click", closeArrivalModal);
  arrivalWarningClose.addEventListener("click", closeArrivalWarning);
  arrivalWarningModal.addEventListener("click", event => { if (event.target === arrivalWarningModal) closeArrivalWarning(); });
  arrivalModal.addEventListener("click", event => { if (event.target === arrivalModal) closeArrivalModal(); });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && arrivalWarningModal.classList.contains("open")) closeArrivalWarning();
    else if (event.key === "Escape" && arrivalModal.classList.contains("open")) closeArrivalModal();
  });

  cartItemsEl.addEventListener("click", event => {
    const remove = event.target.closest("[data-remove]");
    const minus = event.target.closest("[data-minus]");
    const plus = event.target.closest("[data-plus]");

    if (remove) cart.splice(Number(remove.dataset.remove), 1);
    if (minus) {
      const i = Number(minus.dataset.minus);
      if (cart[i]) {
        cart[i].quantity = Number(cart[i].quantity || 1) - 1;
        if (cart[i].quantity <= 0) cart.splice(i, 1);
      }
    }
    if (plus) {
      const i = Number(plus.dataset.plus);
      if (cart[i]) cart[i].quantity = Number(cart[i].quantity || 0) + 1;
    }

    saveCart();
    renderCart();
  });

  document.querySelectorAll(".menu-anchor").forEach(link => {
    link.addEventListener("click", () => {
      const menuButton = document.getElementById("menuButton");
      const menuPanel = document.getElementById("menuPanel");
      if (menuPanel && menuButton) {
        menuPanel.classList.remove("open");
        menuButton.classList.remove("active");
        menuButton.setAttribute("aria-expanded", "false");
      }
    });
  });

  window.addEventListener("pageshow", () => {
    cart = loadCart();
    renderCart();
  });

  window.addEventListener("storage", event => {
    if (event.key === STORAGE_KEY) {
      cart = loadCart();
      renderCart();
    }
  });

  renderCart();
})();
;

(function(){
  const container = document.getElementById("carouselContainer");
  const cards = Array.from(document.querySelectorAll(".streed-carousel-card"));
  const prev = document.getElementById("carouselPrev");
  const next = document.getElementById("carouselNext");

  if(!container || !cards.length) return;

  let current = 0;
  let timer;
  let startX = 0;

  function show(){
    cards.forEach(function(card, i){
      card.classList.remove("is-center","is-left","is-right","is-hidden");

      if(i === current){
        card.classList.add("is-center");
      }else if(i === (current + cards.length - 1) % cards.length){
        card.classList.add("is-left");
      }else if(i === (current + 1) % cards.length){
        card.classList.add("is-right");
      }else{
        card.classList.add("is-hidden");
      }
    });
  }

  function nextSlide(){
    current = (current + 1) % cards.length;
    show();
    startAuto();
  }

  function prevSlide(){
    current = (current - 1 + cards.length) % cards.length;
    show();
    startAuto();
  }

  function startAuto(){
    clearInterval(timer);
    timer = setInterval(nextSlide, 4000);
  }

  if(next) next.onclick = function(e){
    e.preventDefault();
    nextSlide();
  };

  if(prev) prev.onclick = function(e){
    e.preventDefault();
    prevSlide();
  };

  container.addEventListener("touchstart", function(e){
    startX = e.touches[0].clientX;
  }, {passive:true});

  container.addEventListener("touchend", function(e){
    const endX = e.changedTouches[0].clientX;
    const distance = endX - startX;

    if(Math.abs(distance) > 40){
      if(distance < 0) nextSlide();
      else prevSlide();
    }
  }, {passive:true});

  show();
  startAuto();
})();
;

function toggleStreedFAQ(button) {
  const item = button.parentElement;
  const allItems = document.querySelectorAll('.streed-faq-item');
  allItems.forEach(function(otherItem) {
    if (otherItem !== item) {
      otherItem.classList.remove('active');
    }
  });
  item.classList.toggle('active');
}
;

const legalModalConfigs = [
  { open: "openStreedTerms", close: "closeStreedTerms", modal: "streedTermsModal" },
  { open: "openStreedPrivacy", close: "closeStreedPrivacy", modal: "streedPrivacyModal" },
  { open: "openStreedCookies", close: "closeStreedCookies", modal: "streedCookiesModal" }
];

function openLegalModal(modal) {
  if (!modal) return;
  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLegalModal(modal) {
  if (!modal) return;
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  if (!document.querySelector(".streed-modal.active")) {
    document.body.style.overflow = "";
  }
}

legalModalConfigs.forEach(config => {
  const openButton = document.getElementById(config.open);
  const closeButton = document.getElementById(config.close);
  const modal = document.getElementById(config.modal);
  if (openButton && modal) openButton.addEventListener("click", () => openLegalModal(modal));
  if (closeButton && modal) closeButton.addEventListener("click", () => closeLegalModal(modal));
  if (modal) {
    modal.addEventListener("click", event => {
      if (event.target === modal) closeLegalModal(modal);
    });
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    document.querySelectorAll(".streed-modal.active").forEach(closeLegalModal);
  }
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeSearchResultsModal();
});
