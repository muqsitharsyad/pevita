const log4js = require('log4js');
const fs = require('fs');
const errorLog = log4js.getLogger("error");
const traceLog = log4js.getLogger("trace");

const Paket = require('../models/paketModels');
const { jsonFormat } = require('../utils/jsonFormat')
const { moveFile } = require('../utils/moveFile');

exports.index = async(req, res, next) => {
    Paket.findAll({})
        .then(data => {
            if(data.length === 0){
                // const error = new Error("Data tidak ditemukan!");
                // error.statusCode = 422;
                // throw error;
                let message = "Data tidak ditemukan!";
                jsonFormat(res, 404, message, data);
            }else{
                let message = "Data Paket";
                jsonFormat(res, 200, message, data);
            }
            traceLog.trace(`User action FindAll ${data}`);
        }).catch((err) => {
            errorLog.error(`at function Paket(index) => ${err}`);
            next(err);
        });
}

exports.store = async(req, res, next) => {
    const nama_paket          = req.body.nama_paket;
    const metode              = req.body.metode;
    const id_kategori_belanja = req.body.id_kategori_belanja;
    const id_unit_sub         = req.body.id_unit_sub;
    const tahun_anggaran      = req.body.tahun_anggaran;
    const file                = req.body.file;

    Paket.create({
        nama_paket         : nama_paket,
        metode             : metode,
        id_kategori_belanja: id_kategori_belanja,
        id_unit_sub        : id_unit_sub,
        tahun_anggaran     : tahun_anggaran,      
    }).then(data => {
        if(!data){
            let message = "Gagal menambahkan data!";
            jsonFormat(res, 202, message, data);
        }else{
            var dirTmp = req.file.path;
            var newDir = data.id_paket + "/"
            var path = moveFile(dirTmp, newDir, req.file.filename)

            Paket.update({path: path,},{where: {id_paket: data.id_paket}})
            .then(newData => {
                if(!newData){
                    let message = "Gagal Update Path!";
                    jsonFormat(res, 202, message, data);
                }else{
                    let message = "Berhasil menambahkan data!";
                    jsonFormat(res, 201, message, data );                        
                    traceLog.trace(`User action create ${data}`);
                }
            })           
        }
    }).catch((err) => {
        errorLog.error(`at function Paket(store) => ${err}`)
        next(err);
    })
}

exports.show = (req, res, next) => {
    const id = req.params.id;

    Paket.findOne({where: {id_paket: id}})
        .then(data => {
            if(!data){
                let message = "Data tidak ditemukan!";
                jsonFormat(res, 404, message, data);
            }else{
                let message = "Detail Data Paket";
                jsonFormat(res, 200, message, data);
            }
            traceLog.trace(`User action show ${data}`);
        }).catch(err => {            
            errorLog.error(`at function Paket(show) => ${err}`);
            next(err);
        })
}

exports.update = (req, res, next) => {
    const id                   = req.params.id;
    const nama_paket           = req.body.nama_paket;
    const metode               = req.body.metode;
    const id_kategori_belanja  = req.body.id_kategori_belanja;
    const id_unit_sub          = req.body.id_unit_sub;
    const tahun_anggaran       = req.body.tahun_anggaran;
    const tanggal_daftar_awal  = req.body.tanggal_daftar_awal;
    const tanggal_daftar_akhir = req.body.tanggal_daftar_akhir;
    const tanggal_eval_awal    = req.body.tanggal_eval_awal;
    const tanggal_eval_akhir   = req.body.tanggal_eval_akhir;
    const tanggal_umum_paket   = req.body.tanggal_umum_paket;

    Paket.update({
        nama_paket          : nama_paket,
        metode              : metode,
        id_kategori_belanja : id_kategori_belanja,
        id_unit_sub         : id_unit_sub,
        tahun_anggaran      : tahun_anggaran,
        tanggal_daftar_awal : tanggal_daftar_awal,
        tanggal_daftar_akhir: tanggal_daftar_akhir,
        tanggal_eval_awal   : tanggal_eval_awal,
        tanggal_eval_akhir  : tanggal_eval_akhir,
        tanggal_umum_paket  : tanggal_umum_paket,
    },{
        where: {
            id_paket: id
        }
    }).then(data => {
        if(!data){
            let message = "Gagal merubah data!";
            jsonFormat(res, 202, message, data);
        }else{
            let message = "Berhasil merubah data!";
            jsonFormat(res, 205, message, data);
        }
        traceLog.trace(`User action update ${data}`);
    }).catch(err => {
        errorLog.error(`at function Paket(update) => ${err}`)
        next(err);
    })
}

exports.destroy = (req, res, next) => {
    const id = req.params.id;

    Paket.findOne({where: {id_paket: id}})
        .then(data => {
            if(!data){
                let message = "Data tidak ditemukan!";
                jsonFormat(res, 404, message, data);
            }else{
                return Paket.destroy({where: {id_paket: id}})
            }            
        }).then(delData => {
            if(!delData){
                let message = "Gagal menghapus data!";
                jsonFormat(res, 202, message, delData);
            }else{
                let message = "Berhasil menghapus data!";
                jsonFormat(res, 204, message, delData);
            }
            traceLog.trace(`User action FindAll ${delData}`);
        }).catch(err => {
            errorLog.error(`at function Paket(destroy) => ${err}`);
            next(err);
        })
}