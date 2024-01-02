
exports.jsonFormat = (res, code, message, data) => {
    let status = "error";

    switch (code) {   
        //## https://medium.com/dot-intern/http-status-code-4b4f5268c297
        //## Kode Sukses     
        case 200: // Permintaan sudah diterima dan dipahami kemudian sedang diproses. 
            status = "OK"
            break;
        case 201: // Permintaan berhasil dan server membuat sumber/resource baru.
            status = "Created"
            break;
        case 202: // Permintaan telah diterima untuk diproses, tetapi pemrosesan belum selesai. Permintaan mungkin atau mungkin tidak pada akhirnya ditindaklanjuti, dan mungkin tidak diizinkan saat pemrosesan terjadi.
            status = "Accepted"
            break;
        case 203: // Server berhasil memroses permintaan, tetapi menampilkan informasi yang mungkin berasal dari sumber lain.
            status = "Non-authoritative information"
            break;
        case 204:  // Server berhasil memroses permintaan, akan tetapi tidak menampilkan konten apa pun.
            status = "No content"
            break;
        case 205: // Server berhasil memroses permintaan, tetapi tidak menampilkan konten apa pun. Berbeda dengan respon 204, respons ini mengharuskan pemohon mereset tampilan dokumen.
            status = "Reset content"
            break;
        case 206: // Kode status 206 adalah menanggapi permintaan bagian dari dokumen. Ini digunakan oleh alat caching canggih, ketika agen pengguna meminta hanya sebagian kecil dari halaman, dan hanya sebagian yang diberikan.
            status = "Partial content"
            break;
        //## Kode Client Error     
        case 400: // Server tidak memahami sintaks/syntax permintaan dari klien.
            status = "Bad request"
            break;
        case 401: // Permintaan membutuhkan otentikasi. Server biasanya menampilkan respon ini untuk halaman setelah login (page behind a login).
            status = "Unauthorized"
            break;
        case 403: // Server menolak permintaan tersebut. itu mungkin bahwa server atau host memblokir pengaksesan.
            status = "Forbidden"
            break;
        case 404: // Server tidak dapat menemukan halaman yang diminta. Misalnya, server akan menampilkan kode ini jika permintaan untuk halaman tersebut tidak ada di server.
            status = "Not found"
            break;
        case 405:  // Metode yang ditentukan dalam permintaan tidak diperbolehkan.
            status = "Method not allowed"
            break;
        //## Kode Client Error     
        case 500: // Server mengalami galat/error dan tidak dapat memenuhi permintaan.
            status = "Internal server error"
            break;
        default:
            code = 500,
            status = "Internal server error",
            message,
            data
    }

    res.json({
        statusCode: code,
        status: status,
        message: message,
        data: data
    });
}