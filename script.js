// アイコンのアップロード機能
document.getElementById('iconUpload').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('appIcon').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// タイトルの変更機能
document.getElementById('titleInput').addEventListener('input', function (event) {
    document.getElementById('notificationTitle').textContent = event.target.value;
});

// メッセージの変更機能
document.getElementById('messageInput').addEventListener('input', function (event) {
    document.getElementById('notificationMessage').textContent = event.target.value;
});

// PNG保存機能
document.getElementById('saveBtn').addEventListener('click', function () {
    const element = document.getElementById('capture'); // キャプチャする要素

    // html2canvasで要素をキャプチャ
    html2canvas(element, { scale: 2 }).then(function (canvas) {
        // 角丸用のCanvasを作成
        const roundedCanvas = document.createElement('canvas');
        const ctx = roundedCanvas.getContext('2d');
        const radius = 40; // 角丸の半径

        // 元Canvasのサイズを取得
        roundedCanvas.width = canvas.width;
        roundedCanvas.height = canvas.height;

        // 角丸のパスを描画
        ctx.beginPath();
        ctx.moveTo(radius, 0);
        ctx.lineTo(roundedCanvas.width - radius, 0);
        ctx.quadraticCurveTo(roundedCanvas.width, 0, roundedCanvas.width, radius);
        ctx.lineTo(roundedCanvas.width, roundedCanvas.height - radius);
        ctx.quadraticCurveTo(roundedCanvas.width, roundedCanvas.height, roundedCanvas.width - radius, roundedCanvas.height);
        ctx.lineTo(radius, roundedCanvas.height);
        ctx.quadraticCurveTo(0, roundedCanvas.height, 0, roundedCanvas.height - radius);
        ctx.lineTo(0, radius);
        ctx.quadraticCurveTo(0, 0, radius, 0);
        ctx.closePath();
        ctx.clip(); // クリッピング適用

        // 元Canvasを描画（角丸適用）
        ctx.drawImage(canvas, 0, 0);

        // 画像をダウンロード
        const link = document.createElement('a');
        link.download = 'notification-rounded.png';
        link.href = roundedCanvas.toDataURL('image/png');
        link.click();
    });
});
