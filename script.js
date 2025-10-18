document.addEventListener("DOMContentLoaded", function () {
  // --- PHẦN 1: TẠO HIỆU ỨNG TIM RƠI (Giữ nguyên) ---
  function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = "❤️";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 5 + 7 + "s";
    document.body.appendChild(heart);
    setTimeout(() => {
      heart.remove();
    }, 12000);
  }
  setInterval(createHeart, 500);

  // --- PHẦN 2: LOGIC HIỆN VÀ LẬT MODAL (Cập nhật) ---

  // Lấy các phần tử cần tương tác
  const floatingImages = document.querySelectorAll(".floating-img img");
  const modalBackdrop = document.getElementById("modal-backdrop");
  const modalClose = document.getElementById("modal-close");
  const flipCard = document.getElementById("flip-card"); // Thẻ lật

  // Lấy các phần tử nội dung trong modal
  const modalImage = document.getElementById("modal-image");
  const modalHeading = document.getElementById("modal-heading");
  const modalText = document.getElementById("modal-text");
  const modalSignature = document.getElementById("modal-signature");

  // 1. Thêm sự kiện "click" cho TẤT CẢ các ảnh đang bay
  floatingImages.forEach((img) => {
    img.addEventListener("click", () => {
      // Lấy nội dung từ ảnh
      const fullSrc = img.getAttribute("data-full-src");
      const heading = img.getAttribute("data-heading");
      const text = img.getAttribute("data-text");
      const signature = img.getAttribute("data-signature");

      // Gán nội dung vào modal
      modalImage.src = fullSrc;
      modalHeading.innerHTML = heading;
      modalText.innerHTML = text;
      modalSignature.innerHTML = signature;

      // QUAN TRỌNG: Đảm bảo thẻ luôn quay về mặt trước khi mở
      flipCard.classList.remove("is-flipped");

      // Hiển thị modal
      modalBackdrop.classList.add("show");
    });
  });

  // 2. THÊM MỚI: Sự kiện nhấp vào thẻ để lật
  flipCard.addEventListener("click", () => {
    flipCard.classList.toggle("is-flipped");
  });

  // 3. Hàm để đóng modal
  function closeModal() {
    modalBackdrop.classList.remove("show");
  }

  // 4. Sự kiện "click" cho nút đóng (X)
  modalClose.addEventListener("click", closeModal);

  // 5. Sự kiện "click" vào nền mờ (click ra ngoài)
  modalBackdrop.addEventListener("click", (event) => {
    // Chỉ đóng khi nhấp vào nền (chứ không phải thẻ lật)
    if (event.target === modalBackdrop) {
      closeModal();
    }
  });
});
