  document.addEventListener("DOMContentLoaded", function () {
    // สร้าง Canvas element
    const canvas = document.getElementById("filteredCanvas");
    const ctx = canvas.getContext("2d");
  
    // โหลดภาพและนำเข้า Canvas เมื่อโปรแกรมเริ่มทำงาน
    const img = new Image();
    img.src = "images/kin_b.png";
  
    img.onload = function () {
      // นำเข้าภาพเข้า Canvas
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
  
      // ทำการตรวจสอบและแสดงผลลัพธ์
      applyFilter(ctx, canvas.width, canvas.height);
    };
  });
  
  function applyFilter(ctx, width, height) {
    // ดึงข้อมูลภาพจาก Canvas
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
  
    // ตรวจสอบและกำหนดสีตรงข้ามสำหรับพื้นที่ที่แตกต่าง
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
  
      // หากพบสีที่แตกต่าง
      if (r !== 255 || g !== 255 || b !== 255) {
        // กำหนดสีตรงข้าม
        data[i] = 255 - r;
        data[i + 1] = 255 - g;
        data[i + 2] = 255 - b;
      }
    }
  
    // นำข้อมูลภาพที่ได้มาใส่ Canvas
    ctx.putImageData(imageData, 0, 0);
  }
  