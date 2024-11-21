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

// 通知時間の変更機能
document.getElementById('timeSelect').addEventListener('change', function (event) {
    document.getElementById('notificationTime').textContent = event.target.value;
});

// 即時通知の表示/非表示切り替え
document.getElementById('immediateCheckbox').addEventListener('change', function (event) {
    const immediateElement = document.getElementById('immediateNotification');
    if (event.target.checked) {
        immediateElement.style.display = 'block';
    } else {
        immediateElement.style.display = 'none';
    }
});

// ダークモードの切り替え機能
document.getElementById('darkModeCheckbox').addEventListener('change', function (event) {
    if (event.target.checked) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
});

// PNG保存機能
document.getElementById('saveBtn').addEventListener('click', function () {
    const element = document.getElementById('capture'); // キャプチャする要素

    // 現在の背景色を取得
    const backgroundColor = window.getComputedStyle(document.body).backgroundColor;

    // html2canvasで要素をキャプチャ
    html2canvas(element, { scale: 2 }).then(function (canvas) {
        const roundedCanvas = document.createElement('canvas');
        const ctx = roundedCanvas.getContext('2d');
        const radius = 40; // 角丸の半径

        roundedCanvas.width = canvas.width;
        roundedCanvas.height = canvas.height;

        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, roundedCanvas.width, roundedCanvas.height);

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
        ctx.clip();

        ctx.drawImage(canvas, 0, 0);

        const link = document.createElement('a');
        link.download = 'notification-rounded.png';
        link.href = roundedCanvas.toDataURL('image/png');
        link.click();
    });
});
