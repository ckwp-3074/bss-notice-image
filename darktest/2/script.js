document.getElementById('saveBtn').addEventListener('click', function () {
    const element = document.getElementById('capture');

    // 現在の背景色を取得
    const backgroundColor = window.getComputedStyle(document.body).backgroundColor;

    // html2canvasで要素をキャプチャ
    html2canvas(element, {
        scale: 1, // 解像度を抑える
        width: element.offsetWidth, // 要素の幅を基準に
        height: element.offsetHeight, // 要素の高さを基準に
        backgroundColor: null // 背景を透明に
    }).then(function (canvas) {
        const roundedCanvas = document.createElement('canvas');
        const ctx = roundedCanvas.getContext('2d');
        const radius = 20; // 角丸の半径

        // 元Canvasのサイズを取得
        roundedCanvas.width = canvas.width;
        roundedCanvas.height = canvas.height;

        // 背景を塗りつぶし
        ctx.fillStyle = backgroundColor; // ダークモードまたはライトモードの色を反映
        ctx.fillRect(0, 0, roundedCanvas.width, roundedCanvas.height);

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
