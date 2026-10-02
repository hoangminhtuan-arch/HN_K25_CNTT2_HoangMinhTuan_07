let currentRepairCode = "";
let isRepairValid = false;
let totalRevenues = 0;
let totalRepairs = 0;

function showMenu() {
  console.log(`
    ========================================================
                HE THONG DICH VU AUTOCARE GARACAGE
    ========================================================
    1. Nhap va kiem chuan ma phieu sua chua
    2. Tinh phi sua chua 
    3. Tham dinh ma the khach hang may man
    0. Thoat chuong trinh
    ========================================================

    Vui long nhap lua chon cua ban(0-3): 
    `);
}
// Case 1 Nhập và kiểm chuẩn mã phiếu sửa chữa
function accessRepairCode() {
  currentRepairCode = "";
  isRepairValid = false;

  let input = prompt("Nhập mã phiếu sửa chữa :");

  if (input === null) {
    console.log("Lỗi: Chưa nhập mã phiếu sửa chữa");
    return;
  }

  let repairCode = input.trim().toUpperCase();

  if (repairCode === "") {
    console.log(` Lỗi chưa đăng nhập mã phiếu`);
    return;
  }

  if (repairCode.length < 6) {
    console.log(`Độ dài tối thiểu là 6 ký tự`);
    return;
  }

  if (!repairCode.startsWith("CAR-")) {
    console.log(`Mã phiếu phải bắt đầu bằng CAR- `);
    return;
  }

  if (repairCode.includes(" ")) {
    console.log("Lỗi: Mã phiếu không được chứa khoảng trắng ở giữa");
    return;
  }

  currentRepairCode = repairCode;
  isRepairValid = true;

  console.log(`Mã phiếu hợp lệ`);
  console.log(`Tạo thành công mã phiếu: `, currentRepairCode);
}

function inputPositiveInteger(message) {
  while (true) {
    let input = prompt(message);

    if (input === null) {
      return null;
    }

    input = input.trim();

    if (input === "") {
      console.log("Lỗi: Vui lòng nhập số nguyên > 0");
      continue;
    }

    let value = Number(input);

    if (!Number.isInteger(value) || value <= 0) {
      console.log("Lỗi: Vui lòng nhập số nguyên > 0");
      continue;
    }

    return value;
  }
}

// Case 2 Tính phí sửa chữa

function calculateAutocare() {
  // Kiểm tra mã phiếu
  if (isRepairValid !== true) {
    console.log("Chưa có mã phiếu hợp lệ.");
    console.log("Vui lòng chọn Case 1 để nhập mã phiếu trước.");
    return;
  }

  let repairCode = currentRepairCode;

  let jobCount = inputPositiveInteger("Nhập số hạng mục sửa chữa:");

  if (jobCount === null) {
    console.log("Đã hủy giao dịch.");
    return;
  }

  let pricePerJob = inputPositiveInteger("Nhập đơn giá mỗi chỉ định (VNĐ):");

  if (pricePerJob === null) {
    console.log("Đã hủy giao dịch.");
    return;
  }

  let baseCost = jobCount * pricePerJob;

  let discount = 0;

  if (jobCount >= 4) {
    discount = Math.round(baseCost * 0.1);
  }

  let materialFee = Math.round((baseCost - discount) * 0.08);

  let totalPayment = baseCost - discount + materialFee;

  totalRevenues += totalPayment;
  totalRepairs++;

  currentRepairCode = "";
  isRepairValid = false;

  console.log(`
=====================================================
                 HÓA ĐƠN SỬA CHỮA
=====================================================
Mã phiếu   :             ${repairCode}
Số hạng mục:               ${jobCount}
Đơn giá/chỉ định:          ${pricePerJob.toLocaleString("vi-VN")} VNĐ
Chi phí cơ sở:             ${baseCost.toLocaleString("vi-VN")} VNĐ
Tiền giảm giá:             ${discount.toLocaleString("vi-VN")} VNĐ
Phụ phí vật tư:           ${materialFee.toLocaleString("vi-VN")} VNĐ
-----------------------------------------------------
TỔNG THANH TOÁN:           ${totalPayment.toLocaleString("vi-VN")} VNĐ
`);

  console.log("Đã quyết toán thành công.");
  console.log(
    "Tổng doanh thu ca làm việc:",
    totalRevenues.toLocaleString("vi-VN"),
    "VNĐ",
  );
  console.log("Tổng số phiếu sửa chữa:", totalRepairs);
}

// Case 3: Thẩm định mã thẻ khách hàng may mắn

function checkLuckyCode() {
  let input = prompt("Nhập mã số seri khách hàng:");

  if (input === null) {
    console.log("Lỗi: Mã khách hàng không hợp lệ");
    return;
  }

  let serialCode = input.trim();

  if (serialCode === "") {
    console.log("Lỗi: Mã khách hàng không hợp lệ");
    return;
  }

  if (!/^[0-9]+$/.test(serialCode)) {
    console.log("Lỗi: Mã khách hàng chỉ được chứa các chữ số 0-9");
    return;
  }

  if (serialCode.length < 2) {
    console.log("Lỗi: Mã khách hàng phải có ít nhất 2 chữ số");
    return;
  }

  if (/^0+$/.test(serialCode)) {
    console.log("Lỗi: Mã khách hàng không được toàn chữ số 0");
    return;
  }

  let reversedCode = "";

  for (let i = serialCode.length - 1; i >= 0; i--) {
    reversedCode += serialCode[i];
  }

  let isPalindrome = serialCode === reversedCode;

  let digitSum = 0;

  for (let i = 0; i < serialCode.length; i++) {
    digitSum += Number(serialCode[i]);
  }

  let isDivisibleByNine = digitSum % 9 === 0;

  let prize = "";

  if (isPalindrome && isDivisibleByNine) {
    prize =
      "Giải Đặc biệt - Gói bảo dưỡng định kì miễn phí trị giá 1.200.000 VNĐ";
  } else if (isPalindrome && !isDivisibleByNine) {
    prize =
      "Giải Nhất - Rửa xe và hút bụi nội thất miễn phí trị giá 200.000 VNĐ";
  } else if (!isPalindrome && isDivisibleByNine) {
    prize = "Giải Nhì - Voucher giảm 50.000 VNĐ lần sửa kế tiếp";
  } else {
    prize = "Không trúng thưởng - Không có";
  }

  console.log(`
=====================================================
             THẨM ĐỊNH MÃ KHÁCH HÀNG MAY MẮN
=====================================================
Mã số gốc:                 ${serialCode}
Mã đảo ngược:              ${reversedCode}
Tổng chữ số:               ${digitSum}
Đối xứng:                  ${isPalindrome ? "Có" : "Không"}
Chia hết cho 9:            ${isDivisibleByNine ? "Có" : "Không"}
Giải thưởng:               ${prize}
=====================================================
`);
}

// chạy chương trình
let isRunning = true;

while (isRunning) {
  showMenu();

  let choice = prompt("Vui lòng nhập lựa chọn của bạn (0 - 3):");

  if (choice === null) {
    console.log("Lựa chọn không hợp lệ. Vui lòng chọn từ 0 đến 3.");
    continue;
  }

  choice = choice.trim();

  switch (choice) {
    case "1":
      accessRepairCode();
      break;

    case "2":
      calculateAutocare();
      break;

    case "3":
      checkLuckyCode();
      break;

    case "0":
      console.log("Cảm ơn bạn đã sử dụng hệ thống dịch vụ AUTOCARE GARAGE!");
      console.log("Chúc bạn một trải nghiệm tốt đẹp.");
      isRunning = false;
      break;

    default:
      console.log("Lỗi: Lựa chọn không hợp lệ. Vui lòng nhập (0-3).");
      break;
  }
}
