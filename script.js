function prosesPembayaran() {
    const namaWarga = document.getElementById('nama-warga').value;
    const bulanPembayaran = document.getElementById('bulan-pembayaran').value;
    const jumlahBayar = document.getElementById('jumlah-bayar').value;
    const statusPembayaranDiv = document.getElementById('status-pembayaran');
    const riwayatPembayaranList = document.getElementById('riwayat-pembayaran-list');

    if (namaWarga && bulanPembayaran && jumlahBayar) {
        const tanggalBayar = new Date().toLocaleDateString();
        const waktuBayar = new Date().toLocaleTimeString();

        const listItem = document.createElement('li');
        listItem.textContent = `${namaWarga} - ${bulanPembayaran}: Rp ${jumlahBayar} (Dibayar pada ${tanggalBayar} pukul ${waktuBayar})`;
        riwayatPembayaranList.appendChild(listItem);

        statusPembayaranDiv.textContent = `Pembayaran untuk bulan ${bulanPembayaran} sebesar Rp ${jumlahBayar} berhasil dicatat pada ${tanggalBayar} pukul ${waktuBayar}.`;
        statusPembayaranDiv.className = 'status-area success';

        // Bersihkan formulir setelah pembayaran
        document.getElementById('nama-warga').value = '';
        document.getElementById('jumlah-bayar').value = '';
        document.getElementById('bulan-pembayaran').selectedIndex = 0; // Reset pilihan bulan ke yang pertama

    } else {
        statusPembayaranDiv.textContent = 'Harap isi semua kolom pembayaran.';
        statusPembayaranDiv.className = 'status-area error';
    }

    if (namaWarga && bulanPembayaran && jumlahBayar) {
        const listItem = document.createElement('li');
        listItem.textContent = `${namaWarga} - ${bulanPembayaran}: Rp ${jumlahBayar}`;
        riwayatPembayaranList.appendChild(listItem);

        statusPembayaranDiv.textContent = 'Pembayaran berhasil dicatat.';
        statusPembayaranDiv.className = 'status-area success';

        // Bersihkan formulir setelah pembayaran
        document.getElementById('nama-warga').value = '';
        document.getElementById('jumlah-bayar').value = '';
    } else {
        statusPembayaranDiv.textContent = 'Harap isi semua kolom pembayaran.';
        statusPembayaranDiv.className = 'status-area error';
    }
}

function kirimLaporan() {
    const nomorWhatsApp = '+6285694900411'; // Ganti dengan nomor WhatsApp tujuan (format internasional tanpa spasi atau tanda + diawal tidak masalah)
    const jenisLaporan = document.getElementById('jenis-laporan').value;
    const tanggalKejadian = document.getElementById('tanggal-kejadian').value;
    const waktuKejadian = document.getElementById('waktu-kejadian').value;
    const petugasTerlibat = document.getElementById('petugas-terlibat').value;
    const lokasiKejadian = document.getElementById('lokasi-kejadian').value;
    const deskripsiKejadian = document.getElementById('deskripsi-kejadian').value;
    const kirimWaLink = document.getElementById('kirim-wa');

    if (jenisLaporan && tanggalKejadian && waktuKejadian && lokasiKejadian && deskripsiKejadian && nomorWhatsApp) {
        let pesan = `Laporan Keamanan:\nJenis: ${jenisLaporan}\nTanggal: ${tanggalKejadian}\nWaktu: ${waktuKejadian}\nLokasi: ${lokasiKejadian}\nDeskripsi: ${deskripsiKejadian}`;
        if (petugasTerlibat) {
            pesan += `\nPetugas: ${petugasTerlibat}`;
        }

        // Encode pesan agar aman untuk URL
        const encodedPesan = encodeURIComponent(pesan);
        const urlWhatsApp = `https://wa.me/${+6285694900411}?text=${encodedPesan}`;

        // Setel href dari link WhatsApp
        kirimWaLink.href = urlWhatsApp;
        // Buka link WhatsApp di tab baru (opsional)
        kirimWaLink.target = '_blank';

        // Tidak perlu lagi menampilkan status di dalam aplikasi web
        // document.getElementById('status-laporan').textContent = 'Membuka WhatsApp...';
        // document.getElementById('status-laporan').className = 'status-area info';

        // Bersihkan formulir setelah menyiapkan pesan WhatsApp
        document.getElementById('jenis-laporan').value = 'pencurian';
        document.getElementById('tanggal-kejadian').value = '';
        document.getElementById('waktu-kejadian').value = '';
        document.getElementById('petugas-terlibat').value = '';
        document.getElementById('lokasi-kejadian').value = '';
        document.getElementById('deskripsi-kejadian').value = '';

    } else {
        document.getElementById('status-laporan').textContent = 'Harap isi semua detail laporan keamanan (tanggal, waktu, lokasi, dan deskripsi wajib diisi) dan pastikan nomor WhatsApp tujuan diatur.';
        document.getElementById('status-laporan').className = 'status-area error';
        // Atur href kembali ke '#' jika ada error
        kirimWaLink.href = '#';
        kirimWaLink.target = '';
    }
}

// Tambahkan event listener untuk memanggil kirimLaporan saat link diklik
document.getElementById('kirim-wa').addEventListener('click', kirimLaporan);
