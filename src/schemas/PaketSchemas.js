const { body } = require('express-validator');
const { pdfFile } = require('../middleware/FileUpload');

exports.storeSchema = [
    pdfFile,
    body("nama_paket").notEmpty().withMessage("Nama Paket harus di isi"),
    body("nama_paket").isString().trim().escape().withMessage("Nama Paket harus berupa string"),

    body("metode").notEmpty().withMessage("Metode harus di isi"),
    body("metode").isString().trim().escape().withMessage("Metode harus berupa string"),

    body("id_kategori_belanja").notEmpty().withMessage("Id Kategori Belanja harus di isi"),
    body("id_kategori_belanja").isInt().trim().escape().withMessage("Id Kategori Belanja harus berupa integer"),
    
    body("id_unit_sub").notEmpty().withMessage("Id Unit Sub harus di isi"),
    body("id_unit_sub").isInt().trim().escape().withMessage("Id Unit Sub harus berupa integer"),

    body("tahun_anggaran").notEmpty().withMessage("Tahun Anggaran harus di isi"),
    body("tahun_anggaran").isInt().trim().escape().withMessage("Tahun Anggaran harus berupa integer")
];

exports.updateSchema = [
    body("nama_paket").notEmpty().withMessage("Nama Paket harus di isi"),
    body("nama_paket").isString().trim().escape().withMessage("Nama Paket harus berupa string"),

    body("metode").notEmpty().withMessage("Metode harus di isi"),
    body("metode").isString().trim().escape().withMessage("Metode harus berupa string"),

    body("id_kategori_belanja").notEmpty().withMessage("Id Kategori Belanja harus di isi"),
    body("id_kategori_belanja").isInt().trim().escape().withMessage("Id Kategori Belanja harus berupa integer"),
    
    body("id_unit_sub").notEmpty().withMessage("Id Unit Sub harus di isi"),
    body("id_unit_sub").isInt().trim().escape().withMessage("Id Unit Sub harus berupa integer"),

    body("tahun_anggaran").notEmpty().withMessage("Tahun Anggaran harus di isi"),
    body("tahun_anggaran").isInt().trim().escape().withMessage("Tahun Anggaran harus berupa integer"),

    body("tanggal_daftar_awal").notEmpty().withMessage("Tanggal Daftar Awal harus di isi"),
    body("tanggal_daftar_awal").isDate().trim().escape().withMessage("Tanggal Daftar Awal harus berupa date"),

    body("tanggal_daftar_akhir").notEmpty().withMessage("Tanggal Daftar Akhir harus di isi"),
    body("tanggal_daftar_akhir").isDate().trim().escape().withMessage("Tanggal Daftar Akhir harus berupa date"),

    body("tanggal_eval_awal").notEmpty().withMessage("Tanggal Eval Awal harus di isi"),
    body("tanggal_eval_awal").isDate().trim().escape().withMessage("Tanggal Eval Awal harus berupa date"),

    body("tanggal_eval_akhir").notEmpty().withMessage("Tanggal Eval Akhir harus di isi"),
    body("tanggal_eval_akhir").isDate().trim().escape().withMessage("Tanggal Eval Akhir harus berupa date"),

    body("tanggal_umum_paket").notEmpty().withMessage("Tanggal Umum Paket harus di isi"),
    body("tanggal_umum_paket").isDate().trim().escape().withMessage("Tanggal Umum Paket harus berupa date")
];