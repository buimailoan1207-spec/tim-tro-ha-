
// ========================================
// RDH - PHÒNG TRỌ HÀ NỘI
// Hotline / Zalo: 0396470395
// ========================================

const form = document.getElementById("troForm");
const formMessage = document.getElementById("formMessage");

const ZALO_URL = "https://zalo.me/0396470395";


// ========================================
// HÀM HIỂN THỊ THÔNG BÁO
// ========================================

function showMessage(message, type = "success") {
    formMessage.textContent = message;

    formMessage.style.color =
        type === "success" ? "#087f5b" : "#c0392b";
}


// ========================================
// HÀM SAO CHÉP TIN NHẮN
// ========================================

async function copyMessage(message) {

    if (navigator.clipboard && window.isSecureContext) {

        await navigator.clipboard.writeText(message);
        return true;

    }

    const textarea = document.createElement("textarea");

    textarea.value = message;
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";

    document.body.appendChild(textarea);

    textarea.focus();
    textarea.select();

    const copied = document.execCommand("copy");

    textarea.remove();

    if (!copied) {
        throw new Error("Không thể sao chép nội dung.");
    }

    return true;
}


// ========================================
// XỬ LÝ FORM ĐĂNG KÝ
// ========================================

form.addEventListener("submit", async function(event) {

    event.preventDefault();

    const submitButton = form.querySelector(".btn-submit");

    // Lấy dữ liệu khách hàng

    const name = document.getElementById("name").value.trim();

    const phone = document.getElementById("phone").value.trim();

    const area = document.getElementById("area").value.trim();

    const price = document.getElementById("price").value;

    const roomType = document.getElementById("roomType").value;

    const moveIn = document.getElementById("moveIn").value;

    const note = document.getElementById("note").value.trim();

    const consent = document.getElementById("consent").checked;


    // ========================================
    // KIỂM TRA THÔNG TIN
    // ========================================

    if (!name || !phone || !area || !price) {

        showMessage(
            "Vui lòng điền đầy đủ các thông tin bắt buộc.",
            "error"
        );

        return;
    }


    // Kiểm tra họ tên

    if (name.length < 2) {

        showMessage(
            "Vui lòng nhập họ tên hợp lệ.",
            "error"
        );

        document.getElementById("name").focus();

        return;
    }


    // Kiểm tra số điện thoại

    if (!/^0[0-9]{9}$/.test(phone)) {

        showMessage(
            "Số điện thoại phải gồm đúng 10 chữ số và bắt đầu bằng số 0.",
            "error"
        );

        document.getElementById("phone").focus();

        return;
    }


    // Kiểm tra đồng ý cung cấp thông tin

    if (!consent) {

        showMessage(
            "Bạn cần xác nhận đồng ý cung cấp thông tin trước khi gửi.",
            "error"
        );

        return;
    }


    // ========================================
    // ĐỊNH DẠNG NGÀY THÁNG
    // ========================================

    let formattedDate = "Chưa xác định";

    if (moveIn) {

        const parts = moveIn.split("-");

        formattedDate =
            `${parts[2]}/${parts[1]}/${parts[0]}`;

    }


    // ========================================
    // TẠO NỘI DUNG TIN NHẮN
    // ========================================

    const message = `
================================
YÊU CẦU TÌM PHÒNG TRỌ
RDH - PHÒNG TRỌ HÀ NỘI
================================

Họ và tên: ${name}

Số điện thoại: ${phone}

Khu vực muốn thuê: ${area}

Mức giá mong muốn: ${price}

Loại phòng: ${roomType || "Chưa xác định"}

Thời gian chuyển vào: ${formattedDate}

Yêu cầu thêm: ${note || "Không có"}

================================
Tôi muốn được RDH hỗ trợ tìm phòng trọ phù hợp.

Liên hệ RDH: 0396470395
================================
    `.trim();


    // ========================================
    // XỬ LÝ GỬI YÊU CẦU
    // ========================================

    submitButton.disabled = true;

    submitButton.innerHTML =
        '<i class="fa-solid fa-spinner fa-spin"></i> Đang xử lý...';

    showMessage("Đang chuẩn bị nội dung yêu cầu...");

    let zaloWindow = null;

    try {

        // Mở Zalo ngay trong thao tác nhấn nút
        // để hạn chế trình duyệt chặn cửa sổ mới.

        zaloWindow = window.open(
            ZALO_URL,
            "_blank"
        );

        // Sao chép nội dung tin nhắn

        await copyMessage(message);

        showMessage(
            "Đã sao chép thông tin thành công! Hãy dán nội dung vào cuộc trò chuyện Zalo với RDH và nhấn Gửi."
        );

    } catch (error) {

        showMessage(
            "Không thể sao chép tự động. Bạn vui lòng thử lại hoặc gọi trực tiếp RDH qua số 0396470395.",
            "error"
        );

        if (zaloWindow && !zaloWindow.closed) {
            zaloWindow.close();
        }

        console.error("RDH Form Error:", error);

    } finally {

        submitButton.disabled = false;

        submitButton.innerHTML =
            '<i class="fa-solid fa-paper-plane"></i> Gửi yêu cầu qua Zalo';

    }

});


// ========================================
// GIỚI HẠN NGÀY CHUYỂN VÀO
// KHÔNG CHO CHỌN NGÀY TRONG QUÁ KHỨ
// ========================================

const moveInInput = document.getElementById("moveIn");

if (moveInInput) {

    const today = new Date();

    const year = today.getFullYear();

    const month = String(today.getMonth() + 1).padStart(2, "0");

    const day = String(today.getDate()).padStart(2, "0");

    moveInInput.min = `${year}-${month}-${day}`;

}


// ========================================
// THÔNG BÁO BẢN QUYỀN RDH
// ========================================

console.log(
    "%c RDH - PHÒNG TRỌ HÀ NỘI ",
    "background: #087f5b; color: white; font-size: 18px; padding: 10px; font-weight: bold;"
);

console.log(
    "Hotline / Zalo: 0396470395"
);
