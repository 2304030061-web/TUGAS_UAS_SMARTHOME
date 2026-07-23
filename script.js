// ==========================================
// IP ESP32
// ==========================================
const ESP32_IP = "192.168.1.11";

const API_URL =
    `http://${ESP32_IP}/data`;


// ==========================================
// AMBIL DATA DARI ESP32
// ==========================================

async function updateData() {

    try {

        console.log(
            "Mengambil data dari:",
            API_URL
        );


        const response =
            await fetch(API_URL, {
                method: "GET",
                cache: "no-store"
            });


        if (!response.ok) {

            throw new Error(
                `HTTP Error: ${response.status}`
            );

        }


        const data =
            await response.json();


        console.log(
            "Data ESP32:",
            data
        );


        // ==================================
        // SENSOR
        // ==================================

        document.getElementById(
            "suhu"
        ).textContent =
            data.suhu;


        document.getElementById(
            "kelembapan"
        ).textContent =
            data.kelembapan;


        document.getElementById(
            "gas"
        ).textContent =
            data.gas;


        document.getElementById(
            "gerakan"
        ).textContent =
            data.gerakan;


        // ==================================
        // AKTUATOR
        // ==================================

        document.getElementById(
            "ledMerah"
        ).textContent =
            data.ledMerah;


        document.getElementById(
            "ledHijau"
        ).textContent =
            data.ledHijau;


        document.getElementById(
            "ledPutih"
        ).textContent =
            data.ledPutih;


        document.getElementById(
            "buzzer"
        ).textContent =
            data.buzzer;


        document.getElementById(
            "servo"
        ).textContent =
            data.servo;


        document.getElementById(
            "relay"
        ).textContent =
            data.relay;


        // ==================================
        // STATUS KONEKSI
        // ==================================

        document.getElementById(
            "connectionStatus"
        ).textContent =
            "Terhubung";


        document.getElementById(
            "connectionDot"
        ).classList.add(
            "online"
        );


        // ==================================
        // STATUS SISTEM
        // ==================================

        const systemStatus =
            document.getElementById(
                "systemStatus"
            );


        const statusTitle =
            document.getElementById(
                "statusTitle"
            );


        const statusDescription =
            document.getElementById(
                "statusDescription"
            );


        if (data.alarm === true) {

            systemStatus.classList.add(
                "danger"
            );


            statusTitle.textContent =
                "Sistem dalam Kondisi Bahaya";


            statusDescription.textContent =
                data.status;

        }

        else {

            systemStatus.classList.remove(
                "danger"
            );


            statusTitle.textContent =
                "Sistem Aman";


            statusDescription.textContent =
                data.status;

        }


        // ==================================
        // GERAKAN
        // ==================================

        const gerakan =
            document.getElementById(
                "gerakan"
            );


        if (
            data.gerakan ===
            "TERDETEKSI"
        ) {

            gerakan.classList.add(
                "detected"
            );

        }

        else {

            gerakan.classList.remove(
                "detected"
            );

        }


        // ==================================
        // PROGRESS SUHU
        // ==================================

        let suhuProgress =
            (Number(data.suhu) / 50) * 100;


        suhuProgress =
            Math.min(
                suhuProgress,
                100
            );


        document.getElementById(
            "suhuProgress"
        ).style.width =
            `${suhuProgress}%`;


        // ==================================
        // PROGRESS KELEMBAPAN
        // ==================================

        let kelembapanProgress =
            Number(
                data.kelembapan
            );


        document.getElementById(
            "kelembapanProgress"
        ).style.width =
            `${kelembapanProgress}%`;


        // ==================================
        // PROGRESS GAS
        // ==================================

        let gasProgress =
            (Number(data.gas) / 4095) * 100;


        gasProgress =
            Math.min(
                gasProgress,
                100
            );


        document.getElementById(
            "gasProgress"
        ).style.width =
            `${gasProgress}%`;


        console.log(
            "Dashboard berhasil diperbarui"
        );


    }

    catch (error) {

        console.error(
            "Gagal mengambil data ESP32:",
            error
        );


        document.getElementById(
            "connectionStatus"
        ).textContent =
            "Terputus";


        document.getElementById(
            "connectionDot"
        ).classList.remove(
            "online"
        );

    }

}



// ==========================================
// JAM
// ==========================================

function updateClock() {

    const now =
        new Date();


    document.getElementById(
        "currentTime"
    ).textContent =
        now.toLocaleTimeString(
            "id-ID"
        );


    document.getElementById(
        "currentDate"
    ).textContent =
        now.toLocaleDateString(
            "id-ID",
            {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            }
        );

}



// ==========================================
// JALANKAN
// ==========================================

updateData();

updateClock();


setInterval(
    updateData,
    1000
);


setInterval(
    updateClock,
    1000
);