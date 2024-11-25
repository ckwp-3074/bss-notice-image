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

// ダークモードの切り替え機能
document.getElementById('darkModeCheckbox').addEventListener('change', function (event) {
    document.body.classList.toggle('dark-mode', event.target.checked);
});

// 即時通知の表示切り替え機能
document.getElementById('urgentCheckbox').addEventListener('change', function (event) {
    const urgentLabel = document.getElementById('urgentLabel');
    urgentLabel.style.display = event.target.checked ? 'block' : 'none';
});

// タイムスタンプの選択処理
const notificationTimeSelect = document.getElementById('notificationTime');
const customTimeBox = document.getElementById('customTimeBox');
const customTimeInput = document.getElementById('customTimeInput');
const timeDisplay = document.getElementById('notificationTimestamp');

notificationTimeSelect.addEventListener('change', (event) => {
    if (event.target.value === 'custom') {
        customTimeBox.classList.remove('hidden');
    } else {
        customTimeBox.classList.add('hidden');
        timeDisplay.textContent = '今';
    }
});

customTimeInput.addEventListener('input', function () {
    const timeValue = customTimeInput.value;
    if (timeValue) {
        timeDisplay.textContent = timeValue;
    }
});

// PNG保存機能
document.getElementById('saveBtn').addEventListener('click', function () {
    const element = document.getElementById('capture');

    // デバイスのピクセル密度を考慮したスケールを設定
    const scale = window.devicePixelRatio || 2; // デバイスピクセル密度、デフォルト値は2

    html2canvas(element, {
        scale: scale, // スケールを高くする
        useCORS: true, // 外部リソースの読み込みを許可
        backgroundColor: null // 背景を透明にする場合
    }).then(function (canvas) {
        const link = document.createElement('a');
        link.download = '高品質通知.png';
        link.href = canvas.toDataURL('image/png', 1.0); // 高画質でエクスポート
        link.click();
    });
});
