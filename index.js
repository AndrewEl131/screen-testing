document.addEventListener("DOMContentLoaded", function () {
  const urlInput = document.getElementById("url-input");
  const loadBtn = document.getElementById("load-btn");
  const deviceBtns = document.querySelectorAll(".device-btn");
  const deviceFrame = document.getElementById("device-frame");
  const deviceScreen = document.getElementById("device-screen");
  const siteFrame = document.getElementById("site-frame");
  const loading = document.getElementById("loading");
  const widthInput = document.getElementById("width-input");
  const heightInput = document.getElementById("height-input");
  const applySizeBtn = document.getElementById("apply-size");
  const resetViewBtn = document.getElementById("reset-view");
  const scaleInfo = document.getElementById("scale-info");
  const deviceContainer = document.querySelector(".device-container");

  let currentScale = 1;

  // მოწყობილობის ღილაკების მართვა
  deviceBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      deviceBtns.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");

      const width = this.getAttribute("data-width");
      const height = this.getAttribute("data-height");

      updateDeviceSize(width, height);
      widthInput.value = width;
      heightInput.value = height;
    });
  });

  // ვებსაიტის ჩატვირთვა
  loadBtn.addEventListener("click", loadWebsite);

  // Enter ღილაკის დაჭერის დამუშავება
  urlInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      loadWebsite();
    }
  });

  // მითითებული ზომის გამოყენება
  applySizeBtn.addEventListener("click", function () {
    updateDeviceSize(widthInput.value, heightInput.value);
  });

  // მასშტაბის რესეტი
  resetViewBtn.addEventListener("click", function () {
    currentScale = 1;
    deviceFrame.style.transform = "scale(1)";
    deviceFrame.style.margin = "0 auto";
    scaleInfo.textContent = "მასშტაბი: 100%";
  });

  // iframe-ის ჩატვირთვის მონიტორინგი
  siteFrame.addEventListener("load", function () {
    loading.style.display = "none";
  });

  // ფუნქცია ვებსაიტის ჩასატვირთად
  function loadWebsite() {
    let url = urlInput.value.trim();

    if (!url) {
      alert("გთხოვთ, შეიყვანოთ ვებსაიტის URL");
      return;
    }

    // URL-ის ფორმატირება
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = "https://" + url;
    }

    loading.style.display = "flex";
    siteFrame.src = url;
  }

  // ფუნქცია ეკრანის ზომის შესაცვლელად
  function updateDeviceSize(width, height) {
    const screenWidth = parseInt(width);
    const screenHeight = parseInt(height);

    deviceScreen.style.width = screenWidth + "px";
    deviceScreen.style.height = screenHeight + "px";

    // მობილური მოწყობილობებისთვის დამატებითი სტილები
    if (screenWidth <= 768) {
      deviceFrame.style.padding = "40px 15px";
      deviceScreen.style.borderRadius = "24px";
      currentScale = 1;
      deviceFrame.style.transform = "scale(1)";
      deviceFrame.style.margin = "0 auto";
      scaleInfo.textContent = "მასშტაბი: 100%";
    } else {
      deviceFrame.style.padding = "20px";
      deviceScreen.style.borderRadius = "4px";

      // დიდი ეკრანებისთვის მასშტაბირება
      const containerWidth = deviceContainer.offsetWidth - 40;
      if (screenWidth > containerWidth) {
        currentScale = containerWidth / screenWidth;
        deviceFrame.style.transform = `scale(${currentScale})`;
        deviceFrame.style.margin = "0 auto";
        deviceFrame.style.transformOrigin = "top center";
        scaleInfo.textContent = `მასშტაბი: ${Math.round(currentScale * 100)}%`;
      } else {
        currentScale = 1;
        deviceFrame.style.transform = "scale(1)";
        deviceFrame.style.margin = "0 auto";
        scaleInfo.textContent = "მასშტაბი: 100%";
      }
    }
  }

  // ფანჯრის ზომის ცვლილებაზე რეაგირება
  window.addEventListener("resize", function () {
    const activeBtn = document.querySelector(".device-btn.active");
    if (activeBtn) {
      const width = activeBtn.getAttribute("data-width");
      if (parseInt(width) > 768) {
        updateDeviceSize(width, activeBtn.getAttribute("data-height"));
      }
    }
  });

  // ნაგულისხმევი ზომის დაყენება
  updateDeviceSize(375, 667);
});
