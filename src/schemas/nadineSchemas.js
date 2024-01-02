const { body } = require('express-validator');

exports.storeSchema = [
    body("aplikasi").notEmpty().withMessage("column cannot be empty"),
    body("aplikasi").isString().trim().escape().withMessage("column must be of type string"),

    body("sifat_surat").notEmpty().withMessage("column cannot be empty"),
    body("sifat_surat").isString().trim().escape().withMessage("column must be of type string"),
    body("sifat_surat").isLength({ max: 1 }).withMessage("Maximum input is 1 character"),

    body("id_surat").notEmpty().withMessage("column cannot be empty"),
    body("id_surat").isInt().trim().escape().withMessage("column must be of type integer"),

    body("id_jenis_nd").notEmpty().withMessage("column cannot be empty"),
    body("id_jenis_nd").isInt().trim().escape().withMessage("column must be of type integer"),

    body("id_jenis_surat").notEmpty().withMessage("column cannot be empty"),
    body("id_jenis_surat").isInt().trim().escape().withMessage("column must be of type integer"),

    body("perihal").notEmpty().withMessage("column cannot be empty"),
    body("perihal").isString().trim().escape().withMessage("column must be of type string"),

    body("id_klasifikasi").notEmpty().withMessage("column cannot be empty"),
    body("id_klasifikasi").isInt().trim().escape().withMessage("column must be of type integer"),

    body("id_sub_unit").notEmpty().withMessage("column cannot be empty"),
    body("id_sub_unit").isInt().trim().escape().withMessage("column must be of type integer"),

    body("id_user").notEmpty().withMessage("column cannot be empty"),
    body("id_user").isInt().trim().escape().withMessage("column must be of type integer"),

    body("nama_pembuat").notEmpty().withMessage("column cannot be empty"),
    body("nama_pembuat").isString().trim().escape().withMessage("column must be of type string"),

    body("tanggal").notEmpty().withMessage("column cannot be empty"),
    body("tanggal").isDate().withMessage("column must be of type date 'Y-M-d'"),
];